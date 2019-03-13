
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
        root.module.layerControl.basegeoLayer = ( root.module.layerControl.basegeoLayer) ? root.module.layerControl.basegeoLayer : {};

        root.module.layerControl.basegeoLayer.data = factory();
    }
}(this, function () {
//定义一些常量
    var layer_basegeo_data_building = function layer_basegeo_data_building(node) {
        var FeatureLayer = window.require('esri/layers/FeatureLayer');
        var TileLayer = window.require('esri/layers/TileLayer');
        var MapImageLayer = window.require('esri/layers/MapImageLayer');

        var layer = window.map.findLayerById(node.id);
        if (layer == null) {
            var popupTemplate = {
                title: node.label,
                content: "<p>ID：{name}</p>" +
                "<p>编码：{code}</p>"
            };

            var tileLayer = new TileLayer({
                id: node.id,
                url: node.url,
                title: node.label
            });

            var mapImageLayer = new MapImageLayer({
                url: node.url,
                id: node.id,
                title: node.label,
                sublayers: [
                    {
                        id: 0,
                        //renderer: renderer,
                        popupTemplate: popupTemplate
                    }
                ]
            });


            //window.map.add(tileLayer);
            window.map.add(mapImageLayer);
        }
        else {
            layer.visible = true;
        }
    }


    return {
        layer_basegeo_data_building: layer_basegeo_data_building
    }
}));
