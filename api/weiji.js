import Vue from 'vue'
import baseUrl from '../static/js/baseUrl'
var app = new Vue()

/**
 * 详细信息列表
 */
//公共安全--医院详情--门诊信息
export function outpatient_information(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospital/outpatient/information',params)
}
//公共安全--医院详情--住院信息
export function hospitalization_information(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospital/hospitalization/information',params)
}
//公共安全--医院详情--卫生人员
export function health_personnel(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospital/health/personnel',params)
}
//公共安全--医院详情--科室信息
export function department_information(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospital/department/information',params)
}
//公共安全--医院详情--特殊病种
export function special_diseases(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospital/special/diseases',params)
}
/**
 * 门诊信息BI
 */
//公共安全--门诊信息BI--各医院近一年门诊人次
export function outpatient_lately(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/outpatient/lately',params)
}
//公共安全--门诊信息BI--各医院门诊人次--近两年记录总和
export function outpatient_hospital(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/outpatient/hospital',params)
}
//公共安全--门诊信息BI--近一个月各医院门诊人次
export function outpatient_month(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/outpatient/near/month',params)
}
//公共安全--门诊信息BI--医院各科室门诊人次
export function outpatient_department(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/outpatient/hospital/department',params)
}
/**
 * 住院信息BI
 */
//公共安全--住院信息BI--各医院近一年住院人次
export function hospitalization_lately(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospitalization/lately',params)
}
//公共安全--住院信息BI--各医院住院人次--近两年记录总和
export function hospitalization_hospital(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospitalization/hospital',params)
}
//公共安全--住院信息BI--近一个月各医院住院人次
export function hospitalization_month(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospitalization/near/month',params)
}
//公共安全--住院信息BI--医院各科室住院人次
export function hospitalization_department(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/hospitalization/hospital/department',params)
}
/**
 * 卫生人员信息BI
 */
//公共安全--卫生人员信息BI--各医院卫生人员人次
export function healthPersonnel_num(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/healthPersonnel/num',params)
}
//公共安全--卫生人员信息BI--各医院卫生人员编制情况
export function healthPersonnel_Authorized(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/healthPersonnel/Authorized/num',params)
}
//公共安全--卫生人员信息BI--各医院医师执业类别情况
export function healthPersonnel_DOCTOR_TYPE(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/healthPersonnel/DOCTOR_TYPE/num',params)
}
//公共安全--卫生人员信息BI--各医院专业技术职务（聘）情况
export function healthPersonnel_JOB_LEVEL_CODE(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/healthPersonnel/JOB_LEVEL_CODE/num',params)
}
//公共安全--卫生人员信息BI--各医院从事的专业类别情况
export function healthPersonnel_CSZYLBDM(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/healthPersonnel/CSZYLBDM/num',params)
}
/**
 * 特殊病种信息BI
 */
//公共安全--卫生人员信息BI--12个月特殊病种数量走势
export function diseases_trend(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/special/diseases/trend',params)
}
//公共安全--卫生人员信息BI--各医院特殊病种统计
export function diseases_hospital(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/special/diseases/hospital',params)
}
//公共安全--卫生人员信息BI--所有特殊病种数量总和走势
export function diseases_num(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/special/diseases/num',params)
}
//公共安全--卫生人员信息BI--所有初诊、确证比例
export function diseases_proportion(params) {
  return app.$myAxios.myGet(baseUrl+'/publicHealth/special/diseases/proportion',params)
}
