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

        root.module.layerControl.common.loadUtil = factory();
    }
}(this, function () {
//定义一些常量

    /** ----------------------------------------------------数据库服务图层加载--------------------------------------------------------*/
    /**
     * json数据点图层加载
     */
    var loadPointJsonLayer = function loadPointJsonLayer(node) {
        loadPointJsonLayerModule(node, setPointJsonContentInfo);
    }


    /**
     * json数据点图层通用模快   修改视频加标签的名
     */
    var loadPointJsonLayerModule = function loadPointJsonLayerModule(node, setContentInfoFunc) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
	      var timestamp = new Date().getTime();

	      let getAllDataUrl;
	      if(node.pid.indexOf('urban_assi')!==-1){
          getAllDataUrl =encodeURI( node.url + "/selectByExample?street="+((parent.$nuxt.$store.state.addressStreet === '福田区')?'':parent.$nuxt.$store.state.addressStreet)
            + ((node.query === null) ? "&t=" + timestamp :"&"+ node.query + "&t=" + timestamp));
        }if(node.pid.indexOf('xiaofanglei_yinhuansanse') !== -1){
           getAllDataUrl =encodeURI( node.url + "/IconType/selectByExample?street="+((parent.$nuxt.$store.state.addressStreet === '福田区')?'':parent.$nuxt.$store.state.addressStreet)
            + ((node.query === null) ? "&t=" + timestamp :"&"+ node.query + "&t=" + timestamp));
        }else if(node.pid.indexOf('video_tag') !== -1){  //生态环境的打标签视频需要的链接
          getAllDataUrl = encodeURI(node.url + "/selectByExample?street="+((parent.$nuxt.$store.state.addressStreet === '福田区')?'':parent.$nuxt.$store.state.addressStreet)
            + '&name=' + node.label + ((node.query === null) ? "&t=" + timestamp : "&"+ node.query + "&t=" + timestamp));
        }else{
           getAllDataUrl = encodeURI(node.url + "/selectByExample?street="+((parent.$nuxt.$store.state.addressStreet === '福田区')?'':parent.$nuxt.$store.state.addressStreet)
            //+ "&video="+((parent.$nuxt.$store.state.video ==='福田区')?'':parent.$nuxt.$store.state.video)
            + ((node.query === null) ? "&t=" + timestamp : "&"+ node.query + "&t=" + timestamp));
          //var getAllDataUrl = node.url + ((node.query == null) ? "" : node.query);
        }


        var options = {
	        responseType: 'json',
          headers: {
            token: module.common.layerControl.mapNet.getCookieByName("Admin-Token")
          }
	      };

        //console.log(getAllDataUrl);
      parent.window.showLoading(true)
        requestJsonData(getAllDataUrl, options).then(function (response) {
            //console.log(response);
            var data = response.data;
            // do something useful
            module.common.layerControl.mapNet.checkLogin(data);//token登录校验
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


            var clearResultsThisAction = {
                title: "清除",
                id: "tool_clearQueryResults",
                image: "img/layerControl/popup/search.png"
            };

            var popupTemplate = {
                title: node.label,
                outFields:["*"],//sdk 4.10 兼容
                content: setContentInfoFunc,
                //actions: [clearResultsThisAction]
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
                    /*spatialReference: { //sdk 4.6 兼容
                        wkid: window.mapView.spatialReference
                    },*/
                    //geometryType: "point",//sdk 4.6 兼容
                    minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
                    maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom)
                });

                featureLayer.renderer = renderer;
                featureLayer.popupTemplate = popupTemplate;

                window.map.add(featureLayer);

                //console.log(featureLayer);
            }
            else {
                layer.visible = true;
            }
            console.log(node.label + "图层加载完成");
          parent.window.showLoading(false)
        }).otherwise(function (error) {
            console.log(node.id + "图层加载错误，", error.message);
          parent.window.showLoading(false)
        });
    }



    //信息框内容模块--废弃
