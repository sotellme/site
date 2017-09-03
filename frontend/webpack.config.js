const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')
const JsDocPlugin = require('jsdoc-webpack-plugin-v2')

let config = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  }, 
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], 
    /// no more need to pass in the extensions at the end!
    alias: {
      images: path.resolve(__dirname, './src/assets/images') // get all images from this folder
      // can the do import from 'images/filename'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, // files ending with js
        exclude: /node_modules\/(?!react-dave-bar\/).*/, // exclude the node modules dir
        loader: "babel-loader" // use this babel-core loader
      }, 
      {
        test: /\.scss$/, // files ending with scss
        use:['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          use:['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader'
        }))
      }, 
      {
        test:/\.jsx$/,
        loader: 'babel-loader', 
        exclude: /node_modules\/(?!react-dave-bar\/).*/
      }, 
      {
        test: /\.(jpg?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include:__dirname,
      }, 
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ]
  }, 
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'), // call the plugin with a constructor and name our css file
  ], 
  devServer: {
    contentBase: path.resolve(__dirname, './public'), // directory or URL to serve HTML content
    historyApiFallback: true,//fallback to /index.html for Single Page Applications
    inline: true, // inline mode (set to false to disable including client scripts like livereload)
    open: true, // open default browser when launching
    port: 1234
  }, 
  devtool: 'eval-source-map' // enable devtool or better degubbings
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets()
  )
}