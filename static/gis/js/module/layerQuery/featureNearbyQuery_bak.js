/**
 *附近查询
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
        root.module.layerQuery = ( root.module.layerQuery) ? root.module.layerQuery : {};

        root.module.layerQuery.featureNearbyQuery = factory();
    }
}(this, function () {

    var gtwQueryResults = {};
    var gtwQueryCount = 0;
    /**
     *圆形范围查询
     */
    var featureQueryByCircle = function featureQueryByCircle(graphic) {
        var QueryTask = window.require("esri/tasks/QueryTask");
        var Query = window.require("esri/tasks/support/Query");

        gtwQueryResults = {
            "医院": 0,
            "公共汽车站": 0,
            "地铁站": 0,
            "加油站": 0,
            "学校": 0,
            "公园": 0,
            "建筑物": 0
        };
        gtwQueryCount = 0;

        var urlColletion = {
            "医院": ["layer_gtwpoi_medicalcenter_zongheyiyuan", "layer_gtwpoi_medicalcenter_zhuankeyiyuan", "layer_gtwpoi_medicalcenter_zhongyiyuan", "layer_gtwpoi_medicalcenter_shequweishengzhongxin", "layer_gtwpoi_medicalcenter_dulimenzhen", "layer_gtwpoi_medicalcenter_daxingyaodian", "layer_gtwpoi_medicalcenter_jijiuzhongxin"],
            "公共汽车站": ["layer_gtwpoi_transpoutation_gongjiaozhandian"],
            "地铁站": ["layer_gtwpoi_transpoutation_ditiezhan"],
            "加油站": ["layer_gtwpoi_transpoutation_jiayouzhan"],
            "学校": ["layer_gtwpoi_technologyandeducation_daxue", "layer_gtwpoi_technologyandeducation_zhongxue", "layer_gtwpoi_technologyandeducation_xiaoxue", "layer_gtwpoi_technologyandeducation_youeryuantuoersuo", "layer_gtwpoi_technologyandeducation_zhiyexuexiao"],
            "公园": ["layer_gtwpoi_tourism_zhutigongyuan"],
            "建筑物": []
        };

        //规土委图层查询
        for (var item in urlColletion) {
            for (var i = 0; i < urlColletion[item].length; i++) {
                var node = module.common.layerControl.mapLayerXml.getLayerNodeById(urlColletion[item][i]);
                //console.log(node);
                if (node) {
                    queryFeatureLayerTask(node, graphic, item);
                }
            }
        }

        //后台数据库查询
    }

    var queryFeatureLayerTask = function queryFeatureLayerTask(node, graphic, typeName) {
        var QueryTask = window.require("esri/tasks/QueryTask");
        var Query = window.require("esri/tasks/support/Query");

        var layerUrl = node.url; // Represents the REST endpoint for a layer of cities.
        var queryTask = new QueryTask({
            url: layerUrl
        });
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        //query.where = "1=1";  // Return all cities with a population greater than 1 million
        // When resolved, returns features and graphics that satisfy the query.
        query.geometry = graphic.geometry;
        query.spatialRelationship = "intersects";

        queryTask.execute(query).then(function (results) {
            //规土委图层查询结果落图
            loadGtwResultGrapicLayer(results.features, node);

            //console.log(typeName + ":" + results.features.length);

            //异步执行控制
            gtwQueryResults[typeName] += results.features.length
            gtwQueryCount++;
            //console.log(gtwQueryCount);

            if (gtwQueryCount == 16) {
                //异步执行完成后弹框
                // parent.monographicLayer.reloadSFNearByMessage(data);//弹框
                console.log(gtwQueryResults);
                console.log("执行完成");
                queryPointJsonLayerTask(graphic, gtwQueryResults);

            }
        });
    }

    /**
     * 数据库周边查询
     */
    var queryPointJsonLayerTask = function queryPointJsonLayerTask(circle, gtwQueryResults) {
        console.log(circle);

        var url = "";
        if (MapConfig.backgroundService.webType == "三防") {
            url = MapConfig.backgroundService.sanfangNearbyUrl;
        }
        else {
            url = MapConfig.backgroundService.xiaofangNearbyUrl;
        }

        var params = {
            "xmax": circle.geometry.extent.xmax,
            "xmin": circle.geometry.extent.xmin,
            "ymax": circle.geometry.extent.ymax,
            "ymin": circle.geometry.extent.ymin
        }

        /* var params = {
         "xmax": 114.10612593702315,
         "xmin": 114.02813188908938,
         "ymax": 22.576504358143502,
         "ymin": 22.50426153004216
         }*/
        //graphic.geometry.extend;
        console.log(params);

        $.ajax({
            url: url,
            type: 'GET',
            data: params,
            dataType: "json", //指定服务器返回的数据类型
            async: false,
            success: function (data) {
                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    //console.log(item);

                    if (item.data.length > 0) {
                        var pointJsonFeature = module.layerControl.common.convert.pointJsonToFeatureLayerJson(item.data, "jd", "wd");
                        //console.log(pointJsonFeature);
                        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(item.layerid);

                        if (node) {
                            //console.log(node);
                            loadPointJsonResultGrapicLayer(pointJsonFeature.graphics, node, circle);
                        }
                    }
                }
                console.log("执行弹框");

                //执行弹框
                var queryData = {
                    "gisdata": gtwQueryResults,
                    "sqldata": data
                }
                console.log(queryData);
                //周边资源统计弹框
                popuNearByDetail(queryData);
            },
            error: function (error) {
                console.log("后台附近资源查询错误:" + error);
            }
        });
        //console.log("test2");
    }

    //周边资源弹框
    var popuNearByDetail = function popuNearByDetail(queryData) {
        if (MapConfig.backgroundService.webType == "三防") {
            parent.monographicLayer.reloadSFNearByMessage(queryData);//三防
        }
        else {
            parent.monographicLayer.reloadXFNearByMessage(queryData);//消防
        }
    }


    /**
     * 数据库数据图层加载
     */
    var loadPointJsonResultGrapicLayer = function loadPointJsonResultGrapicLayer(graphics, node, circle) {
        //console.log(node.id);
        //console.log(graphics);

        var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
        var graphicsLayer = window.map.findLayerById("circleQueryResultGraphicsLayer");

        if (!graphicsLayer) {
            graphicsLayer = new GraphicsLayer({id: "circleQueryResultGraphicsLayer", title: "周边查询结果"});
        }

        for (var i = 0; i < graphics.length; i++) {
            var graphic = graphics[i];

            if (!isInCircle(graphic.geometry, circle)) {
                continue;
            }

            graphic.symbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: node.icon,
                width: "28px",
                height: "36px"
            };

            var clearResultsThisAction = {
                title: "清除",
                id: "tool_clearQueryResults",
                image: "img/layerControl/popup/search.png"
            };
            graphic.popupTemplate = {
                title: node.label,
                content: setPointJsonContentInfo,
                actions: [clearResultsThisAction]
            };

            graphicsLayer.add(graphic);
            console.log(graphic);
        }

        window.map.add(graphicsLayer);
        graphicsLayer.visible = true;
    }