/*    var setPointJsonContentInfo_old = function setPointJsonContentInfo_old(feature) {
        console.log(feature);
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id);

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

        var getPopupDataUrl = node.url + "/summaryInfo";

        var options = {
            query: {
                id: feature.graphic.attributes.id,
                type: MapConfig.backgroundService.webType
            },
            responseType: 'json'
        };

        var htmlItem = "";
        var htmlDetail = "";

        $.ajax({
            url: getPopupDataUrl,
            type: 'GET',
            data: options.query,
            dataType: "json", //指定服务器返回的数据类型
            async: false,
            success: function (data) {
                //遍历字段
                for (var i = 0; i < data.value.length; i++) {
                    var item = data.value[i];
                    htmlItem += "<p>" + item[0] + "：" + item[1] + "</p>";
                }

                //是否有详细按钮
                if (data.hasDetailInfo) {
                    htmlDetail = "<div class='k_c_left' > " +
                        "<a href='####' title='详情' onclick='parent.monographicLayer.loadSFDetailMessage(" + "&quot;" + node.id + "&quot;" + ",&quot;" + feature.graphic.attributes.id + "&quot;)'>" +
                        "<span><img src='img/layerControl/popup/detail.png'></span>" +
                        "<span style='margin-top: 10px'>详情</span>" +
                        "</a>" +
                        " </div>";
                }
            },
            error: function (error) {
                console.log(node.id + "图层弹框加载错误，", error.message);
            }
        });


        var html = "<div class='popup_content_div'>" +
            /!*"<p>id：" + feature.graphic.attributes.id + "</p>" +*!/
            htmlItem +
            " </div>" +
            /!*"<button onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + feature.graphic.geometry.longitude + "," + feature.graphic.geometry.latitude + ")'>" + "附近资源</button>" +*!/
            "<div class='k_c'>" +
            htmlDetail +
            " <div class='k_c_right'>" +
            " <a href='####' title='附近资源' onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + pointLocal.x + "," + pointLocal.y + ")'>" +
            " <span><img src='img/layerControl/popup/search.png'></span>" +
            " <span>附近资源</span>" +
            " </a>" +
            " </div>" +
            "</div>";

        return html;
    }*/

    //信息框内容模块
    var setPointJsonContentInfo = function setPointJsonContentInfo(feature) {
        //console.log(feature);
        var nodeId=(feature.graphic.layer.id).replace(/_CircleSearchResultLayer/, "");//周边查询图层，nodeid处理
        nodeId = nodeId.replace(/_SinglePointSearchResultLayer/, "");//周边查询图层，nodeid处理

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

        //var htmlUrl = "../gis/js/module/layerInfoWindow/base/basePopupTemplate.html?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id;

        var htmlUrlParams = "?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id + "&longitude=" + pointLocal.x + "&latitude=" + pointLocal.y;

        var html = "<div class='popView' style='width: 260px;height: 293px;overflow: hidden;border: 1px solid #196db4;background-color: #032335; box-shadow:0 0 5px #e6e6e6;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/base/futianBasePop.html" + htmlUrlParams + "'  style='width:100%;height:100%; border: none;' scrolling='no'></iframe>" +
            "</div>";

        return html;
    }


    /**
     * json数据->arcgis featurelayer的json
     */
    var requestJsonData = function requestJsonData(url, options) {
        var esriRequest = window.require("esri/request");

        /* var options = {
         /!* query: {
         city: '北京'
         },*!/
         responseType: 'json'
         };*/
        return esriRequest(url, options);

        /*$.ajax({
         url: 'http://192.168.16.161:8080/test',
         type: 'GET',
         dataType: "json", //指定服务器返回的数据类型
         async: false,
         success: function (data) {
         return data;
         }
         });*/
    }

    /** ----------------------------------------------------arcgis服务--------------------------------------------------------*/
    /**
     * 规土委poi图层加载
     */
    var loadGtwpoiLayer = function loadGtwpoiLayer(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');

        var layer = window.map.findLayerById(node.id);
        //初次加载
        if (layer == null) {

            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                    url: node.icon,
                    width: (node.iconsize) ? node.iconsize.split(",")[0] : "26" + "px",
                    height: (node.iconsize) ? node.iconsize.split(",")[0] : "36" + "px"
                }
            };

            var clearResultsThisAction = {
                title: "清除",
                id: "tool_clearQueryResults",
                image: "img/layerControl/popup/search.png"
            };

            var popupTemplate = {
                title: node.label,
                content: setGtwContentInfo,
                actions: [clearResultsThisAction]
            };

            var featureLayer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
                maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
                outFields: ["*"]
            });

            featureLayer.popupTemplate = popupTemplate;
            featureLayer.renderer = renderer;

            window.map.add(featureLayer);
        }
        else { //图层隐藏->显示
            layer.visible = true;
        }
        console.log(node.label + "图层加载完成");
    }

    //信息框内容模块
    var setGtwContentInfo = function setGtwContentInfo(feature) {
        //console.log(feature);
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id);

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

        //var htmlUrl = "../gis/js/module/layerInfoWindow/base/basePopupTemplate.html?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id;

        var htmlUrlParams = "?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id + "&longitude=" + pointLocal.x + "&latitude=" + pointLocal.y;

        var html = "<div style='width: 260px;height: 293px;overflow: hidden;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/base/baseArcgisPoiPopup.html" + htmlUrlParams + "'  style='width:100%;height:100%; border: 1px solid #196db4;background-color: #032335;' scrolling='no'></iframe>" +
            "</div>";


        return html;
    }

    /**
     * 规土委Polyline图层加载
     */
    var loadArcGISPolylineLayer = function loadArcGISPolylineLayer(node,setContentInfoFunc) {
      var FeatureLayer = window.require('esri/layers/FeatureLayer');

      var layer = window.map.findLayerById(node.id);
      //初次加载
      if (layer == null) {

        var renderer = {
          type: "simple",
          symbol: {
            type: 'simple-line',
            color: node.lineColor,
            width: node.lineWidth,
            style:node.lineStyle
           /* cap: 'round',
            join: 'round'*/
          }
        };

        var popupTemplate = {
          title: node.label,
          content: setContentInfoFunc
        };

        var featureLayer = new FeatureLayer({
          id: node.id,
          url: node.url,
          title: node.label,
          minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
          maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
          outFields: ["*"]
        });

        //featureLayer.popupTemplate = popupTemplate;
        featureLayer.renderer = renderer;

        window.map.add(featureLayer);
      }
      else { //图层隐藏->显示
        layer.visible = true;
      }
      console.log(node.label + "图层加载完成");
    }

    /**
     * 规土委Polygon图层加载
     */
    var loadArcGISPolygonLayer = function loadArcGISPolygonLayer(node,setContentInfoFunc) {
      var FeatureLayer = window.require('esri/layers/FeatureLayer');

      var layer = window.map.findLayerById(node.id);
      //初次加载
      if (layer == null) {

        var renderer = {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: node.fillColor,
            outline: {
              color: node.outlineColor,
              width: node.outlineWidth
            }
          }
        };

        var popupTemplate = {
          title: node.label,
          content: setContentInfoFunc
        };

        var featureLayer = new FeatureLayer({
          id: node.id,
          url: node.url,
          title: node.label,
          minScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.minZoom),
          maxScale: module.common.mapTool.baseGeoTool.getScaleByZoom(node.maxZoom),
          outFields: ["*"]
        });

        //featureLayer.popupTemplate = popupTemplate;
        featureLayer.renderer = renderer;

        window.map.add(featureLayer);
      }
      else { //图层隐藏->显示
        layer.visible = true;
      }
      console.log(node.label + "图层加载完成");
    }

    /** --------------------------------------------------周边查询----------------------------------------------------------*/

