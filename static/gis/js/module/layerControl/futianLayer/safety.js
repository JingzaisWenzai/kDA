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

    root.module.layerControl.futianLayer.safety = factory();
  }
}(this, function () {

  var layer_futian_safety_sanxiaochangsuo = function layer_futian_safety_sanxiaochangsuo(node) {
    module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_futian_safety_sanxiaochangsuo);
  }

  var setContentInfo_layer_futian_safety_sanxiaochangsuo = function setContentInfo_layer_futian_safety_sanxiaochangsuo(feature) {
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
      "<iframe src='../gis/js/module/layerInfoWindow/futian/safety/futianSafetySanXiao.html" + htmlUrlParams + "'  style='width:100%;height:100%;border: none;' scrolling='no'></iframe>" +
      "</div>";

    return html;
  }



  return {
    layer_futian_safety_sanxiaochangsuo: layer_futian_safety_sanxiaochangsuo
  }
}));
