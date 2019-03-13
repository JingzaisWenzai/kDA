
/**
 *火灾告警图层
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
        root.module.layerControl.otherLayer = ( root.module.layerControl.otherLayer) ? root.module.layerControl.otherLayer : {};

        root.module.layerControl.otherLayer.fireWarn = factory();
    }
}(this, function () {

    var layer_others_fireWarn_demo = function layer_others_fireWarn_demo(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var getAllDataUrl = node.url ;
        var options = {responseType: 'json'};

        requestJsonData(getAllDataUrl, options).then(function (response) {
            console.log(response);
            var data = response.data;
            // do something useful
            var esriFeatureJson = module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");

            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                    url: node.icon,
                    width: "42px",
                    height: "56px"
                }
            };
            var clearResultsThisAction = {
                title: "清除",
                id: "tool_clearQueryResults",
                image: "img/layerControl/popup/search.png"
            };

            var popupTemplate = {
                title: node.label,
                content: setPointJsonContentInfo,
                actions: [clearResultsThisAction]
            };

            var layer = window.map.findLayerById(node.id);
            //初次加载
            if (layer == null) {
                var featureLayer = new FeatureLayer({
                    id: node.id,
                    title: node.label,
                    source: esriFeatureJson.graphics, // autocast as an array of esri/Graphic
                    fields: esriFeatureJson.fields, // This is required when creating a layer from Graphics
                    objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
                    spatialReference: {
                        wkid: window.mapView.spatialReference
                    },
                    geometryType: "point"// Must be set when creating a layer from Graphics
                });

                featureLayer.renderer = renderer;
                featureLayer.popupTemplate = popupTemplate;

                window.map.add(featureLayer);
            }
            else {
                layer.visible = true;
            }
            console.log(node.label + "图层加载完成");

        }).otherwise(function (error) {
            console.log(node.id + "图层加载错误，", error.message);
        });

    }

    //信息框内容模块
    var setPointJsonContentInfo = function setPointJsonContentInfo(feature) {
        console.log(feature);

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
        console.log(pointLocal);

        var html = "<div class='popup_content_div'>" +
            "<p>警告类型：" + feature.graphic.attributes.type + "</p>" +
            "<p>地址：" + feature.graphic.attributes.address + "</p>" +
            /*"<p>Id：" + feature.graphic.attributes.id + "</p>" +*/

            " </div>" +
            "<div class='k_c'>" +
            /*  "<div class='k_c_left' > " +
             "<a href='####' title='详情' onclick='parent.loadDetailMessage(" + "&quot;" + feature.graphic.layer.id + "&quot;" + ")'>" +
             "<span><img src='img/layerControl/popup/detail.png'></span>" +
             "<span style='margin-top: 10px'>详情</span>" +
             "</a>" +
             " </div>" +*/
            " <div class='k_c_right'>" +
            " <a href='####' title='附近资源' onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + pointLocal.x + "," + pointLocal.y + ")'>" +
            " <span><img src='img/layerControl/popup/search.png'></span>" +
            " <span>附近资源</span>" +
            " </a>" +
            " </div>" +
            "</div>";

        return html;
    }

    /**
     * json数据->arcgis featurelayer的json
     */
    var requestJsonData = function requestJsonData(url, options) {
        var esriRequest = window.require("esri/request");

        return esriRequest(url, options);
    }

    return {
        layer_others_fireWarn_demo: layer_others_fireWarn_demo
    }

}));
