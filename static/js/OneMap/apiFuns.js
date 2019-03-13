import $ from 'jquery';
// import axios from 'axios';
import {setStore} from "../../../static/js/OneMap/common/common.js"
// import Net from "../../../utils/net";
import baseUrl from '../../../static/js/baseUrl';
import Vue from 'vue'
var app = new Vue()


//通用
let Fun={};
Fun.url = baseUrl +'/hiddendanger/mapConfig/mapdata';
Fun.xmlArray = [];//需要落图的数据
Fun.idsingle = []; //用于落图单选
Fun.dataflag = true; //用于落图单选

Fun.commonMap =function (obj,owindow) {
  console.log('APIFUN');
  Fun.data(owindow,obj);
}
/*转化xml为json*/
/*
Fun.xmlToJson = function(nodes) {
    let itemList = new Array();
    $.each(nodes, function () {
      let entity = {};
      let obj = $(this);
      entity.label = obj[0].getAttribute("label");
      entity.id = obj[0].getAttribute("id");
      entity.name = obj[0].getAttribute("name");
      if (obj[0].hasChildNodes()) {
        entity.nodes = Fun.xmlToJson(obj.children());
      }
      else {
        entity.pid = obj[0].getAttribute("pid");
        entity.type = obj[0].getAttribute("type");
        entity.show = obj[0].getAttribute("show");
        entity.bm = obj[0].getAttribute("bm");
        entity.function = obj[0].getAttribute("function");
        entity.url = obj[0].getAttribute("url");
        entity.query = obj[0].getAttribute("query");
        entity.icon = obj[0].getAttribute("icon");
      }
      itemList.push(entity);
});

    return itemList;
  }

Fun.String2XML = function(win,xmlString) {
    // for IE
    if (win.ActiveXObject) {
      let xmlobject1 = new ActiveXObject("Microsoft.XMLDOM");
      xmlobject1.async = "false";
      xmlobject1.loadXML(xmlString);
      return xmlobject1;
    }
    else {
      let parser = new DOMParser();
      let xmlobject2 = parser.parseFromString(xmlString, "text/xml");
      return xmlobject2;
    }
}
*/


Fun.data = function (win,obj) {     //从xml文件获取数据

  if(Fun.dataflag){
    Fun.dataflag = false;
    app.$myAxios.myGet(Fun.url).then(function(response) {
      Fun.xmlArray = response;
      //console.log(Fun.xmlArray);
      let f = "Fun."+obj.oid+"."+(obj.oid === 'sec'?'riskType':'env')+".sub.common(obj)";
      eval(f);
    })

  }else {
    let f = "Fun."+obj.oid+"."+(obj.oid === 'sec'?'riskType':'env')+".sub.common(obj)";
    eval(f);
  }
};

/*生态环境一张图部分底部导航栏*/
Fun.eco = {};
Fun.eco.env={};
Fun.eco.env.common=function(){ //父span
  console.log('点击环境监测点按钮');
};
Fun.eco.env.sub={};  //
Fun.eco.env.sub.pop=function(type){ //外在的窗
  console.log('右侧type类型的数据的展示');
}
Fun.eco.env.sub.common=function(obj){  //子span
  Fun.sec.riskType.sub.common(obj);
 /* *根据类型值，进行落图，详情弹窗**/
};
Fun.eco.video={};
Fun.eco.video.common=function(){
  // 父span
};
Fun.eco.video.sub={};
Fun.eco.video.sub.pop =function(type){
  //视频点击弹窗
};
Fun.eco.video.sub.common=function(obj){
  //根据不同的type进行落图
  Fun.sec.riskType.sub.common(obj);
};
Fun.eco.analysis={};
Fun.eco.analysis.common=function(){ // 父span
};
Fun.eco.analysis.sub={};
Fun.eco.analysis.sub.pop =function(type){
  //环境状态分析点击弹窗
};

Fun.eco.analysis.sub.common=function(obj){
  Fun.sec.riskType.sub.common(obj);
 /* let mapType = obj.mapType;
  let name = obj.name;
  let dataArr = Fun.xmlArray;
  for(let i = 0;i< dataArr.length;i++){
    if(dataArr[i].name == mapType){
      for(let j = 0;j<dataArr[i].nodes.length;j++){
        if(dataArr[i].nodes[j].name == name){
          Fun.loadMap(dataArr[i].nodes[j].id,!(dataArr[i].nodes[j].checked));
          dataArr[i].nodes[j].checked = !(dataArr[i].nodes[j].checked);
        }
      }
    }
  }*/
}


