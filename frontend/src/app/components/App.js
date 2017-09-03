import React, { Component } from 'react';
import MainNav from './common/MainNav';
import Footer from './common/Footer';
import utils from '../utils/utils';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mainContent = React.cloneElement({...this.props}.children, {...this.props})
    return (
      <div id="main">
        <MainNav {...this.props}/>
        {mainContent}
        <Footer/>
      </div>
    );
  }
}

export default App;