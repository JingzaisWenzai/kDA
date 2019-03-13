/**
 * 封装安全隐患一张图的前端接口
 */
// import Net from "./net";
import baseUrl from '../static/js/baseUrl';
import Vue from 'vue'
var app = new Vue()

let secUrl ={
  'block3_threeSmall': baseUrl + '/hd_chart/three_small_places_hd_line', //隐患分类  三小场所隐患 DotCurve
  'block1_safety': baseUrl + '/hd_chart/all_region_hd_pie',    //全区安全隐患
  'block2_num': baseUrl + '/hd_chart/region_hd_num_line',      //区域隐患数量
  'block3_fire': baseUrl + '/hd_chart/sanfang/yilaodian', //隐患分类 消防隐患 （写死的）
  'block3_defense':  baseUrl + '/hd_chart/xiaofang/yinhuan', //隐患分类 三防隐患 （写死的）
  'key_danger' : baseUrl +'/T_BUILD_INFO_V/build/danger/rank', //重点隐患排行的数据获取
  'popup_cityRisk_basic': baseUrl + '/hiddendanger/URBAN_RISK/detail/information', // 基本信息和责任主体   城市风险评估查看详情的
  'popup_cityRisk_agency': baseUrl + '/hiddendanger/URBAN_RISK/detail/information/regulatory/agency', // 监管机构 城市风险评估查看详情的数据获取
  'popup_cityRisk_assessment': baseUrl + '/hiddendanger/URBAN_RISK/detail/information/risk/assessment', // 风险评估 城市风险评估查看详情的数据获取
  'popup_cityRisk_danger': baseUrl + '/hiddendanger/URBAN_RISK/detail/information/risk/danger', //风险隐患 城市风险评估查看详情的数据获取
  'popup_cityRisk_aAlarm': baseUrl + '/hiddendanger/URBAN_RISK/detail/information/risk/aAlarm', //风险预警 城市风险评估查看详情的数据获取
  'popup_cityRisk_accident': baseUrl + '/hiddendanger/URBAN_RISK/detail/information/risk/accident', //风险事故 城市风险评估查看详情的数据获取
  'popup_trichrome':baseUrl + '/hd/fire/list', //隐患三色
  'popup_distribution':baseUrl + '/hd/check/list',//隐患分布
  'popup_buildingRisk_basic':baseUrl + '/T_BUILD_INFO_V/build/basic',//建筑风险基本信息  传参用buildid
  'popup_buildingRisk_risk':baseUrl+"/T_BUILD_INFO_V/build/risk",//建筑风险 建筑风险   传参用buildid
  'popup_buildingRisk_hidden_danger':baseUrl+"/T_BUILD_CHECKDAY_DANGER/build/hidden_danger",//建筑风险 建筑隐患信息  pageNum: 1,pageSize: 6,buildid:id
  'popup_buildingRisk_enterprise':baseUrl+"/BLK_LEGAL_PERSON/build/enterprise",//建筑风险企业风险 pageNum: 1,pageSize: 6,buildid:id
  'popup_buildingRisk_duty':baseUrl+"/QXFJ_BUILD_ZTZR_V/build/responsibility",//建筑责任信息  建筑隐患信息 buildid:id
  'popup_buildingRisk_plain':baseUrl+"/QXFJ_BUILD_IMAGE_V/build/graphicDrawings",//建筑责任信息 pageNum: 1,pageSize: 6,buildid:id
//纳管企业
  'popup_enterprise_basic':baseUrl +'/hiddendanger/QAJJ_PUCENTP_V/detail/information', //纳管企业 信息详情和信息主体
  'popup_enterprise_agency':baseUrl +'/hiddendanger/QAJJ_PUCENTP_V/detail/information/regulatory/agency', //纳管企业 监管机构
  'popup_enterprise_assessment':baseUrl +'/hiddendanger/QAJJ_PUCENTP_V/detail/information', //纳管企业 风险评估
  'popup_enterprise_danger':baseUrl +'/hiddendanger/QAJJ_PUCENTP_V/detail/information/risk/danger',  //纳管企业 风险隐患
  'popup_enterprise_aAlarm':baseUrl +'/hiddendanger/QAJJ_PUCENTP_V/detail/information', //纳管企业 风险预警
  'popup_enterprise_accident':baseUrl +'/hiddendanger/QAJJ_PUCENTP_V/detail/information/risk/accident', //纳管企业 风险事故

  'popup_ThreeS' :baseUrl +'/hiddendanger/sanxiao/placeDetails',         /*三小场所*/
  'popup_placeTip' :baseUrl +'/hiddendanger/sanxiao/placeTip',         /*三小场所 弹框 新增*/
  'sanxiao_placeScore':baseUrl+'/hiddendanger/sanxiao/placeScore',/*三小场所--风险评分  新增*/
  'getTicket':baseUrl +'/hiddendanger/threesmall/event/getTicket',
  'popup_Emergency_warehouse':baseUrl +'/hiddendanger/emergency/warehouseDetails',       /*应急资源*/

  'popip_iot_yanwu_summaryInfo':baseUrl + '/IOT_DEVICE@yanwu/iot/summaryInfo',//物联网 简介 id=0003014418061820
  'popip_iot_yanwu_detail':baseUrl + '/iot/IndexDetectionDetails',//物联网 详情 id=0003014418061820
  'popip_iot_yanwu_pageInfo':baseUrl + '/iot/IndexDetectionDetails/pageInfo',//物联网 下一页  pageNum=1&pageSize=3&id=0
  'popip_iot_dianqihuozaijiance_summaryInfo':baseUrl + '/IOT_DEVICE@dianqihuozaijiance/iot/summaryInfo',//物联网 简介 id=0003014418061820
  'popip_iot_dianqihuozaijiance_detail':baseUrl + '/iot/IndexDetectionDetails',//物联网 详情 id=0003014418061820
  'popip_iot_dianqihuozaijiance_pageInfo':baseUrl + '/iot/IndexDetectionDetails/pageInfo',//物联网 下一页  pageNum=1&pageSize=3&id=0
  'popip_iot_yilaodian_summaryInfo':baseUrl + '/IOT_DEVICE@neilaojiance/iot/summaryInfo',//物联网 简介 id=0003014418061820
  'popip_iot_yilaodian_detail':baseUrl + '/iot/IndexDetectionDetails',//物联网 详情 id=0003014418061820
  'popip_iot_yilaodian_pageInfo':baseUrl + '/iot/IndexDetectionDetails/pageInfo',//物联网 下一页  pageNum=1&pageSize=3&id=0
  'cityRisk_right_one':baseUrl +'/hiddendanger/URBAN_RISK/chart/right/one',  //城区风险评估右侧弹窗的头 street
  'cityRisk_right_two':baseUrl +'/hiddendanger/URBAN_RISK/chart/right/two',  //城区风险评估右侧的中间  street
  'cityRisk_right_three':baseUrl +'/hiddendanger/URBAN_RISK/chart/right/three', //城区风险评估右侧的底部  street
  'cityRisk_right_four':baseUrl +'/hiddendanger/URBAN_RISK/chart/right/four', //城区风险评估右侧的底部  street

  'alarm_report':baseUrl +'/alarmcenter/hidden/danger/alarm/list', //左上角的预警
  'poi_All':baseUrl +'/hiddendanger/nearly/mapConfig/mapdata',    //POI

  'warnList':baseUrl+'/hiddendanger/allrigionhiddendanger/hiddendanger/list',//隐患列表

  //三小场所BI
  'threesmallchart_pie':baseUrl +'/hiddendanger/threesmallchart/pie',
  'threesmallchart_line':baseUrl +'/hiddendanger/threesmallchart/line',
  'threesmallchart_streetBar':baseUrl +'/hiddendanger/threesmallchart/streetBar',
  'threesmallchart_bar':baseUrl +'/hiddendanger/threesmallchart/bar',
  //消防
  'firehiddendangerchart_bar':baseUrl +'/hiddendanger/firehiddendangerchart/bar',
  'firehiddendangerchart_pie':baseUrl +'/hiddendanger/firehiddendangerchart/pie',
  //应急资源
  'emergencyhiddendangerchart_count5num':baseUrl +'/hiddendanger/emergencyhiddendangerchart/count5num',
  'emergencyhiddendangerchart_leftPie':baseUrl +'/hiddendanger/emergencyhiddendangerchart/leftpie',
  'emergencyhiddendangerchart_rightPie':baseUrl +'/hiddendanger/emergencyhiddendangerchart/rightpie',
  'emergencyhiddendangerchart_table':baseUrl +'/hiddendanger/emergencyhiddendangerchart/table',
  //物联监测
  'iothiddendangerchart_leftPie':baseUrl +'/hiddendanger/iothiddendangerchart/leftpie',
  'iothiddendangerchart_rightPie':baseUrl +'/hiddendanger/iothiddendangerchart/rightpie',
  'iothiddendangerchart_line':baseUrl +'/hiddendanger/iothiddendangerchart/line',
  //地质
  'geologyhiddendangerchart_countAll':baseUrl +'/hiddendanger/geologyhiddendangerchart/countAll',
  'geologyhiddendangerchart_lefttoppie':baseUrl +'/hiddendanger/geologyhiddendangerchart/lefttoppie',
  'geologyhiddendangerchart_righttoppie':baseUrl +'/hiddendanger/geologyhiddendangerchart/righttoppie',
  'geologyhiddendangerchart_bottompie':baseUrl +'/hiddendanger/geologyhiddendangerchart/bottompie',
  //总体
  'allrigionhiddendangerchart_bar':baseUrl +'/hiddendanger/allrigionhiddendangerchart/bar',
  'allrigionhiddendangerchart_pie':baseUrl +'/hiddendanger/allrigionhiddendangerchart/pie',
  //获取对应信息列表项的落点信息
  'infoList_each_node':baseUrl +'/hiddendanger/ZHONGDIANCHANGSUO/selectByExample',
};

