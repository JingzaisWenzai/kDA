import { getParams } from '../utils/validate'
import Vue from 'vue'
let app = new Vue()

function checkParams(params) {
  if(params.type === undefined){
    app.$element.Notification({
      title: '提示',
      message:"来源不能为空",
      type: 'warning'
    });
    return {}
  }

  if(params.id === undefined){
    app.$element.Notification({
      title: '提示',
      message:"图层id不能为空",
      type: 'warning'
    });
    return {}
  }else {
    return {
      jd:params.lon,
      wd:params.lat,
      layerid:params.id,
      nodeid:''
    }
  }
}

function getMyParams() {
  let params = getParams()

  console.log(params)

  let lonAndLat = document.getElementById("iframeGisMap").contentWindow.MapConfig.mapInitParams.extent

  if(params.lon === undefined){
    return {}
  }else {
    if(params.lon>=lonAndLat.xmin && params.lon<=lonAndLat.xmax){
    }else {
      app.$element.Notification({
        title: '提示',
        message:"经度不正确或者经度不在深圳范围内",
        type: 'warning'
      });
      return {}
    }
  }

  if(params.lat === undefined){
    return {}
  }else {
    if(params.lat>=lonAndLat.ymin && params.lat<=lonAndLat.ymax){
      return checkParams(params)
    }else {
      app.$element.Notification({
        title: '提示',
        message:"纬度不正确或者纬度不在深圳范围内",
        type: 'warning'
      });
      return {}
    }
  }
}

export function sendCircleSearchInfoFromeWeiWen(vue,tableName){
  try {
    let lonAndLat = document.getElementById("iframeGisMap").contentWindow.MapConfig.mapInitParams.extent
    let params = getMyParams()

    if(params.hasOwnProperty('layerid') === false){
      return
    }

    let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(params.layerid);
    if(node === null&&params.layerid!== undefined){
      app.$element.Notification({
        title: '提示',
        message:"图层名称错误，请检查所传的图层名称："+params.layerid+'是否正确！',
        type: 'warning'
      });
      return
    }else {
      let data=[{"jd":params.jd,"wd":params.wd}];
      console.log(data)

      try {
        document.getElementById("iframeGisMap").contentWindow.module.layerControl.futianLayer.externalService.layer_externalservice_weiwen_samplepoint(node,data)
        if(params.jd !== undefined){
          vue.$store.state.Resource.searchCenter.wd = params.wd;
          vue.$store.state.Resource.searchCenter.jd = params.jd;
          vue.$store.state.Resource.searchCenter.nodeid = node.pid;
          vue.$store.state.Resource.searchCenter.layerid = params.layerid;
          vue.$store.state.Resource.searchCenter.tableName = tableName;
          vue.$store.state.Resource.ShowResource = 'on';
          vue.$store.state.Resource.ShowSearchWithoutResource = 'off';
        }
      }
      catch(err){
        setTimeout(function() {
          sendCircleSearchInfoFromeWeiWen(vue,tableName)
        },1000)
      }
    }
  }
  catch(err){
    setTimeout(function() {
      sendCircleSearchInfoFromeWeiWen(vue,tableName)
    },1000)
  }
}

export function removeWeiWenLayer() {
  let params = getParams()
  if(params.id !== undefined){
    document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(params.id);
  }
}

/**
 * 地图移除单个图层并关掉落点弹框
 */
export function removeSingleLayer(layId) {
  document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(layId);
  document.getElementById("iframeGisMap").contentWindow.mapView.popup.close()
}
