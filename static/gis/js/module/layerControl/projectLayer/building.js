/**
 *建筑物图层
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
        root.module.layerControl.projectLayer = ( root.module.layerControl.projectLayer) ? root.module.layerControl.projectLayer : {};

        root.module.layerControl.projectLayer.building = factory();
    }
}(this, function () {

    var highlight = null;

    var oldFeature = null;

    /**
     *建筑物-福田图层
     */
    var layer_project_building_buildingclassification = function layer_project_building_buildingclassification(node) {

        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var TileLayer = window.require('esri/layers/TileLayer');
        var MapImageLayer = window.require('esri/layers/MapImageLayer');
        var Color = window.require('esri/Color');

        var layer = window.map.findLayerById(node.id);
        if (layer == null) {
            var popupTemplate = {
                title: node.label,
                type: "fields",
                content: "<p>ID：{FID}</p>" +
                "<p>高度：{height}</p>"
            };

            /*layer = new MapImageLayer({
             url: node.url,
             id: node.id,0
             title: node.label,
             sublayers: [
             {
             id: 0,
             //renderer: renderer,
             popupTemplate: popupTemplate,
             }
             ]
             });*/

            layer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                //renderer: renderer,
                //popupTemplate: popupTemplate,
                outFields: ["*"]
            });

            //layer.popupTemplate = popupTemplate;
            //featureLayer.renderer = renderer;


            //window.map.add(tileLayer);
            window.map.add(layer);
        }
        else {
            layer.visible = true;
        }

        //图层点击事件
        layerMouseEvent(layer, "click", function (feature) {
            console.log(feature);
            parent.DX_sqztfw.popAction(node.id, feature.attributes.FID);
        });

        console.log(node.label + "图层加载完成");
    }

    /**
     *图层鼠标事件
     */
    var layerMouseEvent = function layerMouseEvent(layer, tiggerType, callback) {
        var mapView = window.mapView;

        mapView.whenLayerView(layer).then(function (layerView) {
            mapView.on(tiggerType, function (event) {
                mapView.hitTest(event)
                    .then(function (response) {

                        //console.log(response);
                        // console.log(layerView);
                        //console.log(layer);

                        // remove the previous highlight
                        if (highlight) {
                            highlight.remove();
                            highlight = null;
                        }

                        // if a feature is returned, highlight it
                        // and display its attributes in the popup
                        // if no features are returned, then close the popup
                        var id = null;

                        if (response.results.length) {
                            var feature = response.results.filter(function (result) {
                                return result.graphic.layer === layer;
                            })[0].graphic;
                            id = feature.attributes.FID;
                            highlight = layerView.highlight(feature);
                            // console.log(layer);
                            // console.log(highlight);

                            callback(feature);
                        } else {

                        }
                    });
            });
        });
    }

    /**
     *隐患点
     */
    var layer_project_building_dangerpoint = function layer_project_building_dangerpoint(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var getAllDataUrl = node.url + "/selectByExample" + ((node.query == null) ? "" : node.query);
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
                    width: "28px",
                    height: "36px"
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
                layer = new FeatureLayer({
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

                layer.renderer = renderer;
                //featureLayer.popupTemplate = popupTemplate;

                window.map.add(layer);
            }
            else {
                layer.visible = true;
            }

            //点击事件
            layerMouseEvent(layer, "click", function (feature) {
                console.log(feature);
                parent.DX_sqztfw.popAction(node.id, feature.attributes.id);
            });

            console.log(node.label + "图层加载完成");

        }).otherwise(function (error) {
            console.log(node.id + "图层加载错误，", error.message);
        });
    }

    //信息框内容模块
    var setPointJsonContentInfo = function setPointJsonContentInfo(feature) {
        //console.log(feature);

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
        // console.log(pointLocal);

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
     *消防栓
     */
    var layer_project_building_firehydrant = function layer_project_building_firehydrant(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var getAllDataUrl = node.url + "/selectByExample" + ((node.query == null) ? "" : node.query);
        var options = {responseType: 'json'};

        requestJsonData(getAllDataUrl, options).then(function (response) {
            //  console.log(response);
            var data = response.data;
            // do something useful
            var esriFeatureJson = module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");

            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                    url: node.icon,
                    width: "28px",
                    height: "38px"
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

    var setContentInfo_project_building_firehydrant = function setContentInfo_project_building_firehydrant(feature) {
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
     * 风险点
     */
    var layer_project_building_warning = function layer_project_building_warning(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var getAllDataUrl = node.url + "/selectByExample" + ((node.query == null) ? "" : node.query);
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
                    width: "640px",
                    height: "402px"
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
                layer = new FeatureLayer({
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

                layer.renderer = renderer;
                //featureLayer.popupTemplate = popupTemplate;

                window.map.add(layer);
            }
            else {
                layer.visible = true;
            }

            //点击事件
            layerMouseEvent(layer, "click", function (feature) {
                console.log(feature);
                parent.DX_sqztfw.popAction(node.id, feature.attributes.id);
            });

            console.log(node.label + "图层加载完成");

        }).otherwise(function (error) {
            console.log(node.id + "图层加载错误，", error.message);
        });

    }

    var setContentInfo_project_building_warning = function setContentInfo_project_building_warning(feature) {
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
        layer_project_building_buildingclassification: layer_project_building_buildingclassification,
        layer_project_building_dangerpoint: layer_project_building_dangerpoint,
        layer_project_building_firehydrant: layer_project_building_firehydrant,
        layer_project_building_warning: layer_project_building_warning
    }

}));
