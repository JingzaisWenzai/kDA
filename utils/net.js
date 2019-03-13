import axios from 'axios'

var Net = {

  getJSON: function (url, config) {
    return new Promise(function(resolve, reject){

      axios.get(url, config)
        .then(function(res){
          res.status == 200 ? resolve(res) : reject('错误:', res.status);
        })
        .catch(function(err){
          reject(err);
        })
    });
  },

  postJSON: function (url, params, data, config) {

    var i = 0;
    var isHasPraram;

    //检测url
    if (url.indexOf("?") != -1) {
      isHasPraram = true;
    }

    for (var o in params) {
      if (params[o] == undefined || params[o] == null) {
        continue;
      }
      if (i == 0 && !isHasPraram) {
        url += "?" + o + "=" + params[o];
      }
      else {
        url += "&" + o + "=" + params[o];
      }
      i++;
    }

    return new Promise(function(resolve, reject){

      axios.post(url,params, config)
        .then(function(res){
          res.status == 200 ? resolve(res) : reject('错误:', res.status);
        })
        .catch(function(err){
          reject(err);
        })
    });
  }

}


export default Net;
