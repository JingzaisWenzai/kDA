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

        root.module.layerControl.futianLayer.base = factory();
    }
}(this, function () {

  /**
     *福田--测试图层1 加载
     */
    var layer_futian_base_test = function layer_futian_base_test(node) {
        module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_futian_base_test);
    }

    var setContentInfo_layer_futian_base_test = function setContentInfo_layer_futian_base_test(feature) {
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

    /**
     *福田--烟雾传感器图层
     */
    var layer_futian_base_iot = function layer_futian_base_iot(node) {
        module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_futian_base_iot);
    }

    var setContentInfo_layer_futian_base_iot = function setContentInfo_layer_futian_base_iot(feature) {
        //console.log(feature);
        var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
        nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId);

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

        var html = "<div class='popView' style='width: 260px;height: 293px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/futian/futianBaseIotInfoWindow.html" + htmlUrlParams + "'  style='width:100%;height:100%;border: none;' scrolling='no'></iframe>" +
            "</div>";

        return html;
    }


    /**
     *福田--公安视频图层
     */
    var layer_futian_base_iot_policevideo = function layer_futian_base_iot_policevideo(node) {
        module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_futian_base_iot_policevideo);
    }

    var setContentInfo_layer_futian_base_iot_policevideo = function setContentInfo_layer_futian_base_iot_policevideo(feature) {
        //console.log(feature);
        var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
        nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId);

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

        var html = "<div style='width: 560px;height: 615px;overflow: hidden;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/futian/futianBaseIotPoliceVideoInfoWindow.html" + htmlUrlParams + "'  style='width:100%;height:100%;border: 1px solid #196db4;background-color: #032335;' scrolling='no'></iframe>" +
            "</div>";

        return html;
    }
    /**
     *福田--城区风险图层
     */
    var layer_futian_base_cityrrisk = function layer_futian_base_cityrrisk(node) {
        module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_futian_base_cityrisk);
    }

    var setContentInfo_layer_futian_base_cityrisk = function setContentInfo_layer_futian_base_cityrisk(feature) {
        console.log(feature);
        var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
        nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId);

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

        var html = "<div class='popView' style='width: 260px;height: 293px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/futian/futianBaseCityRiskInfoWindow.html" + htmlUrlParams + "'  style='width:100%;height:100%;border: none;' scrolling='no'></iframe>" +
            "</div>";

        return html;
    }

    /*生态环境一张图*/
  /**
   *福田--水质
   */
  var layer_futian_base_iot_electricfire = function layer_futian_base_iot_electricfire(node) {
    module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_futian_base_iot_electricfire);
  }

  var setContentInfo_layer_futian_base_iot_electricfire = function setContentInfo_layer_futian_base_iot_electricfire(feature) {
    //console.log(feature);
    var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
    nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId);

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
      "<iframe src='../gis/js/module/layerInfoWindow/futian/futianBaseIotElectricFireInfoWindow.html" + htmlUrlParams + "'  style='width:100%;height:100%;border: 1px solid #196db4;background-color: #032335;' scrolling='no'></iframe>" +
      "</div>";

    return html;
  }

    /**
     *预警中心
     */
    var layer_futian_base_yjzx = function layer_futian_base_yjzx(node) {
      module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_futian_base_yjzx);
    }

    var setContentInfo_layer_futian_base_yjzx = function setContentInfo_layer_futian_base_yjzx(feature) {
      //console.log(feature);

      var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
      nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

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

      var html = "<div class='popView' style='width: 260px;height: 363px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;'>" +
        "<iframe src='../gis/js/module/layerInfoWindow/futian/yjzx.html" + htmlUrlParams + "'  style='width:100%;height:100%; auto;border:none;' scrolling='no'></iframe>" +
        "</div>";

      return html;
    }


    /**
     *城市部件--arcgis polyline图层
     */
    var layer_futian_base_component_polyline = function layer_futian_base_component_polyline(node) {
      module.layerControl.common.loadUtil.loadArcGISPolylineLayer(node, setContentInfo_layer_futian_base_component_polyline);
    }

    var setContentInfo_layer_futian_base_component_polyline = function setContentInfo_layer_futian_base_component_polyline(feature) {
      //console.log(feature);

      var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
      nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

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

      var html = "<div class='popView' style='width: 260px;height: 363px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;'>" +
        "<iframe src='../gis/js/module/layerInfoWindow/futian/yjzx.html" + htmlUrlParams + "'  style='width:100%;height:100%; auto;border:none;' scrolling='no'></iframe>" +
        "</div>";

      return html;
    }

    /**
     *城市部件--arcgis polygon图层
     */
    var layer_futian_base_component_polygon = function layer_futian_base_component_polygon(node) {
      module.layerControl.common.loadUtil.loadArcGISPolygonLayer(node, setContentInfo_layer_futian_base_component_polygon);
    }

    var setContentInfo_layer_futian_base_component_polygon = function setContentInfo_layer_futian_base_component_polygon(feature) {
      //console.log(feature);

      var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
      nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

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

      var html = "<div class='popView' style='width: 260px;height: 363px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;'>" +
        "<iframe src='../gis/js/module/layerInfoWindow/futian/yjzx.html" + htmlUrlParams + "'  style='width:100%;height:100%; auto;border:none;' scrolling='no'></iframe>" +
        "</div>";

      return html;
    }

  return {
        layer_futian_base_test: layer_futian_base_test,
        layer_futian_base_iot: layer_futian_base_iot,
        layer_futian_base_iot_electricfire: layer_futian_base_iot_electricfire,
        layer_futian_base_iot_policevideo: layer_futian_base_iot_policevideo,
        layer_futian_base_cityrrisk: layer_futian_base_cityrrisk,
        layer_futian_base_yjzx:layer_futian_base_yjzx,
        layer_futian_base_component_polyline:layer_futian_base_component_polyline,
        layer_futian_base_component_polygon:layer_futian_base_component_polygon
    }
}));