//判断是否在圆内
    var isInCircle = function isInCircle(point, circle) {
        var from = turf.point([point.x, point.y]);
        var to = turf.point([circle.geometry.center.x, circle.geometry.center.y]);
        var options = {units: 'meters'};

        var distance = turf.distance(from, to, options);

        return distance < circle.geometry.radius
    }

    //信息框内容模块
    var setPointJsonContentInfo = function setPointJsonContentInfo(feature) {
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
            },
            error: function (error) {
                console.log(node.id + "图层弹框加载错误，", error.message);
            }
        });

        var html = "<div class='popup_content_div'>" +
            /*"<p>id：" + feature.graphic.attributes.id + "</p>" +*/
            htmlItem +
            " </div>";

        return html;
    }

    /**
     * 规土委周边查询结果图层加载
     */
    var loadGtwResultGrapicLayer = function loadGtwResultGrapicLayer(graphics, node) {
        //console.log(node.id);
        var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
        var graphicsLayer = window.map.findLayerById("circleQueryResultGraphicsLayer");

        if (!graphicsLayer) {
            graphicsLayer = new GraphicsLayer({id: "circleQueryResultGraphicsLayer", title: "周边查询结果"});
        }

        //清楚所有
        //graphicsLayer.removeAll();

        for (var i = 0; i < graphics.length; i++) {
            var graphic = graphics[i];

            graphic.symbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: node.icon,
                width: "28px",
                height: "36px"
            };

            var clearResultsThisAction = {
                title: "清除",
                id: "tool_clearQueryResults",
                image: "img/layerControl/popup/search.png"
            };
            graphic.popupTemplate = {
                title: node.label,
                content: setGtwGraphicContentInfo,
                actions: [clearResultsThisAction]
            };

            graphicsLayer.add(graphic);
        }
        window.map.add(graphicsLayer);
        graphicsLayer.visible = true;
    }

    /**
     * 规土委图层周边查询结果信息框内容
     */
    var setGtwGraphicContentInfo = function setGtwGraphicContentInfo(feature) {
        //console.log(feature);
        var html = "<div>" +
            "<p>要素编号：" + feature.graphic.attributes["要素编号"] + "</p>" +
            "<p>标准名称：" + feature.graphic.attributes["标准名称"] + "</p>" +
            "<p>简称：" + feature.graphic.attributes["简称"] + "</p>" +
            "<p>地址：" + feature.graphic.attributes["地址"] + "</p>" +
            "<p>主类代码：" + feature.graphic.attributes["主类代码"] + "</p>" +
            "<p>唯一ID：" + feature.graphic.attributes["唯一ID"] + "</p>" +
            // "<button onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + feature.graphic.geometry.longitude + "," + feature.graphic.geometry.latitude + ")'>" +
            // "附近资源</button>" +
            "</div>";
        //console.log(html);

        return html;
    }


    /**
     * 周边圆和查询结果图层关闭
     */
    var closeResultGrapicLayer = function closeResultGrapicLayer() {
        var circleQueryGraphicsLayer = window.map.findLayerById("circleQueryGraphicsLayer");
        var circleQueryResultGraphicsLayer = window.map.findLayerById("circleQueryResultGraphicsLayer");

        if (circleQueryGraphicsLayer) {
            circleQueryGraphicsLayer.visible = false;
        }
        if (circleQueryResultGraphicsLayer) {
            circleQueryResultGraphicsLayer.removeAll();
            circleQueryResultGraphicsLayer.visible = false;
        }
    }
    /**
     * 清除查询结果
     */
    var clearResultGrapicLayer = function clearResultGrapicLayer() {
        var circleQueryResultGraphicsLayer = window.map.findLayerById("circleQueryResultGraphicsLayer");

        if (circleQueryResultGraphicsLayer) {
            circleQueryResultGraphicsLayer.removeAll();
            circleQueryResultGraphicsLayer.visible = false;
        }
    }


    return {
        featureQueryByCircle: featureQueryByCircle,
        closeResultGrapicLayer: closeResultGrapicLayer,
        clearResultGrapicLayer: clearResultGrapicLayer
    }

}))
;


