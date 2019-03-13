import baseUrl from '../static/js/baseUrl';
import Vue from 'vue'
var app = new Vue()

/**
 * tableau集成
 */
//tableau集成--获取ticket
export function tableau_ticket(params) {
  return app.$myAxios.myGet(baseUrl+'/tableau/ticket',params)
}
//tableau集成--报告列表
export function tableau_list(params) {
  return app.$myAxios.myGet(baseUrl+'/tableau/list',params)
}

/**
 * 城市体征
 */

/**
 * 公共安全
 */
//城市体征--公共安全
export function publicSecurity(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/publicSecurity',params)
}
//城市体征--公共安全--详情
export function publicSecurityDetail(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/publicSecurity/detail',params)
}

/**
 * 生态环境
 */
//城市体征--生态环境
export function ecological_total(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/ecological/total',params)
}
export function ecological_air_day(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/ecological/air/day',params)
}
export function ecological_air_month(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/ecological/air/month',params)
}
export function ecological_waterOnGround_day(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/ecological/waterOnGround/day',params)
}
export function ecological_waterOnGround_month(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/ecological/waterOnGround/month',params)
}
export function ecological_waterQuality_day(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/ecological/waterQuality/day',params)
}
export function ecological_waterQuality_month(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/ecological/waterQuality/month',params)
}

/**
 * 宏观经济
 */
//城市体征--宏观经济
export function macroEconomy(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/macroEconomy',params)
}
//城市体征--宏观经济--详情
export function macroEconomyDetail(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/macroEconomy/detail',params)
}
/**
 * 民生服务
 */
// 城市体征--民生服务-总图表
export function peopleLive_total(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/peopleLive/total',params)
}
// 城市体征--民生服务-幼儿园
export function peopleLive_littleSchool(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/peopleLive/littleSchool',params)
}
// 城市体征--民生服务-小学
export function peopleLive_smallSchool(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/peopleLive/smallSchool',params)
}
// 城市体征--民生服务-普通中学
export function peopleLive_middleSchool(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/peopleLive/middleSchool',params)
}
// 城市体征--民生服务-职业中学
export function peopleLive_professionalSchool(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/peopleLive/professionalSchool',params)
}
// 城市体征--民生服务-养老
export function peopleLive_feedOld(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/peopleLive/feedOld',params)
}
// 城市体征--民生服务-医院床位
export function peopleLive_hospitalBed(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/peopleLive/hospitalBed',params)
}
/**
 * 城市部件
 */
//城市体征--城市部件--总
export function cityComponent_total(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/cityComponent/total',params)
}
//城市体征--城市部件--视频
export function cityComponent_camera(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/cityComponent/camera',params)
}
//城市体征--城市部件--城市部件
export function cityComponent_cityComponent(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/cityComponent/cityComponent',params)
}
//城市体征--城市部件--物联
export function cityComponent_iot(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/cityComponent/iot',params)
}
//城市体征--城市部件--监测站
export function cityComponent_site(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/citySign/cityComponent/site',params)
}
