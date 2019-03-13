/**
 * Created by Administrator on 2018/3/6.
 */

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/layers/Layer",
    "esri/layers/WMTSLayer",
    "esri/layers/TileLayer",
    "esri/layers/WebTileLayer",
    "esri/layers/SceneLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/geometry/Circle",
    "esri/WebMap",
    "esri/widgets/LayerList",
    "dojo/domReady!"
], function (esriConfig, Map, MapView, SceneView, Layer, WMTSLayer, TileLayer, WebTileLayer, SceneLayer, MapImageLayer, FeatureLayer, GraphicsLayer, Graphic, Point, Polyline, Polygon, Circle, WebMap, LayerList) {
    esriConfig.portalUrl = "https://gisserver.giscloud/arcgis";
    esriConfig.request.corsEnabledServers.push("192.168.16.250:6080");
    esriConfig.request.corsEnabledServers.push("192.168.16.248:8080");

    var wmtsLayer = new WMTSLayer({
        url: "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best",
        copyright: "<a target='_top' href='https://earthdata.nasa.gov'>Earthdata</a> by <a target='_top' href='https://www.nasa.gov'>NASA</a>",
        activeLayer: {
            id: "SRTM_Color_Index",
        }
    });

    var tiledLayer = new WebTileLayer({
        urlTemplate: "https://api.mapbox.com/styles/v1/derikzhao/cj9imt7sr0u4z2soiottfwlr3/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoiZGVyaWt6aGFvIiwiYSI6ImNpc2JpNWJsbTAxMjkyb2xyc29mbTlmMjQifQ.gl04m8Duv4z8KrYFm_956A"
    });

    var baseLayer = new TileLayer({
        title: "esri底图",
        url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer"

    });

    var imageLayer = new MapImageLayer({
        title: "城市部件",
        url: "http://192.168.16.250:6080/arcgis/rest/services/SZCity/SZCityComponents/MapServer"
    });

    var imageLayer2 = new MapImageLayer({
        title: "行政区划",
        url: "http://192.168.16.250:6080/arcgis/rest/services/SZCity/SZ_Area/MapServer"
    });

    var imageLayer3 = new MapImageLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        sublayers: [
            {
                id: 0,
                renderer: {
                    type: "simple",  // autocasts as new SimpleRenderer()
                    symbol: {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        size: 3,
                        color: "white"
                    }
                }
            }
        ]
    });

    var featureLayer1 = new FeatureLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
        renderer: {
            type: "simple",  // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                size: 3,
                color: "white"
            }
        }
        // outFields: ["*"]
    });


    var map = new Map({
        // basemap: tiledLayer2
        //ground: "world-0"
    });
    window.map = map;

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 11,
        center: [114.060168, 22.533403]
    });

    //图层添加
    map.add(baseLayer);
    map.add(imageLayer);
    map.add(imageLayer2);
    //smap.add(featureLayer1);


    //图层控制
    view.when(function () {
        var layerList = new LayerList({
            view: view
        });

        // Add widget to the top right corner of the view
        view.ui.add(layerList, "top-right");
    });

    //map.add(tiledLayer);
    // webMap.add(sceneLayer);

    //要素图层加载

    //绘制，point|polyline|polygon|rectangle|circle
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    var drawTools = new DrawTools(view, Graphic, Point, Polyline, Polygon, Circle);

    var polygonSymbol = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [227, 139, 79, 0.8],
        outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1
        }
    };

    drawTools.draw("circle", polygonSymbol, function (graphic) {
        //var graphicsLayer=new GraphicsLayer();
        graphicsLayer.add(graphic);
        //map.add(graphicsLayer);
    })

   /* $.ajax({
        url: 'http://192.168.16.248:8080/gismap/gis/js/plugin/geojson.js',
        type: 'GET',
        dataType: "jsonp", //指定服务器返回的数据类型
        success: function (data) {
           console.log(data);
        }
    });*/

});

/*
 var fillSymbol = {
 type: "simple-fill", // autocasts as new SimpleFillSymbol()
 color: [227, 139, 79, 0.8],
 outline: { // autocasts as new SimpleLineSymbol()
 color: [255, 255, 255],
 width: 1
 }
 };


 var lineSymbol = {
 type: "simple-line", // autocasts as SimpleLineSymbol()
 color: [226, 119, 40],
 width: 4
 };

 var markerSymbol = {
 type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
 color: [226, 119, 40],
 outline: { // autocasts as new SimpleLineSymbol()
 color: [255, 255, 255],
 width: 2
 }
 };*/

/*

*/