//周边查询圆形绘制
    var drawCirleQuery = function drawCirleQuery(x, y,radius) {
        var Point = window.require("esri/geometry/Point");
        var Circle = window.require("esri/geometry/Circle");
        var Graphic = window.require("esri/Graphic");
        var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
        var SpatialReference = window.require("esri/geometry/SpatialReference");

        var center = new Point({x: x, y: y});

        window.drawCircleQuery_Center = {x: x, y: y};

        //画圆
        if (MapConfig.mapInitParams.spatialReference.wkid == 4490) {
            center = new Point({x: x, y: y, spatialReference: window.mapView.spatialReference});
        }

        if (!radius) {
           radius = 2000;
        }

        //绘制周边圆
        var circle;
        if (MapConfig.mapInitParams.spatialReference.wkid == 4490) {
            circle = new Circle({
                center: center,
                radius: radius,
                spatialReference: window.mapView.spatialReference
            });
        }
        else {
            circle = new Circle({
                center: center,
                radius: radius,
                geodesic: true,
                spatialReference: window.mapView.spatialReference
            });
        }

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
        console.log(graphic);

        //中心提示点
        var makerSymbol = {
            type: "picture-marker",
            url: "img/layerControl/popup/center.png",
            width: "41px",
            height: "41px"
        };
        //var pointGraphic = new Graphic(center, makerSymbol);
        var pointGraphic = new Graphic(center, makerSymbol/*{
                type: "simple-marker",
                color: [0, 175, 255,0.85],
                outline: {
                    color: [30, 144, 255, 0.3],
                    width: 20
                }
            }*/
        );

        var layer = window.map.findLayerById("circleQueryGraphicsLayer");
        if (!layer) {
            var circleQueryGraphicsLayer = new GraphicsLayer({id: "circleQueryGraphicsLayer", title: "周边查询圆形"});
            circleQueryGraphicsLayer.add(graphic);
            circleQueryGraphicsLayer.add(pointGraphic);
        }
        else {
            layer.removeAll();
            layer.add(graphic);
            layer.add(pointGraphic);
            layer.visible = true;
        }

        module.layerQuery.featureNearbyQuery.clearResultGrapicLayer();//清除查询结果

        //module.layerQuery.featureNearbyQuery.featureQueryByCircle(graphic);
        console.log(graphic);
        window.map.add(circleQueryGraphicsLayer, 0);//main.js 中已加载图层
    }

    /** --------------------------------------------------搜索查询，单点落图----------------------------------------------------------*/
    /**
     * 数据库数据图层加载
     */
    var loadSinglePointJsonResultGrapicLayer = function loadSinglePointJsonResultGrapicLayer(graphics, node) {
        //console.log(node.id);
        //console.log(graphics);

        var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
        var graphicsLayer = window.map.findLayerById("querySinglePointGraphicsLayer");

        if (!graphicsLayer) {
            graphicsLayer = new GraphicsLayer({id: "querySinglePointGraphicsLayer", title: "单点搜索结果图层"});
        }

        graphicsLayer.removeAll();//清除图层

        for (var i = 0; i < graphics.length; i++) {
            var graphic = graphics[i];

            graphic.symbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: node.icon,
                width: (node.iconsize) ? node.iconsize.split(",")[0] : "26" + "px",
                height: (node.iconsize) ? node.iconsize.split(",")[0] : "36" + "px"
            };

            var clearResultsThisAction = {
                title: "清除",
                id: "tool_clearQueryResults",
                image: "img/layerControl/popup/search.png"
            };
            graphic.popupTemplate = {
                title: node.label,
                content: setSinglePointJsonContentInfo,
                actions: [clearResultsThisAction]
            };

            graphicsLayer.add(graphic);
            //console.log(graphic);
        }

        window.map.add(graphicsLayer);
        graphicsLayer.visible = true;
        console.log("搜索结果单点图层加载成功");
    }


    //信息框内容模块
    var setSinglePointJsonContentInfo= function setSinglePointJsonContentInfo(feature) {
        console.log(feature);

        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.attributes.layerid);

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


        var getPopupDataUrl = node.url + "/summaryInfo";
        var options = {
            query: {
                id: feature.graphic.attributes.id,
                type: MapConfig.backgroundService.webType
            },
            responseType: 'json'
        };

        var htmlItem = "";
        var htmlDetail = "";

        $.ajax({
            url: getPopupDataUrl,
            type: 'GET',
            data: options.query,
            dataType: "json", //指定服务器返回的数据类型
            async: false,
            success: function (data) {
                //遍历字段
                for (var i = 0; i < data.value.length; i++) {
                    var item = data.value[i];
                    htmlItem += "<p>" + item[0] + "：" + item[1] + "</p>";
                }

                //是否有详细按钮
                if (data.hasDetailInfo) {
                    htmlDetail = "<div class='k_c_left' > " +
                        "<a href='####' title='详情' onclick='parent.monographicLayer.loadSFDetailMessage(" + "&quot;" + node.id + "&quot;" + ",&quot;" + feature.graphic.attributes.id + "&quot;)'>" +
                        "<span><img src='img/layerControl/popup/detail.png'></span>" +
                        "<span style='margin-top: 10px'>详情</span>" +
                        "</a>" +
                        " </div>";
                }
            },
            error: function (error) {
                console.log(node.id + "图层弹框加载错误，", error.message);
            }
        });


        var html = "<div class='popup_content_div'>" +
            /*"<p>id：" + feature.graphic.attributes.id + "</p>" +*/
            htmlItem +
            " </div>" +
            /*"<button onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + feature.graphic.geometry.longitude + "," + feature.graphic.geometry.latitude + ")'>" + "附近资源</but     ton>" +*/
            "<div class='k_c'>" +
            htmlDetail +
            " <div class='k_c_right'>" +
            " <a href='####' title='附近资源' onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + pointLocal.x + "," + pointLocal.y + ")'>" +
            " <span><img src='img/layerControl/popup/search.png'></span>" +
            " <span>附近资源</span>" +
            " </a>" +
            " </div>" +
            "</div>";

        console.log(html);
        return html;
    }


    //关闭单个落点图层
    var closeSinglePointJsonResultGrapicLayer = function closeSinglePointJsonResultGrapicLayer() {
        var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
        var graphicsLayer = window.map.findLayerById("querySinglePointGraphicsLayer");

        if (graphicsLayer) {
            graphicsLayer.visible = false;
        }

    }


    /** ------------------------------------------------------------------------------------------------------------*/


    return {
        loadPointJsonLayer: loadPointJsonLayer,
        loadPointJsonLayerModule: loadPointJsonLayerModule,
        requestJsonData: requestJsonData,
        loadGtwpoiLayer: loadGtwpoiLayer,
        drawCirleQuery: drawCirleQuery,
        loadSinglePointJsonResultGrapicLayer: loadSinglePointJsonResultGrapicLayer,
        closeSinglePointJsonResultGrapicLayer: closeSinglePointJsonResultGrapicLayer,
        loadArcGISPolylineLayer:loadArcGISPolylineLayer,
        loadArcGISPolygonLayer:loadArcGISPolygonLayer
        //setPointJsonContentInfo: setPointJsonContentInfo
    }
}))
;
