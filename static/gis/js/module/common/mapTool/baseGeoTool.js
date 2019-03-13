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
        root.module.common = ( root.module.common ) ? root.module.common : {};
        root.module.common.mapTool = ( root.module.common.mapTool ) ? root.module.common.mapTool : {};

        root.module.common.mapTool.baseGeoTool = factory();
    }
}(this, function () {

    var getScaleByZoom = function getScaleByZoom(zoom) {

        var scales = [
            1128.497176,
            2256.994353,
            4513.988705,
            9027.977411,
            18055.954822,
            36111.909643,
            72223.819286,
            144447.638572,
            288895.277144,
            577790.554289,
            1155581.108577,
            2311162.217155,
            4622324.434309,
            9244648.868618,
            18489297.737236,
            36978595.474472,
            73957190.948944,
            147914381.897889,
            295828763.795777,
            591657527.591555
        ]

        if (zoom) {
            return scales[20 - zoom];
        }
        else {
            return 0;
        }
    }


    return {
        getScaleByZoom: getScaleByZoom
    }

}));
