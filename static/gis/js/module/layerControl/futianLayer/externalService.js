/**
 * Created by Administrator on 2018/3/14.
 */
/**
 *福田基础图层加载
 */
//UMD代码
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.module = ( root.module) ? root.module : {};
        root.module.layerControl = ( root.module.layerControl) ? root.module.layerControl : {};
        root.module.layerControl.futianLayer = ( root.module.layerControl.futianLayer) ? root.module.layerControl.futianLayer : {};

        root.module.layerControl.futianLayer.externalService = factory();
    }
}(this, function () {

    /**
     *维稳系统单点图层
     */
    var layer_externalservice_weiwen_samplepoint = function layer_externalservice_weiwen_samplepoint(node,data) {
      var FeatureLayer = window.require('esri/layers/FeatureLayer');

      //console.log(response);
      //var data = response.data;

      var esriFeatureJson = module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");


      //符号化渲染
      var renderer = {};

      if (node.icon) {
        renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: node.icon,
            width: (node.iconsize) ? node.iconsize.split(",")[0] : "26" + "px",
            height: (node.iconsize) ? node.iconsize.split(",")[1] : "36" + "px"
          }
        };
      }
      if (node.iconArray) {
        var iconArray = node.iconArray.split(",");

        renderer = {
          type: "unique-value",
          field: "icontype",
          defaultSymbol: {
            type: "picture-marker",
            url: iconArray[0],
            width: (node.iconsize) ? node.iconsize.split(",")[0] : "26" + "px",
            height: (node.iconsize) ? node.iconsize.split(",")[1] : "36" + "px"
          },
          uniqueValueInfos: []
        };


        if (iconArray.length > 0) {

          for (var i = 0; i < iconArray.length; i++) {
            var uniqueSymbol = {
              value: i,
              symbol: {
                type: "picture-marker",
                url: iconArray[i],
                width: (node.iconsize) ? node.iconsize.split(",")[0] : "26" + "px",
                height: (node.iconsize) ? node.iconsize.split(",")[1] : "36" + "px"
              }
            };

            renderer.uniqueValueInfos.push(uniqueSymbol)
          }
        }
      }


     /* var clearResultsThisAction = {
        title: "清除",
        id: "tool_clearQueryResults",
        image: "img/layerControl/popup/search.png"
      };*/

     /* var popupTemplate = {
        title: node.label,
        content: setContentInfoFunc,
        actions: [clearResultsThisAction]
      };*/

      var layer = window.map.findLayerById(node.id);
      //初次加载
      if (layer == null) {
        var featureLayer = new FeatureLayer({
          id: node.id,
          title: node.label,
          source: esriFeatureJson.graphics, // autocast as an array of esri/Graphic
          fields: esriFeatureJson.fields, // This is required when creating a layer from Graphics
          objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
         /* spatialReference: {
            wkid: window.mapView.spatialReference
          },*/
          //geometryType: "point",// Must be set when creating a layer from Graphics
          minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
          maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom)
        });

        featureLayer.renderer = renderer;
        //featureLayer.popupTemplate = popupTemplate;

        window.map.add(featureLayer);

      }
      else {
        layer.visible = true;
      }
      console.log(node.label + "图层加载完成");

    }

    var setContentInfo_layer_externalservice_weiwen_samplepoint = function setContentInfo_layer_externalservice_weiwen_samplepoint(feature) {
        //console.log(feature);
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id);

        //坐标点
        var pointLocal = {};
        if (MapConfig.mapInitParams.spatialReference.wkid === 4490) {
            pointLocal.x = feature.graphic.geometry.x;
            pointLocal.y = feature.graphic.geometry.y;
        }
        else {
            pointLocal.x = feature.graphic.geometry.longitude;
            pointLocal.y = feature.graphic.geometry.latitude;
        }

        var htmlUrlParams = "?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id + "&longitude=" + pointLocal.x + "&latitude=" + pointLocal.y;

        var html = "<div style='width: 260px;height: 293px;overflow: hidden;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/futian/futianBaseTestInfoWindow.html" + htmlUrlParams + "'  style='width:100%;height:100%;border: 1px solid #196db4;background-color: #032335;' scrolling='no'></iframe>" +
            "</div>";

        return html;
    }



    return {
      layer_externalservice_weiwen_samplepoint: layer_externalservice_weiwen_samplepoint
    }
}));
