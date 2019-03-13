/**
 * 封装生态环境一张图的前端接口
 */
// import Net from "./net";
import baseUrl from '../static/js/baseUrl';
import Vue from 'vue'
var app = new Vue()


let ecoUrl ={
  rightPopUrl:'',
  dotPopUrl:'',
  searchListUrl:baseUrl + '/search/resource', //搜索Bar
  searchResourceUrl:baseUrl + '/search/near/point',  //附近资源搜索

  air_detail:  baseUrl +'/rundisplay/air/quality/detail/lately', //空气监测的详情  id
  air_history_list:  baseUrl +'/rundisplay/air/quality/list/time',//空气监测的历史查询 列表   id=3702810000200007&startTime=2018-11-07%2013%3A19%3A00&endTime=2018-11-07%2015%3A19%3A00
  air_history_chart:  baseUrl +'/rundisplay/air/quality/line/time', //空气监测的历史查询的 图表
  water_detail:  baseUrl +'/rundisplay/water/quality/details',  // 水质监测的详情
  water_history_list:  baseUrl +'/rundisplay/water/quality/list/time', //水质监测的历史列表
  water_history_chart:  baseUrl +'/rundisplay/water/quality/line/time', //水质监测的历史图表
  pollution_detail:  baseUrl +'/rundisplay/pollutionSource/quality/details',  // 污染源监测的详情
  pollution_history_list: baseUrl +'/rundisplay/pollutionSource/quality/list/time', //污染源监测的历史列表
  pollution_history_chart: baseUrl +'/rundisplay/pollutionSource/quality/line/time', //污染源监测的历史图表

  //BI
  /*生态环境--最近十天各个空气质量监测站按天检测的平均值（SO2 NO2 PM10 CO O3 PM2.5 +AQI）--折线图*/
  rundisplay_air_day: baseUrl +'/rundisplay/avg/air/quality/line/day',
  /*生态环境--最近十天各个空气监测站报警数量--折线图*/
  rundisplay_air_alarm: baseUrl +'/rundisplay/alarm/air/quality/line/day',
  /*生态环境--最近三十天各个空气质量监测站按天检测的平均值（AQI）--柱状图*/
  rundisplay_air_avg: baseUrl +'/rundisplay/avg/air/aqi/line/day',


  /*生态环境--最近十天各个地表水监测站按天检测的平均值（总磷(w21011)、总氮(w21001)、溶解氧(w01009)小于2、氨氮(w21003)、化学需氧量(w01018））--折线图*/
  rundisplay_water_avg: baseUrl +'/rundisplay/avg/water/quality/line/day',
  /*生态环境--最近十天各个地表水监测站报警数量--折线图*/
  rundisplay_water_alarm: baseUrl +'/rundisplay/alarm/water/quality/line/day',
  /*生态环境--河流信息*/
  rundisplay_river_detail: baseUrl +'/rundisplay/river/quality/detail'
};

export const rundisplay_air_day = (name, status) => { //根据name 得到右侧弹窗的概览
  let data = {
    name
  };
  return app.$myAxios.myGet(ecoUrl.rundisplay_air_day, data);
};
export const rundisplay_air_alarm = (name, status) => { //根据name 得到右侧弹窗的概览
  let data = {
    name
  };
  return app.$myAxios.myGet(ecoUrl.rundisplay_air_alarm, data);
};
export const rundisplay_air_avg = (name, status) => { //根据name 得到右侧弹窗的概览
  let data = {
    name
  };
  return app.$myAxios.myGet(ecoUrl.rundisplay_air_avg, data);
};
export const rundisplay_water_avg = (name, status) => { //根据name 得到右侧弹窗的概览
  let data = {
    name
  };
  return app.$myAxios.myGet(ecoUrl.rundisplay_water_avg, data);
};
export const rundisplay_water_alarm = (name, status) => { //根据name 得到右侧弹窗的概览
  let data = {
    name
  };
  return app.$myAxios.myGet(ecoUrl.rundisplay_water_alarm, data);
};
export const rundisplay_river_detail = (name, status) => { //根据name 得到右侧弹窗的概览
  let data = {
    name
  };
  return app.$myAxios.myGet(ecoUrl.rundisplay_river_detail, data);
};








