import Vue from 'vue'
import baseUrl from '../static/js/baseUrl'
var app = new Vue()

//获取用户id
export function getUserId() {
  var param = {
    'loginName': 'zdk',
    'Password': '21218cca77804d2ba1922c33e0151105',
    'clientsrc': 'pc',
    'sureLogin': '1',
    'IsRenew': '0',
    'clientmac': ' 00-FF-62-87-82-1C',
    'clientip': '2.0.1.7',
    'systemversion': 'Microsoft Windows NT 6.2.9200.0',
    'clientversion': 'V10.12.5.170506'
  }
  return app.$axios.post('http://10.192.76.20:8082/xEyeWeb/user/userLogin.do',param)
}
//开始播放
export function getPlayVideo(userId,videoId) {
  return app.$axios.post('http://10.192.76.95:8016/xhwebvideo.xhrtmp?cmd=start&platform=pc&userid=' + userId + '&cameraid=' + videoId + '&type=realplay')
}
//启动心跳
export function getStartHeart(sessionid) {
  return app.$axios.post('http://10.192.76.95:8016/xhwebvideo.xhrtmp?cmd=heartbeat&sessionid='+sessionid+'&type=realplay')
}
//登出
export function getLogOut(id) {
  return app.$axios.post('http://10.192.76.95:8016/xhwebvideo.xhrtmp?cmd=stop&sessionid='+id)
}