/*安全隐患一张图城区风险部分导航栏*/
Fun.sec ={};
//wyk  落图
Fun.sec.riskType={};
Fun.sec.riskType.sub={};

/*单点落图*/
Fun.loadSearchPoint = function(pid,data){
  Fun.removeSingleLayer();
  let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
  let pointJsonFeature = document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");
  document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.loadUtil.loadSinglePointJsonResultGrapicLayer(pointJsonFeature.graphics,node);

  Fun.removeSingleLayerData = {type:'quanyujiansuo',data:{graphics:pointJsonFeature.graphics,pid:pid,node:node}};
};


/*清除落点*/
Fun.removeSingleLayer = function () {
  if(Fun.removeSingleLayerData === undefined){

  }else {
    if(Fun.removeSingleLayerData.type === 'quanyujiansuo'){
      document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.loadUtil.closeSinglePointJsonResultGrapicLayer(Fun.removeSingleLayerData.data.graphics,Fun.removeSingleLayerData.data.node);
    }
  }
};


/*落图的公共方法*/
Fun.sec.riskType.sub.common=function(obj){
  console.log(12);
  if(obj.subname){
    let mapType = obj.mapType;      //一级菜单
    let name = obj.name;
    let subname = obj.subname;
    let ids = [];
    let dataArr = Fun.xmlArray;
    for (let i = 0;i<Fun.idsingle.length; i++){
      if(Fun.idsingle[i].label !== subname)
        Fun.idsingle[i].checked = false;
      if(Fun.idsingle[i].label === '三小场所' && mapType !=='urban_assi'){
        if(Fun.idsingle[i].pid === 'urban_assi'){
          Fun.loadMap(Fun.idsingle[i].id,false);
        }else{
          Fun.loadMap([Fun.idsingle[i].id],false);
        }
      }else if(Fun.idsingle[i].label === '三小场所' && mapType ==='urban_assi'){
        Fun.loadMap(Fun.idsingle[i].id,false);
      }else{
        Fun.loadMap(Fun.idsingle[i].id,false);
      }
      Fun.idsingle = [];
    }
    for(let i = 0;i< dataArr.topGroupList.length;i++){
      let dataBrr= dataArr.topGroupList[i];
      if(dataBrr.id === mapType){
        for(let j = 0;j<dataBrr.topGroupTwoList.length;j++){

          let dataCrr = dataBrr.topGroupTwoList[j];
          if(dataCrr.label === name){
                let box = dataCrr.loadAttributeMapTwoList;
                for(let k=0;k< box.length;k++){
                  if(box[k].label === subname){

                    Fun.loadMap(box[k].id,!(box[k].checked));
                    dataCrr.loadAttributeMapTwoList[k].checked = !(box[k].checked);
                    if(box[k].checked){
                      Fun.idsingle.push(box[k]);
                      setStore('nodeId',box[k].id);
                    }
                  }
                }

          }
        }
      }
    }
  }else{
    let mapType = obj.mapType;      //一级菜单
    let name = obj.name;
    let ids = [];
    let dataArr = Fun.xmlArray;
    for (let i = 0;i<Fun.idsingle.length; i++){
      if(Fun.idsingle[i].label !== name)
        Fun.idsingle[i].checked = false;
      if(Fun.idsingle[i].label === '三小场所' && mapType !=='urban_assi'){
        if(Fun.idsingle[i].pid === 'urban_assi'){
          Fun.loadMap(Fun.idsingle[i].id,false);
        }else{
          Fun.loadMap([Fun.idsingle[i].id],false);
        }
      }else if(Fun.idsingle[i].label === '三小场所' && mapType ==='urban_assi'){
        Fun.loadMap(Fun.idsingle[i].id,false);
      }else{
        Fun.loadMap(Fun.idsingle[i].id,false);
      }
      Fun.idsingle = [];
    }
    for(let i = 0;i< dataArr.topGroupList.length;i++){
      let dataBrr= dataArr.topGroupList[i];
      if(dataBrr.id === mapType){
        for(let j = 0;j<dataBrr.topGroupTwoList.length;j++){
          let dataCrr = dataBrr.topGroupTwoList[j];
          if(dataCrr.label === name){
            if(name === '三小场所' && mapType !=='urban_assi'){
              ids.push(dataCrr.id);
              Fun.loadMap(ids,!(dataCrr.checked));
              dataBrr.topGroupTwoList[j].checked = !(dataCrr.checked);
              if(dataCrr.checked){
                Fun.idsingle.push(dataCrr);
                setStore('nodeId',ids);
              }
            }else if(name === '三小场所' && mapType !=='urban_assi'){
              ids.push(dataCrr.id);
              Fun.loadMap(ids,!(dataCrr.checked));
              dataBrr.topGroupTwoList[j].checked = !(dataCrr.checked);
              if(dataCrr.checked){
                Fun.idsingle.push(dataCrr);
                setStore('nodeId',ids);
              }
            }else{
              Fun.loadMap(dataCrr.id,!(dataCrr.checked));
              dataBrr.topGroupTwoList[j].checked = !(dataCrr.checked);
              if(dataCrr.checked){
                Fun.idsingle.push(dataCrr);
                setStore('nodeId',dataCrr.id);
              }
            }

          }
        }
      }
    }
  }

};
    Fun.loadMap= function (id,checked) {
      if(document.getElementsByClassName('legend')[0]!== undefined){
        document.getElementsByClassName('legend')[0].style.display = 'none'//移除所有隐患点的图例
      }
      if(document.getElementsByClassName('myDatePicker')[0]!== undefined){
        document.getElementsByClassName('myDatePicker')[0].style.display = 'none'//移除所有隐患点的时间筛选
      }
      document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeAllLayer()
      let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id);
      if(typeof id === 'string'){
        if(checked === true){
          if(node.url === '--'){
            alert(node.label+'暂无数据！');
            return;
          }
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(id);
        }else {
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(id);
        }
      }else{
        if(checked === true){
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadGroupLayerById(id[0]);
        }else {
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.closeGroupLayerById(id[0]);
        }
      }
    }
