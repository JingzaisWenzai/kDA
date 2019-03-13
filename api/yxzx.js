import Vue from 'vue'
import baseUrl from '../static/js/baseUrl'
var app = new Vue()

//图层列表
export function layerList(params) {
  return app.$myAxios.myGet(baseUrl+'/rundisplay/mapConfig/mapdata',params)
}
// P2P平台详情 /rundisplay/p2p/plat/information?id=AAATT9AAEAAA%2FbtAAI
export function p2p_plat(params) {
  return app.$myAxios.myGet(baseUrl + '/rundisplay/p2p/plat/information', params)
}
// 私募机构 /rundisplay/p2p/private/information?id=AAATT9AAEAAA%2FbtAAI
export function p2p_private(params) {
  return app.$myAxios.myGet(baseUrl + '/rundisplay/p2p/private/information', params)
}
// 其它涉众金融平台详情 /rundisplay/p2p/other/information?id=AAATT9AAEAAA%2FbtAAI
export function p2p_other(params) {
  return app.$myAxios.myGet(baseUrl + '/rundisplay/p2p/other/information', params)
}
