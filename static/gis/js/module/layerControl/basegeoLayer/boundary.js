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
        root.module.layerControl.basegeoLayer = ( root.module.layerControl.basegeoLayer) ? root.module.layerControl.basegeoLayer : {};

        root.module.layerControl.basegeoLayer.boundary = factory();
    }
}(this, function () {
    //定义一些常量

    /**
     * 加载行政区
     */
    var layer_basegeo_boundary_qu = function layer_basegeo_boundary_qu(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var LabelClass = window.require("esri/layers/support/LabelClass");
        var MapImageLayer = window.require("esri/layers/MapImageLayer");

        var layer = window.map.findLayerById(node.id);
        if (layer == null) {
            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [227, 139, 79, 0.5],
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 1.5
                    }
                }
            };

            var popupTemplate = {
                title: node.label,
                content: "<p>名称：{name}</p>" +
                "<p>编码：{code}</p>"
            };

            var mapImageLayer = new MapImageLayer({
                url: "http://192.168.16.250:6080/arcgis/rest/services/SZCity/SZ_Area/MapServer",
                id: node.id,
                title: node.label,
                sublayers: [
                    {
                        id: 1,
                        renderer: renderer,
                        popupTemplate: popupTemplate,
                        visible: true,
                        labelsVisible: true,
                        labelingInfo: [{
                            labelExpression: "[name]",
                            labelPlacement: "always-horizontal",
                            symbol: {
                                type: "text",  // autocasts as new TextSymbol()
                                color: [255, 255, 255, 1],
                                font: {
                                    size: 14,
                                    weight: "bolder"
                                }
                            }
                        }]
                    }
                ]
            });


            var featureLayer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                renderer: renderer,
                popupTemplate: popupTemplate,
                outFields: ["*"]
            });

            // featureLayer.popupTemplate = popupTemplate;

            //window.map.add(mapImageLayer);
            window.map.add(featureLayer);

        }
        else {
            layer.visible = true;
        }
    };
    /**
     * 加载街道
     */
    var layer_basegeo_boundary_jiedao = function layer_basegeo_boundary_jiedao(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');

        var layer = window.map.findLayerById(node.id);
        if (layer == null) {
            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [227, 139, 79, 0.5],
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 1.5
                    }
                }
            };

            var popupTemplate = {
                title: node.label,
                content: "<p>名称：{name}</p>" +
                "<p>编码：{code}</p>"
            };

            var featureLayer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                renderer: renderer,
                popupTemplate: popupTemplate,
                outFields: ["*"]
            });

            // featureLayer.popupTemplate = popupTemplate;
            // featureLayer.visible = false;

            window.map.add(featureLayer);
        }
        else {
            layer.visible = true;
        }
    };

    /**
     * 加载社区
     */
    var layer_basegeo_boundary_shequ = function layer_basegeo_boundary_shequ(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');

        var layer = window.map.findLayerById(node.id);
        if (layer == null) {
            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [227, 139, 79, 0.5],
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 1
                    }
                }
            };

            var popupTemplate = {
                title: node.label,
                content: "<p>名称：{name}</p>" +
                "<p>编码：{code}</p>"
            };

            var featureLayer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                renderer: renderer,
                popupTemplate: popupTemplate,
                outFields: ["*"]
            });

            // featureLayer.popupTemplate = popupTemplate;
            // featureLayer.visible = false;

            window.map.add(featureLayer);
        }
        else {
            layer.visible = true;
        }
    };

    /**
     * 加载网格
     */
    var layer_basegeo_boundary_grid = function layer_basegeo_boundary_grid(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var MapImageLayer = window.require("esri/layers/MapImageLayer");

        var layer = window.map.findLayerById(node.id);
        if (layer == null) {
            var renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [227, 139, 79, 0.2],
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 1
                    }
                }
            };

            var popupTemplate = {
                title: node.label,
                content: "<p>名称：{name}</p>" +
                "<p>编码：{code}</p>"
            };

            var mapImageLayer = new MapImageLayer({
                url: node.url,
                id: node.id,
                title: node.label,
                sublayers: [
                    {
                        id: 4,
                        //renderer: renderer,
                        popupTemplate: popupTemplate
                    }
                ]
            });


            var featureLayer = new FeatureLayer({
                id: node.id,
                url: node.url,
                title: node.label,
                renderer: renderer,
                popupTemplate: popupTemplate,
                outFields: ["*"]
            });

            // featureLayer.popupTemplate = popupTemplate;
            // featureLayer.visible = false;
            mapImageLayer
            //window.map.add(featureLayer);
            window.map.add(mapImageLayer);

        }
        else {
            layer.visible = true;
        }
    };

    /**
     * 加载社区-安全一张图
     */
    var load_layer_basegeo_boundary_shequ_anquan = function load_layer_basegeo_boundary_shequ_anquan(layerId,filed,value) {
      var FeatureLayer = window.require('esri/layers/FeatureLayer');

      var node = module.common.layerControl.mapLayerXml.getLayerNodeById(layerId);

      var layer = window.map.findLayerById(node.id);

      if (layer == null) {
        var renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [227, 139, 79, 0],
            outline: { // autocasts as new SimpleLineSymbol()
              color: [123,194,241],//[255, 255, 255],
              width: 2
            }
          }
        };

        var featureLayer = new FeatureLayer({
          id: node.id,
          url: node.url,
          title: node.label,
          renderer: renderer,
          definitionExpression: filed+" ='" + value+"'"
          /*popupTemplate: popupTemplate,*/
          //outFields: ["*"]
        });
        //featureLayer.definitionExpression = filed+" =" + value;
        // featureLayer.popupTemplate = popupTemplate;
        // featureLayer.visible = false;

        window.map.add(featureLayer);
      }
      else {
        layer.definitionExpression =  filed +"='" + value +"'";
        layer.visible = true;
      }
    };


    return {
        layer_basegeo_boundary_qu: layer_basegeo_boundary_qu,
        layer_basegeo_boundary_jiedao: layer_basegeo_boundary_jiedao,
        layer_basegeo_boundary_shequ: layer_basegeo_boundary_shequ,
        load_layer_basegeo_boundary_shequ_anquan:load_layer_basegeo_boundary_shequ_anquan,
        layer_basegeo_boundary_grid: layer_basegeo_boundary_grid
    }
}));
