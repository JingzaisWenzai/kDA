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
    root.module.layerControl.basegeoLayer = (root.module.layerControl.basegeoLayer) ? root.module.layerControl.basegeoLayer : {}

    root.module.layerControl.basegeoLayer.featureMapFutian = factory()
  }
}(this, function() {
//定义一些常量
  var layer_basegeo_featureMapFutian_building = function layer_basegeo_featureMapFutian_building(node) {
    var FeatureLayer = window.require('esri/layers/FeatureLayer')
    var TileLayer = window.require('esri/layers/TileLayer')
    var MapImageLayer = window.require('esri/layers/MapImageLayer')
    var Polygon = window.require('esri/geometry/Polygon')
    var Graphic = window.require('esri/Graphic')
    var GraphicsLayer = window.require('esri/layers/GraphicsLayer')


    //console.log(1234);
    var layer = window.map.findLayerById(node.id)

    console.log(node.id)
    console.log(layer)
    if (layer == null) {
      var renderer = {
        type: 'unique-value',  // autocasts as new UniqueValueRenderer()
        field: 'BLDG_NO',
        defaultSymbol: {
          type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
          color: [254, 254, 0, 1],//[0, 194, 18, 1],
          outline: {
            width: 0
          }
        },
        uniqueValueInfos: []
      }

      /*var nodeRisk = module.common.layerControl.mapLayerXml.getLayerNodeById("layer_basegeo_featureMapFutian_building_risklevel");
      var getBuildingRiskUrl = nodeRisk.url;*/

      $.ajax({
        headers: {
          token: module.common.layerControl.mapNet.getCookieByName('Admin-Token')
        },
        url: node.url,
        type: 'GET',
        // data: options.query,
        dataType: 'json', //指定服务器返回的数据类型
        async: false,
        success: function(data) {
          //  console.log(data);
          module.common.layerControl.mapNet.checkLogin(data)//token登录校验
          //遍历字段
          for (var i = 0; i < data.length; i++) {
            var item = data[i]

            if (item.level == 3) {
              continue
            }

            //隐患等级<-->颜色
            var color = []
            switch (item.level) {
              case  1:
                //console.log(item.level)
                color = [0, 194, 18, 1]
                break
              case  2:
                color = [0, 162, 254, 1]
                break
              /*case  3:
                color = [254, 254, 0, 1]
                break;*/
              case  4:
                color = [254, 162, 0, 1]
                break
              case  5:
                color = [254, 0, 0, 1]
                break
              default:
                break
            }

            var uniqueSymbol = {
              value: item.BLDG_NO,
              symbol: {
                type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
                color: color,
                outline: {
                  width: 0
                }
              }
            }

            //    console.log(uniqueSymbol);

            renderer.uniqueValueInfos.push(uniqueSymbol)
          }
        },
        error: function(error) {
          console.log(node.id + '建筑隐患数据请求错误，', error.message)
        }
      })

      var popupTemplate = {
        title: node.label,
        outFields: ['*'],//sdk 4.10 兼容
        content: setContentInfo_layer_basegeo_featureMapFutian_building
        // actions: [clearResultsThisAction]
      }

      //街道区域渲染
      if (parent.$nuxt.$store.state.addressStreet) {
        console.log(parent.$nuxt.$store.state.addressStreet)
        if (parent.$nuxt.$store.state.addressStreet == '福田区') {
          node.query = ''
        }
        else {
          node.query = 'JDNAME=\'' + parent.$nuxt.$store.state.addressStreet.replace('街道', '') + '\''
        }
      }

      /*var graphics = []
      var fields = [
        {
          name: 'OBJECTID',
          alias: 'OBJECTID',
          type: 'oid'
        },
        {
          name: 'BLDG_NO',
          alias: 'BLDG_NO',
          type: 'string'
        }
      ]
$.ajax({
        headers: {
          token: module.common.layerControl.mapNet.getCookieByName('Admin-Token')
        },
        url: '/web/gis/data/layerControl/futianLayer/building.json',
        type: 'GET',
        // data: options.query,
        dataType: 'json', //指定服务器返回的数据类型
        async: false,
        success: function(response) {
          console.log(response)

          var features = response.RecordSet.features

          var graphicsLayer = new GraphicsLayer({ id: 'buildingGraphicsLayer', title: '建筑图层' })
          window.map.add(graphicsLayer)

          for (var i = 0; i < features.length; i++) {
            var polygon = Polygon(features[i].geometry)

            graphics.push({
              geometry: polygon,
              attributes: features[i].attributes
            })
          }
        },
        error: function(error) {
          console.log(node.id + '数据请求错误，', error.message)
        }
      })*/


      /*var layer = new FeatureLayer({
        id: node.id,
        title: node.label,
        source: graphics,
        fields: fields,
        objectIdField: 'OBJECTID',
        geometryType: 'polygon'//sdk 4.6 兼容

      })*/
      //layer.popupTemplate = popupTemplate
      //layer.renderer = renderer
      /*layer.renderer = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [227, 139, 79, 0.5],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 0
          }
        }
      };*/


      var layer = new MapImageLayer({
        url: node.gisUrl,
        id: node.id,
        title: node.label,
        sublayers: [
          {
            id: 1,
            renderer: renderer,
            popupTemplate: popupTemplate,
            definitionExpression: node.query
          }
        ]
      });

      /*var layer = new FeatureLayer({
              url: node.gisUrl+"/1",
              id: node.id,
              title: node.label,
              renderer: renderer,
              popupTemplate: popupTemplate,
              definitionExpression: node.query

            });*/

      //window.map.add(tileLayer);
      window.map.add(layer, 2);
    }
    else {
      layer.visible = true
    }
    console.log(node.label + '图层加载完成')
  }

  var setContentInfo_layer_basegeo_featureMapFutian_building = function setContentInfo_layer_basegeo_featureMapFutian_building(feature) {
    var Graphic = window.require('esri/Graphic')

    console.log(feature)
    var node = module.common.layerControl.mapLayerXml.getLayerNodeById('layer_basegeo_featureMapFutian_building')//feature.graphic.layer.id);
    //console.log(node);

    //高亮选择
    var graphic = feature.graphic
    // remove all graphics to make sure no selected graphics
    window.mapView.graphics.removeAll()

    // create a new selected graphic
    var selectedGraphic = new Graphic({
      geometry: graphic.geometry,
      symbol: {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        outline: { // autocasts as new SimpleLineSymbol()
          color: [52, 243, 238],
          width: 2
        }
      }
    })

    window.mapView.graphics.add(selectedGraphic)

    //清除
    mapView.popup.watch('visible', function(newValue) {
      if (!newValue) {
        mapView.graphics.removeAll()
      }
    })

    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid == 4490) {
      pointLocal.x = feature.graphic.geometry.centroid.x
      pointLocal.y = feature.graphic.geometry.centroid.y
    }
    else {
      pointLocal.x = feature.graphic.geometry.centroid.longitude
      pointLocal.y = feature.graphic.geometry.centroid.latitude
    }

    //var htmlUrl = "../gis/js/module/layerInfoWindow/futian/futianBuildingRiskInfoWindow-backup.html?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id;

    //console.log(pointLocal);

    var html = '<div style=\'width: 340px;height: 470px;overflow: hidden;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianBuildingRiskInfoWindow.html?nodeId=' + node.id + '&featureId=' + feature.graphic.attributes.BLDG_NO + '\'  style=\'width:100%;height:100%; auto;border:none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }


  /**
   *加载要素面并高亮
   */
  var loadHighLightFeatureLayerPolygon = function loadHighLightFeatureLayerPolygon(nodeId, field, value) {
    var GraphicsLayer = window.require('esri/layers/GraphicsLayer')
    var Graphic = window.require('esri/Graphic')
    var Polygon = window.require('esri/geometry/Polygon')

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId)

    var graphicsLayer = window.map.findLayerById('highLightFeatureLayerPolygonGraphicsLayer')

    if (!graphicsLayer) {
      graphicsLayer = new GraphicsLayer({ id: 'highLightFeatureLayerPolygonGraphicsLayer', title: '周边查询结果' })

      //要素面查询
      var sql = field + '=' + value
      console.log(sql)
      module.layerQuery.featureAttributeQuery.queryFeatureLayerBySql(node, sql, function(features) {
        if (features) {
          console.log(sql)
          console.log(features)


          var graphic = new Graphic()

          var polygon = new Polygon({
            hasZ: true,
            hasM: true,
            rings: features[0].geometry.rings,
            spatialReference: { wkid: MapConfig.currentWkid }
          })
          graphic.geometry = polygon

          graphic.symbol = {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: [227, 139, 79, 0],
            outline: { // autocasts as new SimpleLineSymbol()
              color: [52, 243, 238],
              width: 2
            }
          }

          //     console.log(graphic);

          graphicsLayer.add(graphic)

          window.map.add(graphicsLayer)
        }
      })
    }
  }
  /**
   *清除要素面
   */
  var clearHighLightFeatureLayerPolygon = function clearHighLightFeatureLayerPolygon() {
    var graphicsLayer = window.map.findLayerById('highLightFeatureLayerPolygonGraphicsLayer')

    if (graphicsLayer) {
      graphicsLayer.removeAll()
    }
  }

  /**
   *mapView打开简单弹框
   */
  var mapViewOpenSamplePopup = function mapViewOpenSamplePopup(graphic) {
    var Point = window.require('esri/geometry/Point')
    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid == 4490) {
      pointLocal.x = graphic.geometry.x
      pointLocal.y = graphic.geometry.y
    }
    else {
      pointLocal.x = graphic.geometry.longitude
      pointLocal.y = graphic.geometry.latitude
    }

    var location = new Point({
      x: pointLocal.x,
      y: pointLocal.y,
      spatialReference: MapConfig.mapInitParams.spatialReference.wkid
    })

    mapView.popup.open({
      title: 'xxxx',
      location: location,
      content: mapViewOpenSamplePopupSetContent(graphic)
    })
  }

  /**
   *mapView打开简单弹框
   */
  var mapViewOpenSamplePopupSetContent = function mapViewOpenSamplePopupSetContent(graphic) {//layerId, featureId

    console.log(graphic.attributes.id)
    //return "aaa";

    var nodeId = (graphic.layer.id).replace(/_CircleSearchResultLayer/, '')//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, '')//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId)

    //坐标点
    var pointLocal = {}
    if (MapConfig.mapInitParams.spatialReference.wkid == 4490) {
      pointLocal.x = graphic.geometry.x
      pointLocal.y = graphic.geometry.y
    }
    else {
      pointLocal.x = graphic.geometry.longitude
      pointLocal.y = graphic.geometry.latitude
    }

    //var htmlUrl = "../gis/js/module/layerInfoWindow/base/basePopupTemplate.html?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id;

    var htmlUrlParams = '?nodeId=' + node.id + '&featureId=' + graphic.attributes.id + '&longitude=' + pointLocal.x + '&latitude=' + pointLocal.y

    var html = '<div class=\'popView\' style=\'width: 260px;height: 293px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;\'>' +
      '<iframe src=\'../gis/js/module/layerInfoWindow/futian/futianSamplePopupTemplate.html' + htmlUrlParams + '\'  style=\'width:100%;height:100%; border: none;\' scrolling=\'no\'></iframe>' +
      '</div>'

    return html
  }

  /**
   *打开图层弹框
   */
  var openFeatureLayerPopup = function openFeatureLayerPopup(layerId, featureId) {
    var layer = window.map.findLayerById(layerId)

    if (layer) {
      var graphic

      for (var i = 0; i < layer.source.items.length; i++) {
        if (layer.source.items[i].attributes.id == featureId) {
          graphic = layer.source.items[i]
        }
      }

      //console.log(graphic)
      window.mapView.popup.open({
        features: [graphic],
        updateLocationEnabled: true
      })
    }
  }

  return {
    layer_basegeo_featureMapFutian_building: layer_basegeo_featureMapFutian_building,
    loadHighLightFeatureLayerPolygon: loadHighLightFeatureLayerPolygon,
    clearHighLightFeatureLayerPolygon: clearHighLightFeatureLayerPolygon,
    mapViewOpenSamplePopup: mapViewOpenSamplePopup,
    openFeatureLayerPopup: openFeatureLayerPopup
  }
}))