/*获取点的node和id 用于信息列表*/
Fun.getClickedPid = function(obj , xmlArray){
      let mapType = obj.mapType;      //一级菜单
      let name = obj.name;
      let dataArr = xmlArray;
      if(obj.subname){
        let id,node,a,b,c;
        for(let i = 0;i< dataArr.topGroupList.length;i++){
          a = dataArr.topGroupList[i];
          if(a.id === mapType){
            for(let j = 0;j<a.topGroupTwoList.length;j++){
              b = a.topGroupTwoList[j];
              if(b.label === name){
                let box=a.topGroupTwoList[j];
                for(let k=0;k<box.loadAttributeMapTwoList.length;k++){
                  c = box.loadAttributeMapTwoList[k];
                  if(c.label === obj.subname){
                    id = c.id;
                    node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id);
                    return node;
                  }
                }
              }
            }
          }
        }
      }else{
          let id,node,a,b,c;
          for(let i = 0;i< dataArr.topGroupList.length;i++){
            a =  dataArr.topGroupList[i];
          if(a.id === mapType){
            for(let j = 0;j<a.topGroupTwoList.length;j++){
              b = a.topGroupTwoList[j];
              if(b.label === name){
                id = b.id;
                node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id);
                return node;
              }
            }
          }
        }
      }
    }