/*var layerUrl = node.url; // Represents the REST endpoint for a layer of cities.
 var queryTask = new QueryTask({
 url: layerUrl
 });
 var query = new Query();
 query.returnGeometry = true;
 query.outFields = ["*"];
 //query.where = "1=1";  // Return all cities with a population greater than 1 million
 // When resolved, returns features and graphics that satisfy the query.
 query.geometry = graphic.geometry;
 query.spatialRelationship = "intersects";

 queryTask.execute(query).then(function (results) {
 //查询结果落图
 loadResultGrapicLayer(results.features, node);
 console.log(results);

 });*/

/* var test2 = function test2(graphic) {
 var url = "https://192.168.16.240:6443/arcgis/rest/services/SZCity/SZCityComponents/MapServer/20/query";

 var params = {
 geometry: JSON.stringify(graphic.geometry.toJSON()),
 outFields: "*",
 spatialRel: "esriSpatialRelIntersects",
 geometryType: "esriGeometryPolygon",
 inSR: 4326,
 outSR: 4326
 }
 console.log(params);

 $.ajax({
 url: url,
 type: 'POST',
 data: params,
 dataType: "json", //指定服务器返回的数据类型
 async: false,
 success: function (data) {
 console.log(data);
 }
 });
 console.log("test2");
 }*/