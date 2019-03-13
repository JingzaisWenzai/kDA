require([
    "esri/config",
    "esri/Map",
    "esri/Basemap",
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
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/geometry/Circle",
    "esri/WebMap",
    "esri/widgets/LayerList",
    "esri/widgets/Compass",
    "esri/layers/support/MapImage",
    "esri/request",
    "dojo/domReady!"
], function (esriConfig, Map, Basemap, MapView, SceneView, Layer, WMTSLayer, TileLayer, WebTileLayer, SceneLayer, MapImageLayer, FeatureLayer, GraphicsLayer, Graphic, Extent, Point, Polyline, Polygon, Circle, WebMap, LayerList, Compass, MapImage, esriRequest) {
    esriConfig.request.proxyUrl = "http://10.190.55.58:9205/java/proxy.jsp";
    esriConfig.request.forceProxy = true;
    esriConfig.request.corsEnabledServers.push("192.168.16.240:6443");
    esriConfig.request.corsEnabledServers.push("192.168.16.240:6080");


    esriConfig.request.corsEnabledServers.push("giscloud.com:8010");
    esriConfig.request.corsEnabledServers.push("192.16.10.175:8080");
    esriConfig.request.corsEnabledServers.push("192.16.10.175:6443");
    esriConfig.request.corsEnabledServers.push("192.16.10.175:6080");
    esriConfig.request.corsEnabledServers.push("192.16.10.175:8010");

    esriConfig.request.corsEnabledServers.push("192.168.95.80:89");

    esriConfig.request.corsEnabledServers.push("192.168.16.177:8080");
    esriConfig.request.corsEnabledServers.push("192.168.16.195:8080");

    esriConfig.request.corsEnabledServers.push("10.192.19.108:8080");//福田测试环境
    esriConfig.request.corsEnabledServers.push("10.190.55.58:8081");//福田正式环境
    esriConfig.request.corsEnabledServers.push("10.192.19.107:8081");//

    esriConfig.request.corsEnabledServers.push("t0.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t1.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t2.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t3.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t4.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t5.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t6.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t8.tianditu.com");
    esriConfig.request.corsEnabledServers.push("t9.tianditu.com");

    //基础电子底图
    var normBaseLayer = new TileLayer({
        url: MapConfig.normMap.Url,
        id: "normBaseLayer"
    });

    var normBasemap = new Basemap({
        baseLayers: [normBaseLayer],
        title: "影像底图",
        id: "normBasemap"
    });

    //影像底图
    var imgBaseLayer = new TileLayer({
        url: MapConfig.imgMap.Url,
        id: "imgBaseLayer"
    });
    var imgBasemap = new Basemap({
        baseLayers: [imgBaseLayer],
        title: "影像底图",
        id: "imgBasemap"
    });

    //天地图
    var tdBaseTileMap = new WebTileLayer({
        urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=vec_w&x={col}&y={row}&l={level}",
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        copyright: "天地图矢量"
    });

    var tdLabelTileMap = new WebTileLayer({
        urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=cva_w&x={col}&y={row}&l={level}",
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        copyright: "天地图注记"
    });

    var tdImgTileMap = new WebTileLayer({
        urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}",
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        copyright: "天地图影像"
    });

    var normBaseTDMap = new Basemap({
        baseLayers: [tdBaseTileMap, tdLabelTileMap],
        title: "天地图矢量",
        id: "normBaseTDMap"
    });

    var imgBaseTDMap = new Basemap({
        baseLayers: [tdImgTileMap],
        title: "天地图影像",
        id: "imgBaseTDMap"
    });


    //地图对象
    var basemap;
    if (MapConfig.currentWkid == 4326)
        basemap = module.common.mapTool.mapOperate.getNormTDBasemap();
    else if (MapConfig.currentWkid == 4490)
        basemap = module.common.mapTool.mapOperate.getNormBasemap();

    var map = new Map({
        basemap: basemap//normBasemap
    });
    //地图视图对象
    var mapView = new MapView({
        container: "viewDiv",
        map: map,
        zoom: MapConfig.mapInitParams.zoom,
        center: MapConfig.mapInitParams.center,
        highlightOptions: {
            color: [255, 241, 58],
            fillOpacity: 0.4
        }
        /*,
         spatialReference: {
         wkid: MapConfig.mapInitParams.spatialReference.wkid
         }*/
    });

    if (MapConfig.currentWkid == 4490) {
        mapView.spatialReference = {
            wkid: MapConfig.mapInitParams.spatialReference.wkid
        }
    }

    mapView.popup.dockOptions = {
        // Disables the dock button from the popup
        buttonEnabled: false,
        // Ignore the default sizes that trigger responsive docking
        breakpoint: false
    };

    window.map = map;
    window.mapView = mapView;

    /*-----------------------地图工具----------------------------*/
    //mapView.ui.move("zoom", "bottom-right");

    /*var compass = new Compass({view: mapView});
     mapView.ui.add(compass, "bottom-right");*/

    //图层控制
    mapView.when(function () {
        var layerList = new LayerList({
            view: mapView
        });

        // Add widget to the top right corner of the view
        // mapView.ui.add(layerList, "top-right");
    });

    /*-----------------------图层加载----------------------------*/
    ///hack 防止周边查询画圆覆盖jsonfeature图层部分数据，无法点击弹框
    var graphicsLayer = new GraphicsLayer({id: "circleQueryGraphicsLayer", title: "周边查询图层"});
    window.map.add(graphicsLayer, 0);

    var graphicsLayer = new GraphicsLayer({id: "drawGeometryGraphicsLayer", title: "标绘图层"});
    window.map.add(graphicsLayer, 1);

    var imageLayer = new MapImageLayer({
        title: "城市部件",
        url: "http://192.168.16.250:6080/arcgis/rest/services/SZCity/SZCityComponents/MapServer"
    });
    // map.add(imageLayer);


    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_gtw_basemap");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_flood_waterPrevention_test1");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_gtwpoi_chainrestaurant_zhongcanting");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_flood_weather_test1");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_basegeo_boundary_qu");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_basegeo_boundary_jiedao");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_basegeo_boundary_shequ");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_basegeo_boundary_grid");


    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_gtwpoi_telecommunication_dianxing");


    // module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_project_building_dangerpoint");
    //  module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_project_building_firehydrant");

    // module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_project_building_warning");
    // module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_project_building_buildingclassification");

    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_gtwpoi_telecommunication_youzheng");

    //module.common.mapTool.drawGeometry.drawPointMarker("clkz");
    // module.common.mapTool.drawGeometry.drawText("测试",12);
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_gtwpoi_telecommunication_youzheng");
    //module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_basegeo_featureMapFutian_building");


    /*
     //分页查询
     var node = module.common.layerControl.mapLayerXml.getLayerNodeById("layer_gtwpoi_telecommunication_dianxing");
     module.layerQuery.featureAttributeQuery.queryFeatureLayerByPage(node, 50, 1, function (results) {
     console.log(results);
     });

     //图层总数
     module.layerQuery.featureAttributeQuery.queryFeatureLayerCount(node,function (results) {
     console.log(results);
     });
     */

    /*-----------------------地图事件----------------------------*/
    //网站页面类型，三防、消防
    var url = window.parent.document.URL;
    console.log(url);
    /*if (url.indexOf("sfztxxzc") > 0) {
     MapConfig.backgroundService.webType = "三防";
     }
     else if (url.indexOf("xfztxxzc") > 0) {*/
    MapConfig.backgroundService.webType = "消防";
    //}

    console.log(MapConfig.backgroundService.webType);

    //弹框中工具--清除周边查询结果
    mapView.popup.on("trigger-action", function (event) {
        console.log(event.action);
        if (event.action.id === "tool_clearQueryResults") {
            module.layerQuery.featureNearbyQuery.closeResultGrapicLayer();
        }
    });


    //社区级建筑
    if (url.indexOf("sqztfw") > 0) {
        module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_project_building_buildingclassification");
        if (MapConfig.currentWkid == 4326) {
            mapView.center = new Point(114.027, 22.526);
            mapView.zoom = 16;
        }
        else if (MapConfig.currentWkid == 4490) {
            mapView.center = new Point({
                x: 114.027,
                y: 22.526,
                spatialReference: MapConfig.mapInitParams.spatialReference.wkid
            });
            mapView.zoom = 6;
        }
    }


    //图层点击事件

    function openWarningPng() {
        module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_others_firewarn_demo");
    }

    function closeWarningPng() {
        module.common.layerControl.mapLayerOperate.closeSingleLayerById("layer_others_firewarn_demo");
    }

    var openBtn = document.getElementById("openWarningPng");
    openBtn.onclick = function () {
        module.common.layerControl.mapLayerOperate.loadSingleLayerById("layer_others_firewarn_demo");
    }

    var closeBtn = document.getElementById("closeWarningPng");
    closeBtn.onclick = function () {
        module.common.layerControl.mapLayerOperate.closeSingleLayerById("layer_others_firewarn_demo");
    }

    //绘制工具
    // point|polyline|polygon|rectangle|circle
    /* var graphicsLayer = new GraphicsLayer();
     map.add(graphicsLayer);

     }
     var drawTools = new DrawTools(mapView, Graphic, Point, Polyline, Polygon, Circle);

     var polygonSymbol = {
     type: "simple-fill", // autocasts as new SimpleFillSymbol()
     color: [227, 139, 79, 0.8],
     outline: { // autocasts as new SimpleLineSymbol()
     color: [255, 255, 255],
     width: 1
     };

     drawTools.draw("circle", polygonSymbol, function (graphic) {
     var graphicsLayer = new GraphicsLayer();
     graphicsLayer.add(graphic);
     map.add(graphicsLayer);
     })*/

});