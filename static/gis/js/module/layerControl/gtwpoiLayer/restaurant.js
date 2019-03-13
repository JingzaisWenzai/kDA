/**
 * Created by Administrator on 2018/3/12.
 */
/**
 *规土委POI-餐馆
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
        root.module.layerControl.gtwpoiLayer = ( root.module.layerControl.gtwpoiLayer) ? root.module.layerControl.gtwpoiLayer : {};

        root.module.layerControl.gtwpoiLayer.restaurant = factory();
    }
}(this, function () {

    var layer_gtwpoi_restaurant_zhongcan = function layer_gtwpoi_restaurant_zhongcan(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');

        var layer = window.map.findLayerById(node.id);
        //初次加载
        if (layer == null) {
            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                    url: node.icon,
                    width: "28px",
                    height: "36px"
                }
            };

            var popupTemplate = {
                title: "图层：" + node.label,
                content: setContentInfo
                /*"<p>名称：{Name}</p>" +
                 "地址：{address}"*/
            };

            var featureLayer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                //renderer: renderer,
                //popupTemplate: popupTemplate,
                outFields: ["*"]
            });

            featureLayer.popupTemplate = popupTemplate;
            featureLayer.renderer = renderer;

            window.map.add(featureLayer);
        }
        else { //图层隐藏->显示
            layer.visible = true;
        }
        console.log("layer_gtwpoi_restaurant_zhongcan" + node.label + "加载完成");
    }

    var setContentInfo = function setContentInfo(feature) {
        console.log(feature);
        var html = "<div>" +
            "<p>名称：" + feature.graphic.attributes.name + "</p>" +
            "<p>地址：" + feature.graphic.attributes.address + "</p>" +
            "<button onclick='module.layerControl.gtwpoiLayer.restaurant.drawCirleQuery(" + feature.graphic.geometry.longitude + "," + feature.graphic.geometry.latitude + ")'>" +
            "附近资源</button>" +
            "</div>";
        console.log(html);

        return html;
    }

    var drawCirleQuery = function drawCirleQuery(x, y) {
        console.log(x + "," + y);
        var Point = window.require("esri/geometry/Point");
        var Circle = window.require("esri/geometry/Circle");
        var Graphic = window.require("esri/Graphic");
        var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
        var SpatialReference = window.require("esri/geometry/SpatialReference");


        var center = new Point({
            x: x,
            y: y
        });

        var radius = 4000;

        var circle = new Circle({
            center: center,
            radius: radius,
            geodesic: true,
            spatialReference: window.mapView.spatialReference
        });

        var fillSymbol = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 119, 237, 0.15],
            outline: { // autocasts as new SimpleLineSymbol()
                color: [16, 127, 236],
                width: 1,
                style: "dash"
            }
        };

        var graphic = new Graphic(circle, fillSymbol);
        var layer = window.map.findLayerById("circleQueryGraphicsLayer");
        if (!layer) {
            var circleQueryGraphicsLayer = new GraphicsLayer({
                id: "circleQueryGraphicsLayer",
                title: "附件查询图形绘制"
            });

            circleQueryGraphicsLayer.add(graphic);
        }
        else {
            layer.removeAll();
            layer.add(graphic);
        }

        window.map.add(circleQueryGraphicsLayer);
    }


    var layer_gtwpoi_restaurant_xican = function layer_gtwpoi_restaurant_xican() {

    }

    return {
        layer_gtwpoi_restaurant_zhongcan: layer_gtwpoi_restaurant_zhongcan,
        layer_gtwpoi_restaurant_xican: layer_gtwpoi_restaurant_xican
    }
}));
