(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.module = (root.module) ? root.module : {}
    root.module.layerControl = (root.module.layerControl) ? root.module.layerControl : {}
    root.module.layerControl.futianLayer = (root.module.layerControl.futianLayer) ? root.module.layerControl.futianLayer : {}

    root.module.layerControl.futianLayer.dataVisual = factory()
  }
}(this, function() {

  /****************************************************************人口基本面**************************************************************/
  /**
   *可视化--街道人口密度
   */
  var layer_futian_dataVisual_populationdensity_street = function layer_futian_dataVisual_populationdensity_street(node) {
    loadCommonStreetLayer(node, setContentInfo_layer_futian_dataVisual_populationdensity_street)
  }

  var setContentInfo_layer_futian_dataVisual_populationdensity_street = function setContentInfo_layer_futian_dataVisual_populationdensity_street(feature) {
    console.log(feature)

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.JDCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 215px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /**
   *可视化--社区人口密度
   */
  var layer_futian_dataVisual_populationdensity_community = function layer_futian_dataVisual_populationdensity_community(node) {
    loadCommonCommunityLayer(node,setContentInfo_layer_futian_dataVisual_populationdensity_community)
  }

  var setContentInfo_layer_futian_dataVisual_populationdensity_community = function setContentInfo_layer_futian_dataVisual_populationdensity_community(feature) {
    //console.log(feature);

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.SQCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 215px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }
  /****************************************************************法人基本面**************************************************************/

  var layer_futian_dataVisual_company_heat = function layer_futian_dataVisual_company_heat(node) {
    var FeatureLayer = window.require('esri/layers/FeatureLayer')
    var MapImageLayer = window.require('esri/layers/MapImageLayer')

    var layer = null//window.map.findLayerById(node.id);
    //初次加载
    if (layer == null) {

      /*var popupTemplate = {
        title: node.label,
        content: setContentInfo_layer_futian_dataVisual_populationdensity_community
      };*/

      //街道区域渲染
      /*if(parent.$nuxt.$store.state.addressStreet){
        if(parent.$nuxt.$store.state.addressStreet=="福田区"){
          node.query="";
        }
        else {
          node.query="JDNAME='"+parent.$nuxt.$store.state.addressStreet.replace("街道","")+"'";
        }
      }*/

      var featureLayer = new MapImageLayer({
        id: 'asdfasd', //node.id,
        url: 'http://10.190.55.65:6080/arcgis/rest/services//FuTian/BLK_LEGAL_PERSON/MapServer',//node.gisUrl,
        title: 'afsds',//node.label,
        //renderer: renderer,
        //minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
        //maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
        //definitionExpression: node.query,
        //outFields: ["*"]
        sublayers: [
          {
            id: 1
            //renderer: renderer,
            // popupTemplate: popupTemplate,
            // definitionExpression: node.query
          }
        ]
      })

      //featureLayer.popupTemplate = popupTemplate;

      window.map.add(featureLayer)
    }
    else { //图层隐藏->显示
      layer.visible = true
    }
    //console.log(node.label + "图层加载完成");
  }

  var layer_futian_dataVisual_company_point = function layer_futian_dataVisual_company_point(node) {
    var FeatureLayer = window.require('esri/layers/FeatureLayer')
    var MapImageLayer = window.require('esri/layers/MapImageLayer')

    var layer = null//window.map.findLayerById(node.id);

    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',  // autocasts as new SimpleMarkerSymbol()
        style: 'square',
        color: [89, 79, 33, 0.8],
        size: '2px',  // pixels
        outline: null
      }
    }

    //初次加载
    if (layer == null) {

      /*var popupTemplate = {
        title: node.label,
        content: setContentInfo_layer_futian_dataVisual_populationdensity_community
      };*/

      //街道区域渲染
      /*if(parent.$nuxt.$store.state.addressStreet){
        if(parent.$nuxt.$store.state.addressStreet=="福田区"){
          node.query="";
        }
        else {
          node.query="JDNAME='"+parent.$nuxt.$store.state.addressStreet.replace("街道","")+"'";
        }
      }*/

      var featureLayer = new FeatureLayer({
        id: 'asdfasd', //node.id,
        url: 'http://10.190.55.65:6080/arcgis/rest/services//FuTian/BLK_LEGAL_PERSON/MapServer/0',//node.gisUrl,
        title: 'afsds',//node.label,
        renderer: renderer,
        //minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
        //maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
        //definitionExpression: node.query,
        outFields: ['*']
      })

      //featureLayer.popupTemplate = popupTemplate;

      window.map.add(featureLayer)
    }
    else { //图层隐藏->显示
      layer.visible = true
    }
    //console.log(node.label + "图层加载完成");
  }


  /**
   *可视化--街道法人
   */
  var layer_futian_dataVisual_company_street = function layer_futian_dataVisual_company_street(node) {
    loadCommonStreetLayer(node,setContentInfo_layer_futian_dataVisual_company_street)
  }

  var setContentInfo_layer_futian_dataVisual_company_street = function setContentInfo_layer_futian_dataVisual_company_street(feature) {
    //console.log(feature);

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.JDCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 215px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /**
   *可视化--社区法人
   */
  var layer_futian_dataVisual_company_community = function layer_futian_dataVisual_company_community(node) {
    loadCommonCommunityLayer(node,setContentInfo_layer_futian_dataVisual_company_community)
  }

  var setContentInfo_layer_futian_dataVisual_company_community = function setContentInfo_layer_futian_dataVisual_company_community(feature) {
    //console.log(feature);

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.SQCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 185px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /****************************************************************楼栋基本面**************************************************************/
  /**
   *可视化--楼栋-街道
   */
  var layer_futian_dataVisual_build_street = function layer_futian_dataVisual_build_street(node) {
    loadCommonStreetLayer(node,setContentInfo_layer_futian_dataVisual_build_street)

  }

  var setContentInfo_layer_futian_dataVisual_build_street = function setContentInfo_layer_futian_dataVisual_build_street(feature) {
    console.log(feature)

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.JDCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 215px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /**
   *可视化--楼栋-社区
   */
  var layer_futian_dataVisual_build_community = function layer_futian_dataVisual_build_community(node) {
    loadCommonCommunityLayer(node,setContentInfo_layer_futian_dataVisual_build_community)
  }

  var setContentInfo_layer_futian_dataVisual_build_community = function setContentInfo_layer_futian_dataVisual_build_community(feature) {
    //console.log(feature);

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.SQCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 185px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }


  /****************************************************************房屋基本面**************************************************************/
  /**
   *可视化--房屋-街道
   */
  var layer_futian_dataVisual_house_street = function layer_futian_dataVisual_house_street(node) {
    loadCommonStreetLayer(node,setContentInfo_layer_futian_dataVisual_house_street)

  }

  var setContentInfo_layer_futian_dataVisual_house_street = function setContentInfo_layer_futian_dataVisual_house_street(feature) {
    console.log(feature)

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.JDCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 215px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /**
   *可视化--房屋-社区
   */
  var layer_futian_dataVisual_house_community = function layer_futian_dataVisual_house_community(node) {
    loadCommonCommunityLayer(node,setContentInfo_layer_futian_dataVisual_house_community)
  }

  var setContentInfo_layer_futian_dataVisual_house_community = function setContentInfo_layer_futian_dataVisual_house_community(feature) {
    //console.log(feature);

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.SQCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 185px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /****************************************************************城市部件基本面**************************************************************/
  /**
   *可视化--部件-街道
   */
  var layer_futian_dataVisual_component_street = function layer_futian_dataVisual_component_street(node) {
    loadCommonStreetLayer(node,setContentInfo_layer_futian_dataVisual_component_street)
  }

  var setContentInfo_layer_futian_dataVisual_component_street = function setContentInfo_layer_futian_dataVisual_component_street(feature) {
    console.log(feature)

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.JDCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 215px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /**
   *可视化--部件-社区
   */
  var layer_futian_dataVisual_component_community = function layer_futian_dataVisual_component_community(node) {
    loadCommonCommunityLayer(node,setContentInfo_layer_futian_dataVisual_component_community)
  }

  var setContentInfo_layer_futian_dataVisual_component_community = function setContentInfo_layer_futian_dataVisual_component_community(feature) {
    //console.log(feature);

    var nodeId = (feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
      pointLocal.x = feature.graphic.geometry.x
      pointLocal.y = feature.graphic.geometry.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.longitude
      pointLocal.y = feature.graphic.geometry.latitude
    }

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.SQCODE + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 185px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBaseCitySignsInfoWindow.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }


  /**
   *街道图层加载模块
   */
  var loadCommonStreetLayer = function loadStreetLayer(node, setContentInfoFunc) {
    var FeatureLayer = window.require('esri/layers/FeatureLayer')

    var layer = window.map.findLayerById(node.id)
    //初次加载
    if (layer == null) {

      var renderer = {
        type: 'unique-value',  // autocasts as new UniqueValueRenderer()
        field: 'JDCODE',
        defaultSymbol: {
          type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
          color: [0, 194, 18, 1],
          outline: {
            width: 0
          }
        },
        uniqueValueInfos: []
      }

      $.ajax({
        headers: {
          token: module.common.layerControl.mapNet.getCookieByName('Admin-Token')
        },
        url: node.url + '/selectByExample',
        type: 'GET',
        // data: options.query,
        dataType: 'json', //指定服务器返回的数据类型
        async: true,
        success: function(data) {
          console.log(data)
          module.common.layerControl.mapNet.checkLogin(data)//token登录校验
          //遍历字段
          for (var i = 0; i < data.data.length; i++) {
            var item = data.data[i]

            var uniqueSymbol = {
              value: item.id,
              symbol: {
                type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
                color: item.color.split(','),
                outline: {
                  color: item.color.split(','),
                  //style: "dot",
                  width: 1
                }
              }
            }
            renderer.uniqueValueInfos.push(uniqueSymbol)
          }

          //图层加载
          var popupTemplate = {
            title: node.label,
            content: setContentInfoFunc
          }

          var featureLayer = new FeatureLayer({
            id: node.id,
            url: node.gisUrl,
            title: node.label,
            renderer: renderer,
            minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
            maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
            outFields: ['*']
          })

          featureLayer.popupTemplate = popupTemplate
          //featureLayer.renderer = renderer;

          window.map.add(featureLayer)

          console.log(node.label + '图层加载完成')
        },
        error: function(error) {
          console.log(node.id + '数据请求错误，', error.message)
        }
      })
    }
    else { //图层隐藏->显示
      layer.visible = true
    }
  }

  var loadCommonCommunityLayer = function loadCommunityLayer(node, setContentInfoFunc) {
    var FeatureLayer = window.require('esri/layers/FeatureLayer')

    var layer = window.map.findLayerById(node.id)
    //初次加载
    if (layer == null) {

      var renderer = {
        type: 'unique-value',  // autocasts as new UniqueValueRenderer()
        field: 'SQCODE',
        defaultSymbol: {
          type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
          color: [0, 194, 18, 1],
          outline: {
            width: 0
          }
        },
        uniqueValueInfos: []
      }

      console.log(1111)
      console.log(node.query)

      //街道区域渲染
      var querySql = ''
      if (parent.$nuxt.$store.state.addressStreet) {
        console.log(parent.$nuxt.$store.state.addressStreet)
        if (parent.$nuxt.$store.state.addressStreet == '福田区') {
          //node.query="";
          querySql = ''
        }
        else {
          //node.query="street="+ parent.$nuxt.$store.state.addressStreet+"&"+node.query;
          querySql = 'JDNAME=\'' + parent.$nuxt.$store.state.addressStreet.replace('街道', '') + '\''
        }
      }

      $.ajax({
        headers: {
          token: module.common.layerControl.mapNet.getCookieByName('Admin-Token')
        },
        url: node.url + '/selectByExample?' + node.query,
        type: 'GET',
        // data: options.query,
        dataType: 'json', //指定服务器返回的数据类型
        async: true,
        success: function(data) {
          console.log(data)
          module.common.layerControl.mapNet.checkLogin(data)//token登录校验
          //遍历字段
          for (var i = 0; i < data.data.length; i++) {
            var item = data.data[i]

            var uniqueSymbol = {
              value: item.id,
              symbol: {
                type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
                color: item.color.split(','),
                outline: {
                  color: item.color.split(','),
                  width: 1
                }
              }
            }
            renderer.uniqueValueInfos.push(uniqueSymbol)
          }

          //图层加载
          var popupTemplate = {
            title: node.label,
            content: setContentInfoFunc
          }

          var featureLayer = new FeatureLayer({
            id: node.id,
            url: node.gisUrl,
            title: node.label,
            minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
            maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
            definitionExpression: querySql,
            outFields: ['*']
          })

          featureLayer.popupTemplate = popupTemplate
          featureLayer.renderer = renderer

          window.map.add(featureLayer)

          console.log(node.label + '图层加载完成')
        },
        error: function(error) {
          console.log(node.id + '数据请求错误，', error.message)
        }
      })


    }
    else { //图层隐藏->显示
      layer.visible = true
    }
  }


  return {
    layer_futian_dataVisual_populationdensity_street: layer_futian_dataVisual_populationdensity_street,
    layer_futian_dataVisual_populationdensity_community: layer_futian_dataVisual_populationdensity_community,
    //layer_futian_dataVisual_company_heat:layer_futian_dataVisual_company_heat,
    //layer_futian_dataVisual_company_point:layer_futian_dataVisual_company_point,
    layer_futian_dataVisual_company_street: layer_futian_dataVisual_company_street,
    layer_futian_dataVisual_company_community: layer_futian_dataVisual_company_community,
    layer_futian_dataVisual_build_street: layer_futian_dataVisual_build_street,
    layer_futian_dataVisual_build_community: layer_futian_dataVisual_build_community,
    layer_futian_dataVisual_house_street: layer_futian_dataVisual_house_street,
    layer_futian_dataVisual_house_community: layer_futian_dataVisual_house_community,
    layer_futian_dataVisual_component_street: layer_futian_dataVisual_component_street,
    layer_futian_dataVisual_component_community: layer_futian_dataVisual_component_community

  }
}))
