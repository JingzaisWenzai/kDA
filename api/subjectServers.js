import baseUrl from '../static/js/baseUrl';
import Vue from 'vue'
var app = new Vue()

/**城市基本面*/

/**
 * 人口基本面
 */
//城市体征面--人口--统计
export function population_leftOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/leftOne',params)
}
//城市体征面--人口--按街道、社区统计
export function population_leftTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/leftTwo',params)
}
/**
 * 第一页
 */
// 人口基本面--户籍人口数量--时间
export function population_rightOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightOne',params)
}
// 人口基本面--外来人口分布Top-10
export function population_rightTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightTwo',params)
}
// 人口基本面--年龄结构金字塔
export function population_rightThree(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightThree',params)
}
// 人口基本面--近五年人才引进情况
export function population_rightFour(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightFour',params)
}
/**
 * 第二页
 */
// 人口基本面--人才补贴籍贯地
export function population_rightFive(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightFive',params)
}
// 人口基本面--人才补贴发放金额
export function population_rightSix(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightSix',params)
}
// 人口基本面--失业人口走势
export function population_rightSeven(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightSeven',params)
}
// 人口基本面--引进人口学历构成
export function population_rightEight(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightEight',params)
}
/**
 * 第三页
 */
// 人口基本面--残疾人群数量及增长率
export function population_rightNight(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightNight',params)
}
// 人口基本面--老年人口数量及增长率
export function population_rightTen(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightTen',params)
}
// 人口基本面--儿童数量--按街道统计
export function population_rightEleven(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightEleven',params)
}
// 人口基本面--孕妇数量及增长率<未开发>
export function population_rightTwelve(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/population/basic/rightTwelve',params)
}
/**
 * 法人基本面
 */
// 城市基本面--法人--企业总数
export function legalPerson_leftOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/leftOne',params)
}
// 城市基本面--法人--各街道企业分布
export function legalPerson_leftTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/leftTwo',params)
}
// 城市基本面--法人--企业各行分类数量
export function legalPerson_rightOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/rightOne',params)
}
// 城市基本面--法人--企业类型数量
export function legalPerson_rightTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/rightTwo',params)
}
// 城市基本面--法人--各街道P2P平台占比
export function legalPerson_rightThree(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/rightThree',params)
}
// 城市基本面--法人--全区平台风险类型占比
export function legalPerson_rightFour(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/rightFour',params)
}
// 城市基本面--法人--各平台冒烟指数Top10
export function legalPerson_rightFive(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/rightFive',params)
}
// 城市基本面--法人--待偿还金额Top10
export function legalPerson_rightSix(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/legalPerson/rightSix',params)
}
/**
 * 房屋楼栋基本面
 */
// 楼栋基本面--建筑--居住建筑数量
export function buildBasic_leftOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/leftOne',params)
}
// 楼栋基本面--建筑--商业建筑数量
export function buildBasic_leftTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/leftTwo',params)
}
// 楼栋基本面--建筑--棚旧改项目数量
export function buildBasic_leftThree(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/leftThree',params)
}
// 楼栋基本面--建筑--各街道-楼栋数量
export function buildBasic_leftFour(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/leftFour',params)
}
// 楼栋基本面--建筑--居住/商业 建筑层高类别统计
export function buildBasic_rightOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/rightOne',params)
}
// 楼栋基本面--建筑--居住/商业 SJYT设计用途的建筑面积
export function buildBasic_rightTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/rightTwo',params)
}
// 楼栋基本面--建筑--使用用途占比统计（饼图）
export function buildBasic_rightThree(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/rightThree',params)
}
// 楼栋基本面--房屋--使用情况占比统计（饼图）
export function buildBasic_rightFour(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/buildBasic/rightFour',params)
}
/**
 * 城市部件基本面
 */
// 楼栋基本面--城市部件数量
export function component_leftOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/component/leftOne',params)
}
// 楼栋基本面--城市部件种类
export function component_leftTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/component/leftTwo',params)
}
// 楼栋基本面--柱状图-各街道部件数量
export function component_leftThree(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/component/leftThree',params)
}
// 楼栋基本面--柱状图-各部门部件数量
export function component_rigthOne(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/component/rigthOne',params)
}
// 楼栋基本面--柱状图-设备完好度--七大类
export function component_rigthTwo(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/component/rigthTwo',params)
}
// 楼栋基本面--柱状图-城市部件Top5
export function component_rigthThree(params) {
  return app.$myAxios.myGet(baseUrl+'/urbansign/component/rigthThree',params)
}