export const getTablelist = (user, status) => { //根据街道，左侧table
  let data = {
    /*user,
    status*/
  }
  if(user === "risk"){
    return app.$myAxios.myGet("/data/tableList2.json", data);
  }else {
    return app.$myAxios.myGet("/data/tableList.json", data);
  }
}
export const getRiskData = (user, status) => {  //根据街道，右侧风险概览
  let data = {
    /*user,
    status*/
  }
  if("园岭街道" === user){
    return app.$myAxios.myGet("/data/riskqu.json", data);
  }else {
    return app.$myAxios.myGet("/data/risk.json", data);
  }
}
export const getPopData = (user, status) => {   //落点弹窗
  let data = {
    /*user,
    status*/
  }
  return app.$myAxios.myGet("/data/popUp.json", data);
}
export const getBlock1  = (query) => {   //全区安全隐患    对接旧有接口（完成）
  let ourl = encodeURI(secUrl.block1_safety + '?season='+  query.season);
   return app.$myAxios.myGet(ourl);
   //return app.$myAxios.myGet("/data/block1.json");
}
export const getBlock2 = (query) => {   //区域隐患数量       对接新有接口（完成）
  let ourl = encodeURI(secUrl.block2_num + '?season='+query.season);
  return app.$myAxios.myGet(ourl);
  //return app.$myAxios.myGet(secUrl.block2_num, data);
  //return app.$myAxios.myGet("/data/block2.json");
}
export const getBlock3_threeSmall = (query) => {   //隐患分类 三小场所  对接旧有接口（完成）
  let ourl = encodeURI(secUrl.block3_threeSmall + '?season='+query.season);
  return app.$myAxios.myGet(ourl);
  //return app.$myAxios.myGet(secUrl.block3_threeSmall, data);
  //return app.$myAxios.myGet("/data/block3_threeSmall.json");
}
export const getBlock3_fire = (query) => {   //隐患分类 三防 对接新接口（完成）
  let ourl = encodeURI(secUrl.block3_fire + '?season='+query.season);
  return app.$myAxios.myGet(ourl);
  //return app.$myAxios.myGet("/data/block3_fire.json");
}
export const getBlock3_defense = (query) => {   //隐患分类 消防 对接新接口（完成）
  let ourl = encodeURI(secUrl.block3_defense + '?season='+query.season);
  return app.$myAxios.myGet(ourl);
  //return app.$myAxios.myGet("/data/block3_defense.json");
}
export const getKey_danger = (query) => {   //消防类 隐患风险点击出来的重点隐患排行 对接新接口
  let ourl = encodeURI(secUrl.key_danger);
  return app.$myAxios.myGet(ourl);
}
/*查看详情弹窗接口对接*/
export const getPopUp_CityRisk_Basic = (query) => {   //城区风险评估 基本信息和责任主体
  let ourl = encodeURI(secUrl.popup_cityRisk_basic) + '?id='+query.id;
  //let ourl = '/data/CityRisk.json';
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_CityRisk_Agency = (query) => {   //城区风险评估  监管机构
  let ourl = encodeURI(secUrl.popup_cityRisk_agency) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  //let ourl = '/data/CityRisk.json';
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_CityRisk_Assessment = (query) => {   //城区风险评估 风险评估
  let ourl = encodeURI(secUrl.popup_cityRisk_assessment) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  //let ourl = '/data/CityRisk.json';
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_CityRisk_Danger = (query) => {   //城区风险评估 风险隐患
  let ourl = encodeURI(secUrl.popup_cityRisk_danger) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  //let ourl = '/data/CityRisk.json';
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_CityRisk_Alarm = (query) => {   //城区风险评估 风险预警
  let ourl = encodeURI(secUrl.popup_cityRisk_aAlarm) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  //let ourl = '/data/CityRisk.json';
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_CityRisk_Accident = (query) => {   //城区风险评估 风险事故
  let ourl = encodeURI(secUrl.popup_cityRisk_accident) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  //let ourl = '/data/CityRisk.json';
  return app.$myAxios.myGet(ourl);
}

export const getPopUp_Trichrome = (query) => {   //隐患三色
  let ourl = encodeURI(secUrl.popup_trichrome) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Distribution = (query) => {   //隐患分布
  let ourl = encodeURI(secUrl.popup_distribution) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}

/*建筑风险*/
export const getPopUp_BuildingRisk_basic = (query) => {   //建筑风险
  let ourl = encodeURI(secUrl.popup_buildingRisk_basic) + '?buildid='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_BuildingRisk_risk = (query) => {   //建筑风险
  let ourl = encodeURI(secUrl.popup_buildingRisk_risk) + '?buildid='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const popup_BuildingRisk_hidden_danger = (query) => {   //建筑风险
  let ourl = encodeURI(secUrl.popup_buildingRisk_hidden_danger) + '?buildid='+query.id+'&pageNum='+query.pageNum +'&pageSize='+query.pageSize;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_BuildingRisk_enterprise = (query) => {   //建筑风险
  let ourl = encodeURI(secUrl.popup_buildingRisk_enterprise) + '?buildid='+query.id +'&pageNum='+query.pageNum +'&pageSize='+query.pageSize;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_BuildingRisk_duty = (query) => {   //建筑责任
  let ourl = encodeURI(secUrl.popup_buildingRisk_duty) + '?buildid='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_BuildingRisk_plain = (query) => {   //平面图纸
  let ourl = encodeURI(secUrl.popup_buildingRisk_plain) + '?buildid='+query.id;
  return app.$myAxios.myGet(ourl);
}

/*纳管企业*/
export const getPopUp_enterprise_Basic = (query) => {   //建筑风险 + 纳管企业
  let ourl = encodeURI(secUrl.popup_enterprise_basic) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_enterprise_Agency = (query) => {   //建筑风险 + 纳管企业
  let ourl = encodeURI(secUrl.popup_enterprise_agency) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_enterprise_Assessment = (query) => {   //建筑风险 + 纳管企业
  let ourl = encodeURI(secUrl.popup_enterprise_assessment) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_enterprise_Danger = (query) => {   //建筑风险 + 纳管企业
  let ourl = encodeURI(secUrl.popup_enterprise_danger) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_enterprise_Alarm = (query) => {   //建筑风险 + 纳管企业
  let ourl = encodeURI(secUrl.popup_enterprise_aAlarm) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_enterprise_Accident = (query) => {   //建筑风险 + 纳管企业
  let ourl = encodeURI(secUrl.popup_enterprise_accident) + '?id='+query.id+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize;
  return app.$myAxios.myGet(ourl);
}

export const getWarnList = (query)=>{
  /**
   * startTime=2019-01-01 00:00:00&endTime=2019-01-01 00:00:00&pageNum=1&pageSize=20
   */
  // let ourl = encodeURI(secUrl.warnList)+'?startTime='+query.startTime+'&endTime='+query.endTime+'&pageNum='+query.pageNum+'&pageSize='+query.pageSize
  return app.$myAxios.myGet(secUrl.warnList,query)
}


export const getPopUp_ThreeS = (query) =>{         /*三小场所*/
  let ourl = encodeURI(secUrl.popup_ThreeS) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopup_placeTip = (query) =>{         /*三小场所 弹框 新增*/
  let ourl = encodeURI(secUrl.popup_placeTip) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getSanxiao_placeScore = (query) =>{/*三小场所--风险评分  新增*/
  let ourl = encodeURI(secUrl.sanxiao_placeScore) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}

export const getTetTicket = ()=>{
  let ourl = encodeURI(secUrl.getTicket)
  return app.$myAxios.myGet(ourl)
}
export const getPopUp_Emergency = (query) =>{      /*应急仓库*/
  let ourl = encodeURI(secUrl.popup_Emergency_warehouse) + '?name='+query.id;
  return app.$myAxios.myGet(ourl);
}
/*物联网 3组*/
export const getPopUp_Iot_yanwu_summaryInfo = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_yanwu_summaryInfo) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_yanwu_detail = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_yanwu_detail) + '?device_code='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_yanwu_pageInfo = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_yanwu_pageInfo) + '?device_code='+query.id +'&pageNum='+query.pageNum +'&pageSize='+query.pageSize+'&alarm_type_code='+query.code;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_dianqihuozaijiance_summaryInfo = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_dianqihuozaijiance_summaryInfo) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_dianqihuozaijiance_detail = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_dianqihuozaijiance_detail) + '?device_code='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_dianqihuozaijiance_pageInfo = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_dianqihuozaijiance_pageInfo) + '?device_code='+query.id +'&pageNum='+query.pageNum +'&pageSize='+query.pageSize+'&alarm_type_code='+query.code;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_yilaodian_summaryInfo = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_yilaodian_summaryInfo) + '?id='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_yilaodian_detail = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_yilaodian_detail) + '?device_code='+query.id;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_Iot_yilaodian_pageInfo = (query) => {   //物联网 + 易涝点
  let ourl = encodeURI(secUrl.popip_iot_yilaodian_pageInfo) + '?device_code='+query.id +'&pageNum='+query.pageNum +'&pageSize='+query.pageSize+'&alarm_type_code='+query.code;
  return app.$myAxios.myGet(ourl);
}

/*城区风险评估右侧弹窗*/

export const getPopUp_cityRisk_right_one = (query) => {    //右侧弹窗图表
  let ourl = encodeURI(secUrl.cityRisk_right_one) + '?street='+query.street;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_cityRisk_right_two = (query) => {   //右侧弹窗图表
  let ourl = encodeURI(secUrl.cityRisk_right_two) + '?street='+query.street;
  return app.$myAxios.myGet(ourl);
}
export const getPopUp_cityRisk_right_three= (query) => {   //右侧弹窗图表
  let ourl = encodeURI(secUrl.cityRisk_right_three) + '?street='+query.street;
  return app.$myAxios.myGet(ourl);
}

export const getPopUp_cityRisk_right_four= (query) => {   //右侧弹窗图表
  let ourl = encodeURI(secUrl.cityRisk_right_four) + '?street='+query.street;
  return app.$myAxios.myGet(ourl);
}

/*预警信息左上角*/

export const getAlarm_report =() =>{   //左上角预警
  let ourl = encodeURI(secUrl.alarm_report);
  return app.$myAxios.myGet(ourl);
}

/*搜索框的POI*/
export const getPOI=()=>{
  let ourl = encodeURI(secUrl.poi_All);
  return app.$myAxios.myGet(ourl);
}

// 三小场所BI
export const threesmallchart_pie = (query) => {
  let ourl = encodeURI(secUrl.threesmallchart_pie);
  return app.$myAxios.myGet(ourl);
}
export const threesmallchart_line = (query) => {
  let ourl = encodeURI(secUrl.threesmallchart_line);
  return app.$myAxios.myGet(ourl);
}
export const threesmallchart_streetBar = (query) => {
  let ourl = encodeURI(secUrl.threesmallchart_streetBar);
  return app.$myAxios.myGet(ourl);
}
export const threesmallchart_bar = (query) => {
  let ourl = encodeURI(secUrl.threesmallchart_bar);
  return app.$myAxios.myGet(ourl);
}
//消防
export const firehiddendangerchart_bar = (query) => {
  let ourl = encodeURI(secUrl.firehiddendangerchart_bar);
  return app.$myAxios.myGet(ourl);
}
export const firehiddendangerchart_pie = (query) => {
  let ourl = encodeURI(secUrl.firehiddendangerchart_pie);
  return app.$myAxios.myGet(ourl);
}
//应急资源
export const emergencyhiddendangerchart_count5num = (query) => {
  let ourl = encodeURI(secUrl.emergencyhiddendangerchart_count5num);
  return app.$myAxios.myGet(ourl);
}
export const emergencyhiddendangerchart_leftPie = (query) => {
  let ourl = encodeURI(secUrl.emergencyhiddendangerchart_leftPie);
  return app.$myAxios.myGet(ourl);
}
export const emergencyhiddendangerchart_rightPie = (query) => {
  let ourl = encodeURI(secUrl.emergencyhiddendangerchart_rightPie);
  return app.$myAxios.myGet(ourl);
}
export const emergencyhiddendangerchart_table = (query) => {
  let ourl = encodeURI(secUrl.emergencyhiddendangerchart_table);
  return app.$myAxios.myGet(ourl);
}
//物联监测
export const iothiddendangerchart_leftPie = (query) => {
  let ourl = encodeURI(secUrl.iothiddendangerchart_leftPie);
  return app.$myAxios.myGet(ourl);
}
export const iothiddendangerchart_rightPie = (query) => {
  let ourl = encodeURI(secUrl.iothiddendangerchart_rightPie);
  return app.$myAxios.myGet(ourl);
}
export const iothiddendangerchart_line = (query) => {
  let ourl = encodeURI(secUrl.iothiddendangerchart_line);
  return app.$myAxios.myGet(ourl);
}
//地质
export const geologyhiddendangerchart_countAll = (query) => {
  let ourl = encodeURI(secUrl.geologyhiddendangerchart_countAll);
  return app.$myAxios.myGet(ourl);
}
export const geologyhiddendangerchart_lefttoppie = (query) => {
  let ourl = encodeURI(secUrl.geologyhiddendangerchart_lefttoppie);
  return app.$myAxios.myGet(ourl);
}
export const geologyhiddendangerchart_righttoppie = (query) => {
  let ourl = encodeURI(secUrl.geologyhiddendangerchart_righttoppie);
  return app.$myAxios.myGet(ourl);
}
export const geologyhiddendangerchart_bottompie = (query) => {
  let ourl = encodeURI(secUrl.geologyhiddendangerchart_bottompie);
  return app.$myAxios.myGet(ourl);
}
//总体
export const allrigionhiddendangerchart_pie = (query) => {
  let ourl = encodeURI(secUrl.allrigionhiddendangerchart_pie);
  return app.$myAxios.myGet(ourl);
}
export const allrigionhiddendangerchart_bar = (query) => {
  let ourl = encodeURI(secUrl.allrigionhiddendangerchart_bar);
  return app.$myAxios.myGet(ourl);
}

