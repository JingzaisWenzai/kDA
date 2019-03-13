/**
 *iot基础图层
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
        root.module.layerControl.iotLayer = ( root.module.layerControl.iotLayer) ? root.module.layerControl.iotLayer : {};

        root.module.layerControl.iotLayer.base = factory();
    }
}(this, function () {

    var layer_iot_base_common = function layer_iot_base_common(node) {
        module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_iot_base_common);
    }


    var setContentInfo_layer_iot_base_common = function setContentInfo_layer_iot_base_common(feature) {
        //console.log(feature);
        var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId);

        //坐标点
        var pointLocal = {};
        if (MapConfig.mapInitParams.spatialReference.wkid == 4490) {
            pointLocal.x = feature.graphic.geometry.x;
            pointLocal.y = feature.graphic.geometry.y;
        }
        else {
            pointLocal.x = feature.graphic.geometry.longitude;
            pointLocal.y = feature.graphic.geometry.latitude;
        }

        var htmlUrl = "../gis/js/module/layerInfoWindow/iot/iotCommonInfoWindow.html?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id;

        var html = "<div style='width: 360px;height: 320px;overflow: hidden;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/iot/iotCommonInfoWindow.html?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id + "'  style='width:100%;height:100%; auto;border:none;' scrolling='no'></iframe>" +
            "</div>";

        return html;
    }

    return {
        layer_iot_base_common: layer_iot_base_common
    }

}));
