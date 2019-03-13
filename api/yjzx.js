import Vue from 'vue'
import baseUrl from '../static/js/baseUrl'
var app = new Vue()

//登录
export function login(params) {
  return app.$myAxios.myGet(baseUrl+'/unifiedauth/authentication/login',params)
}

//预警中心--分类及其二级分类
export function alarmcenter_type(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/early/type',params)
}
//预警中心--预警趋势分析--增长率
export function alram_trend_rate(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/trend/lower/one/rate',params)
}
//预警中心--预警趋势分析--默认
export function alram_trend_one(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/trend/lower/one',params)
}
//预警中心--预警趋势分析--单个类型预警
export function alram_trend_one_drillDown(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/trend/lower/one/DrillDown',params)
}
//预警中心--对比--默认
export function alram_trend_two(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/trend/lower/two',params)
}
/**
 * 预警中心--二级
 * @param params
 * summary_code = 010  预警编号
 * date = 2018 时间
 */
export function alram_trend_two_drillDown(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/trend/lower/two/DrillDown',params)
}
//预警中心--今日预警--预警数量
export function today_alram_one(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/left/one',params)
}
//预警中心--今日预警--预警类型
export function today_alram_two(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/left/two',params)
}
//预警中心--今日预警--预警类型
/**
 *
 * @param id
 * @param params
 * data:2018-11
 */
export function today_alram_loadMap(id,params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/'+id+'/left/three/loadMap',params)
}
//预警中心--今日预警--预警详情
export function today_alram_three(id,params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/'+id+'/left/three',params)
}
//预警中心--预警信息中心--列表
export function today_alram_center(params) {
  return app.$myAxios.myPost(baseUrl+'/alarmcenter/early/information/center',params)
}
//预警中心--预警信息中心--处置状态
export function disposalState(id,params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/early/disposalState',params)
}
//预警中心--预警信息中心--列表--详情
export function today_alram_center_detail(params) {
  return app.$myAxios.myGet(baseUrl+'/alarmcenter/early/center/list/detail',params)
}
