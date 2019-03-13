
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
        root.module = (root.module) ? root.module : {};
        root.module.layerControl = (root.module.layerControl) ? root.module.layerControl : {};
        root.module.layerControl.common = (root.module.layerControl.common) ? root.module.layerControl.common : {};

        root.module.layerControl.common.heatLayer = factory();
    }
}(this, function () {
    var loadHeatLayerByPointJson = function loadHeatLayerByPointJson(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var HeatmapRenderer = window.require("esri/renderers/HeatmapRenderer");


        //var getAllDataUrl = node.url + "/selectByExample" + ((node.query == null) ? "" : node.query);
        var getAllDataUrl = node.url + ((node.query == null) ? "" : node.query);

        var options = {responseType: 'json'};

        requestJsonData(getAllDataUrl, options).then(function (response) {
            console.log(response);
            var data = response.data;
            // do something useful
            var esriFeatureJson = module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "lng", "lat");


            //符号化渲染
            var renderer = {
                type: "heatmap",
                colorStops: [
                    {ratio: 0, color: "rgba(0, 0, 255, 0)"},
                    {ratio: 0.2, color: "rgba(0, 0, 255, 0.4)"},
                    {ratio: 0.2, color: "rgba(0, 0, 255, 0.7)"},

                    {ratio: 0.2, color: "rgba(117,211,248, 0.7)"},
                    {ratio: 0.2, color: "rgba(0, 255, 0, 0.5)"},
                    {ratio: 0.2, color: "rgba(0, 255, 0, 0.7)"},
                    {ratio: 0.5, color: "rgba(255, 255, 0,0.5)"},
                    {ratio: 0.8, color: "rgba(255, 255, 0,0.7)"},
                    {ratio: 1, color: "rgba(255, 0, 0,0.5)"}
                ],
                minPixelIntensity: 0,
                maxPixelIntensity: 100,

            };
            if (node.weightField) {
                renderer.field = node.weightField;
            }

            if (node.maxPixelIntensity) {
                renderer.maxPixelIntensity = node.maxPixelIntensity;
            }

            /* var renderer = {
             type: "simple",  // autocasts as new SimpleRenderer()
             symbol: {
             type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
             size: 3,
             color: "white"
             }
             };*/


            //带权重
            /*   var heatmapRenderer = new HeatmapRenderer({
             field: "num",
             colors: ["rgba(255, 0, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)"],
             blurRadius: 12,
             // maxPixelIntensity: 20,
             // minPixelIntensity: 2
             });*/


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
                    geometryType: "point",// Must be set when creating a layer from Graphics
                    minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
                    maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom)
                });

                featureLayer.renderer = renderer;

                console.log(featureLayer);

                window.map.add(featureLayer);
            }
            else {
                layer.visible = true;
            }
            console.log(node.label + "图层加载完成");

        }).otherwise(function (error) {
            console.log(node.id + "图层加载错误，", error.message);
        });
    };

    var loadHeatLayerByFeatureLayer = function loadHeatLayerByFeatureLayer(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');

        var layer = window.map.findLayerById(node.id);
        //初次加载
        if (layer == null) {


            //符号化渲染
            var renderer = {
                type: "heatmap",
                colorStops: [
                    /*   {ratio: 0, color: "rgba(255, 255, 255, 0)"},
                     {ratio: 0.2, color: "rgba(255, 255, 255, 1)"},
                     {ratio: 0.5, color: "rgba(255, 140, 0, 1)"},
                     {ratio: 0.8, color: "rgba(255, 140, 0, 1)"},
                     {ratio: 1, color: "rgba(255, 0, 0, 1)"}*/

                    {ratio: 0, color: "rgba(0, 0, 255, 0.5)"},
                    {ratio: 0.2, color: "rgba(0, 0, 255, 0.5)"},
                    {ratio: 0.2, color: "rgba(0, 0, 255, 0.5)"},
                    {ratio: 0.2, color: "rgba(117,211,248, 0.5)"},
                    {ratio: 0.2, color: "rgba(0, 255, 0, 0.5)"},
                    {ratio: 0.2, color: "rgba(0, 255, 0, 0.5)"},
                    {ratio: 0.5, color: "rgba(255, 255, 0,0.5)"},
                    {ratio: 0.8, color: "rgba(255, 255, 0,0.5)"},
                    {ratio: 1, color: "rgba(255, 0, 0,0.5)"}
                ],


                blurRadius: 12,
                minPixelIntensity: 0,
                maxPixelIntensity: 100
            };

            //colors : [ "rgba(0, 0, 255, 0)","rgba(0, 0, 255, 0.4)","rgba(0, 0, 255, 0.7)",  "rgb(117,211,248)", "rgb(0, 255, 0,0.5)", "rgb(0, 255, 0,1)","rgb(255, 255, 0,0.5)","rgb(255, 255, 0,1)", "rgb(255, 0, 0,0.8)", ],


            /* var renderer = {
             type: "simple",  // autocasts as new SimpleRenderer()
             symbol: {
             type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
             size: 3,
             color: "white"
             }
             };*/


            var featureLayer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
                maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
                outFields: ["*"]
            });

            featureLayer.renderer = renderer;

            window.map.add(featureLayer);
        }
        else { //图层隐藏->显示
            layer.visible = true;
        }
        console.log(node.label + "图层加载完成");
    }


    var loadHeatLayerbByCsv = function loadHeatLayerbByCsv(node) {
        var CSVLayer = window.require('esri/layers/CSVLayer');
        //var HeatmapRenderer = window.require("esri/renderers/HeatmapRenderer");

        console.log(node);

        //符号化渲染
        var renderer = {
            type: "heatmap",
            colorStops: [
                {ratio: 0, color: "rgba(0, 0, 255, 0)"},
                {ratio: 0.2, color: "rgba(0, 0, 255, 0.4)"},
                {ratio: 0.2, color: "rgba(0, 0, 255, 0.7)"},

                {ratio: 0.2, color: "rgba(117,211,248, 0.7)"},
                {ratio: 0.2, color: "rgba(0, 255, 0, 0.5)"},
                {ratio: 0.2, color: "rgba(0, 255, 0, 0.7)"},
                {ratio: 0.5, color: "rgba(255, 255, 0,0.5)"},
                {ratio: 0.8, color: "rgba(255, 255, 0,0.7)"},
                {ratio: 1, color: "rgba(255, 0, 0,0.5)"}
            ],
            //field: "num",//带权重
            blurRadius: 12,
            minPixelIntensity: 0,
            maxPixelIntensity: 100
        };


        var layer = window.map.findLayerById(node.id);
        //初次加载
        if (layer == null) {
            var csvLayer = new CSVLayer({
                id: node.id,
                title: node.label,
                url: node.url,
                /*  spatialReference: {
                      wkid: window.mapView.spatialReference
                  },*/
                opacity: 0.7,
                renderer: renderer,
                minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
                maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom)
            });


            /*var csvLayer = new CSVLayer({
             id: node.id,
             title: node.label,
             url: node.url,
             renderer: renderer,
             opacity: 0.7
             });*/

            console.log(csvLayer);

            window.map.add(csvLayer);
        }
        else {
            layer.visible = true;
        }

        console.log(node.label + "图层加载完成");
    }


    /**
     * json数据->arcgis featurelayer的json
     */
    var requestJsonData = function requestJsonData(url, options) {
        var esriRequest = window.require("esri/request");

        return esriRequest(url, options);
    }

    return {
        loadHeatLayerByPointJson: loadHeatLayerByPointJson,
        loadHeatLayerbByCsv: loadHeatLayerbByCsv,
        loadHeatLayerByFeatureLayer: loadHeatLayerByFeatureLayer
    }
}));