Fun.clearNodes=function(){
  console.log(123)
  let node,list,flag;
  for(let i = 0;i< Fun.idsingle.length;i++){
    list = Fun.idsingle[i];
    Fun.loadMap(list.id,!list.checked);
    if(Fun.xmlArray !=={}){
      if(Fun.xmlArray.topGroupList){
        let arr = Fun.xmlArray.topGroupList;
        for(let i=0; i<arr.length;i++){
          if(arr[i].id === list.id){
            if( arr[i].checked ){
              arr[i].checked = !arr[i].checked;
            }
          }else{
            if(arr[i].topGroupTwoList){
              let brr =  arr[i].topGroupTwoList;
              for(let j =0; j<brr.length;j++){
                if(brr[j].id === list.id){
                  brr[j].checked = false;
                }else{
                  if(brr[j].loadAttributeMapTwoList){
                    let crr = brr[j].loadAttributeMapTwoList;
                    for(let k=0;k<crr.length;k++){
                      if(crr[k].id === list.id){
                        crr[k].checked = false;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

    }
  }
  Fun.idsingle =[];
}
Fun.clearPopUps =function(){
  parent.$nuxt.$store.state.ShowChrome='no';  //三色
  parent.$nuxt.$store.state.ShowFenBu='no';   //隐患分布
  parent.$nuxt.$store.state.ShowYinHuan='no';  // 建筑隐患
  parent.$nuxt.$store.state.ShowIotPopup='no';  // 物联网
  parent.$nuxt.$store.state.ShowCity='no';     //城市风险
  parent.$nuxt.$store.state.ShowQiYe='no';     //
  parent.$nuxt.$store.state.ShowEnv='no';     //生态环境的一张图的弹窗
  parent.$nuxt.$store.state.ShowEmergency='no';
  parent.$nuxt.$store.state.ShowThreeS='no';
  document.getElementById("iframeGisMap").contentWindow.mapView.popup.close();   /*弹窗关闭*/
}
Fun.clearLoadPopAndNodes =function(type){

  if(type===0){/*全清除 落点及底部按钮的弹窗*/
    /*删除落点*/
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.closeResultGrapicLayer();  /*消除附近搜索落图*/
    document.getElementById("iframeGisMap").contentWindow.mapView.popup.close();   /*弹窗关闭*/
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.removeSinglePointSearchResultLayer();  /*单点落点消除*/
    parent.$nuxt.$store.state.Resource.clearNearByNodes ='no';   //清除POI的样式
    parent.$nuxt.$store.state.Resource.ShowResource ='off';      //关闭附近资源的选择框
    if(Fun.idsingle!==[]){
      Fun.clearNodes();
      parent.$nuxt.$store.state.ClearBottomClass='yes';
      parent.$nuxt.$store.state.ShowInfoList='no';
    }
    Fun.clearPopUps();
  }else if(type===1){/*不清除落点图层*/
    /*删除落点*/
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.closeResultGrapicLayer();
    document.getElementById("iframeGisMap").contentWindow.mapView.popup.close();
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.removeSinglePointSearchResultLayer()
    parent.$nuxt.$store.state.Resource.clearNearByNodes ='no';
    parent.$nuxt.$store.state.Resource.ShowResource ='off';      //关闭附近资源的选择框
  }else if(type===2){
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.closeResultGrapicLayer();
    document.getElementById("iframeGisMap").contentWindow.mapView.popup.close();
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.removeSinglePointSearchResultLayer();
    parent.$nuxt.$store.state.Resource.clearNearByNodes ='no';
  }else if(type === 3){ //只清除附近搜索落图
    console.log(type)
    //移除所有图层
    document.getElementById('iframeGisMap').contentWindow.module.common.layerControl.mapLayerOperate.removeAllLayer()

    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.closeResultGrapicLayer();  /*消除附近搜索落图*/
    document.getElementById("iframeGisMap").contentWindow.mapView.popup.close();   /*弹窗关闭*/
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.removeSinglePointSearchResultLayer();  /*单点落点消除*/
    if(Fun.idsingle!==[]){
      Fun.clearNodes();
      parent.$nuxt.$store.state.ClearBottomClass='yes';
      parent.$nuxt.$store.state.ShowInfoList='no';
    }
  }else if(type === 4){ //清除搜索的所有东西
    parent.$nuxt.$store.state.Resource.clearNearByNodes ='no';   //清除POI的样式
    if(Fun.idsingle!==[]){
      Fun.clearNodes();
      parent.$nuxt.$store.state.ClearBottomClass='yes';
      parent.$nuxt.$store.state.ShowInfoList='no';
    }
  }

}

Fun.loadSingleNode=function(layerid,id){
  Fun.clearLoadPopAndNodes(1);
  /*单点落图*/
  document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.loadSinglePointJsonLayerBySearch(layerid,id);
}

Fun.centerTheMap=function(jd,wd){
  document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewCenter(jd,wd);
}
/**
 *xml对象转json对象
 **/
/*//xml转json
function xmlToJson(nodes) {
  let itemList = new Array();
  $.each(nodes, function () {
    let entity = {};
    let obj = $(this);
    entity.label = obj[0].getAttribute("label");
    entity.id = obj[0].getAttribute("id");
    entity.name = obj[0].getAttribute("name");
    if (obj[0].hasChildNodes()) {
      entity.nodes = xmlToJson(obj.children());
    }
    else {
      entity.pid = obj[0].getAttribute("pid");
      entity.type = obj[0].getAttribute("type");
      entity.show = obj[0].getAttribute("show");
      entity.bm = obj[0].getAttribute("bm");
      entity.function = obj[0].getAttribute("function");
      entity.url = obj[0].getAttribute("url");
      entity.query = obj[0].getAttribute("query");
      entity.icon = obj[0].getAttribute("icon");
    }
    itemList.push(entity);
  });
  return itemList;
}*/

export {Fun}

Fun.LocalArray=[];
export const toGetXmlData = (obj,win, status) => {   //落点弹窗  根据

  return Fun.LocalArray.length !==0 ? (function(){ return Fun.LocalArray; })() : app.$myAxios.myGet(Fun.url).then(function (response) {
        /*let xmldata =  Fun.String2XML(win,response.data);
        $(xmldata).find("Map").each(function () {
          response.data =  Fun.xmlToJson($(this).children());
        });*/
        Fun.LocalArray = response;
        return response;
  });
};


