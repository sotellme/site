const utils = {
  capitalizeFirstLetter : function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
    makeUrlFromBaseAndPort : function (url, port) {
    return port ? url + ':' + port : url;
  }
}

export default utils