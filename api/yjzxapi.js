import Vue from 'vue'
var app = new Vue()


let url = "/web/yjzxdata";
let yjzx={};

export const getlist = (user, status) => {      //预警信息中心
  var data = {
    /*user,
    status*/
  }
  return app.$myAxios.myGet(url+"/dataJson.json", data);
/*
  return app.$myAxios.myPost(baseUrl.baseUrl + "/today_alram/alarm/type", data);
*/
}
export const getDetail = (user, status) => {
  var data = {
    /*user,
    status*/
  }
  return app.$myAxios.myGet(url+"/detail.json", data);
/*
  return app.$myAxios.myPost(baseUrl.baseUrl + "/today_alram/alarm/type", data);
*/
}

export const gettype = (user, status) => {
  var data = {

  }
  return app.$myAxios.myGet(url+"/todaydataJson.json", data);
}

export const getTrend = (user, status) => {   //预警趋势
  var data = {

  }
  return app.$myAxios.myGet(url+"/trenddataJson.json", data);
}
export const getCom = (user, status) => {
  var data = {

  }
  return app.$myAxios.myGet(url+"/comdataJson.json", data);
}
export const getCom2017 = (user, status) => {
  var data = {

  }
  return app.$myAxios.myGet(url+"/comdataJson2017.json", data);
}

