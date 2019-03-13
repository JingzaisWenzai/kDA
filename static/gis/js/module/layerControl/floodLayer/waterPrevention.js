/**
 * Created by Administrator on 2018/3/9.
 */
/**
 *防汛图层
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
        root.module.layerControl.floodLayer = ( root.module.layerControl.floodLayer) ? root.module.layerControl.floodLayer : {};

        root.module.layerControl.floodLayer.waterPrevention = factory();
    }
}(this, function () {
//定义一些常量
    var layer_flood_water_test1 = function layer_flood_water_test1(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');


        var data = requestData(node.url);

        console.log(data);

        var esriFeatureJson = module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");

        var popupTemplate = {
            title: "图层：天桥",
            content: "<p>名称：{ObjectID}</p>" +
            "地址：{ObjectID}"
        };

        var lyr = new FeatureLayer({
            id: node.id,
            title: node.label,
            source: esriFeatureJson.graphics, // autocast as an array of esri/Graphic
            fields: esriFeatureJson.fields, // This is required when creating a layer from Graphics
            objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
            renderer: {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                    size: 30,
                    color: "white"
                }
            }, // set the visualization on the layer
            spatialReference: {
                wkid: 4326
            },
            geometryType: "point",// Must be set when creating a layer from Graphics
            popupTemplate: popupTemplate
        });

        window.map.add(lyr);
    }

    var requestData = function requestData(url) {
        /* $.ajax({
         url: url,
         //data:{name:'jack', age:$("[name='age']").val()},  // 传递数据
         type: "POST",                                     // get/post都可以的请求方式
         async: false,                                     // 是否同步，false为异步加载
         dataType: "jsonp",                                // 设置返回数据类型jsonp
         jsonp: "jsoncallback",                            // jsonp的字段，服务器返回的前缀要和这个一样
         success: function (data) {
         console.log(data);
         return data;
         },
         error: function () {
         console.log('fail');
         }
         });*/
        var json = {};

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json", //指定服务器返回的数据类型
            async: false,
            success: function (data) {
                json = data;
            }
        });
        return json;
    };


    return {
        layer_flood_water_test1: layer_flood_water_test1
    }
}));
