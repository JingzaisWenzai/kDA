(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.module = (root.module) ? root.module : {}
    root.module.common = (root.module.common) ? root.module.common : {}
    root.module.common.layerControl = (root.module.common.layerControl) ? root.module.common.layerControl : {}

    root.module.common.layerControl.mapNet = factory()
  }
}(this, function() {
  //定义常量

  var getCookieByName = function getCookieByName(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  }

  var ajax = function ajax() {

  }

  var checkLogin = function checkLogin(data) {
    if (data.code) {
      if (data.code == '10004') {//token expire
        parent.showLoginDialog()
      }
    }
  }

  return {
    getCookieByName: getCookieByName,
    checkLogin: checkLogin

  }
}))