export const getRightPoplist = (name, status) => { //根据name 得到右侧弹窗的概览
  let data = {
    name
  };
    return app.$myAxios.myGet(ecoUrl.rightPopUrl, data);
};

export const getCneterPopData = (user, status) => {   //落点弹窗  根据
  let data = {
    /*user,
     status*/
  }
  return app.$myAxios.myGet(ecoUrl.dotPopUrl, data);
};

/*搜索的接口*/
export const getSearchList = (query) => {   //搜索  根据query={content,center,pageNum,pageSize}
  let data = {
    content : query.content,
    wd:query.wd,
    jd:query.jd,
    pageNum:query.pageNum,
    pageSize:query.pageSize
  }
  let ourl = encodeURI(ecoUrl.searchListUrl + '?content='+data.content +'&wd='+data.wd +'&jd='+data.jd +'&pageNum='+data.pageNum +'&pageSize='+data.pageSize);
  //return Net.getJSON(ecoUrl.searchListUrl, data);
  //return Net.getJSON('/data/search.json');
  return app.$myAxios.myGet(ourl);
};

/*附近资源搜索的接口*/
export const getSearchResource = (query) => {   //搜索  根据query={range, poi,center}
  let data = {
    range : query.range,
    wd:query.wd,
    jd:query.jd,
    poi:query.poi,
    layerid:query.layerid,
    tableName:query.tableName,
    tables:query.tables
  };
  let ourl = encodeURI(ecoUrl.searchResourceUrl+ '?poi='+data.tables +'&wd=' + data.wd +'&jd='+data.jd +'&range='+data.range);
  return app.$myAxios.myGet(ourl);
};

export const getAirDetail = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id
  };
  let ourl = encodeURI(ecoUrl.air_detail + '?id=' + data.id);
  return app.$myAxios.myGet(ourl);
};
export const getAirHistoryList = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id,
    type:query.type,
    startTime:query.startTime,
    endTime:query.endTime
  };
  let ourl = encodeURI(ecoUrl.air_history_list + '?id=' + data.id +'&startTime=' + data.startTime + '&endTime=' +data.endTime);
  return app.$myAxios.myGet(ourl);
};
export const getAirHistoryChart = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id,
    type:query.type,
    startTime:query.startTime,
    endTime:query.endTime
  };
  let ourl = encodeURI(ecoUrl.air_history_chart + '?id=' + data.id +'&startTime=' + data.startTime + '&endTime=' +data.endTime);
  return app.$myAxios.myGet(ourl);
};

export const getWaterDetail = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id
  };
  let ourl = encodeURI(ecoUrl.water_detail + '?id=' + data.id);
  return app.$myAxios.myGet(ourl);
};
export const getWaterHistoryList = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id,
    type:query.type,
    startTime:query.startTime,
    endTime:query.endTime
  };
  let ourl = encodeURI(ecoUrl.water_history_list + '?id=' + data.id +'&startTime=' + data.startTime + '&endTime=' +data.endTime);
  return app.$myAxios.myGet(ourl);
};
export const getWaterHistoryChart = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id,
    type:query.type,
    startTime:query.startTime,
    endTime:query.endTime
  };
  let ourl = encodeURI(ecoUrl.water_history_chart + '?id=' + data.id +'&startTime=' + data.startTime + '&endTime=' +data.endTime);
  return app.$myAxios.myGet(ourl);
};

export const getPollutionDetail = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id
  };
  let ourl = encodeURI(ecoUrl.pollution_detail + '?id=' + data.id);
  return app.$myAxios.myGet(ourl);
};
export const getPollutionHistoryList = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id,
    type:query.type,
    startTime:query.startTime,
    endTime:query.endTime
  };
  let ourl = encodeURI(ecoUrl.pollution_history_list + '?id=' + data.id +'&startTime=' + data.startTime + '&endTime=' +data.endTime);
  return app.$myAxios.myGet(ourl);
};
export const getPollutionHistoryChart = (query) => { //根据name 得到右侧弹窗的概览
  let data = {
    id:query.id,
    type:query.type,
    startTime:query.startTime,
    endTime:query.endTime
  };
  let ourl = encodeURI(ecoUrl.pollution_history_chart + '?id=' + data.id +'&startTime=' + data.startTime + '&endTime=' +data.endTime);
  return app.$myAxios.myGet(ourl);
};
