import baseUrl from '../static/js/baseUrl';
import Vue from 'vue'
var app = new Vue()

//图层配置
export function mapconfig(params) {
  return app.$myAxios.myGet(baseUrl+'/hiddendanger/mapconfig.xml',params)
}
//图层配置
export function mapconfig2(params) {
  return app.$myAxios.get(baseUrl+'/hiddendanger/mapconfig.xml',{params:params})
}

// 验证令牌是否有效
export function token_validate(params) {
  return app.$myAxios.get(baseUrl+'/unifiedauth/authentication/token/validate',{params:params})
}
