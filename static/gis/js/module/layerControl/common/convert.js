
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
        root.module.layerControl.common = ( root.module.layerControl.common) ? root.module.layerControl.common : {};

        root.module.layerControl.common.convert = factory();
    }
}(this, function () {
    var pointJsonToFeatureLayerJson = function pointJsonToFeatureLayerJson(jsonData, x, y) {
        var Point = window.require("esri/geometry/Point");

        //graphics
        /*var graphics = jsonData.map(function (feature, i) {
         feature.ObjectID = i;

         if (!feature[x]) {
         return {
         geometry: new Point({
         x: feature[x],
         y: feature[y]
         }),
         attributes: feature
         };
         }
         });*/

        var graphics = [];
        for (var i = 0; i < jsonData.length; i++) {
            var feature = jsonData[i];
            //console.log(feature);

            feature.ObjectID = i;

            if (feature[x].length > 0 && feature[y].length > 0) {
                var point = new Point({
                    x: feature[x],
                    y: feature[y],
                    spatialReference: MapConfig.mapInitParams.spatialReference.wkid
                });

                var obj = {
                    geometry: point,
                    attributes: feature
                };
                graphics.push(obj);
                // console.log(feature);
            }
        }

        //fields
        var fields = getFeatureFields(jsonData[0]);

        return {
            graphics: graphics,
            fields: fields
        };
    }

    var getFeatureFields = function getFeatureFields(data) {
        var fields = [
            {
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            }];
        for (var name in  data) {
            if (name == "ObjectID")
                continue;
            var filed = {
                name: name,
                alias: name,
                type: "string"
            }
            fields.push(filed);
        }
        return fields;
    }

    return {
        pointJsonToFeatureLayerJson: pointJsonToFeatureLayerJson,
        getFeatureFields: getFeatureFields
    }

}));
