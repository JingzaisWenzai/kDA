/**
 *基础地图图层
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
    root.module = (root.module) ? root.module : {};
    root.module.layerControl = (root.module.layerControl) ? root.module.layerControl : {};
    root.module.layerControl.basegeoLayer = (root.module.layerControl.basegeoLayer) ? root.module.layerControl.basegeoLayer : {};

    root.module.layerControl.basegeoLayer.baseMap = factory();
  }
}(this, function () {
  //定义一些常量

  var baseMapStyleType = "dark";//normal

  /**
   * 加载规土委二维电子图
   * @param aa
   * @param bb
   * @returns {*[]}
   */
  var layer_gtw_basemap = function layer_gtw_basemap(node) {
    /*  window.require(['esri/Map', 'esri/views/MapView'], (Map, MapView) => {
     console.log(MapView);

     });*/
    var MapImageLayer = window.require('esri/layers/MapImageLayer');

    var layer = window.map.findLayerById(node.id);
    if (layer == null) {
      var imageLayer = new MapImageLayer({
        id: node.id,
        title: node.label,
        url: node.url
      });

      window.map.add(imageLayer);
    }
    else {
      layer.visible = true;
    }
  };
  /**
   * 加载规土委二维卫星影像
   * @param aa
   * @param bb
   * @returns {*[]}
   */
  var layer_gtw_baseimage = function layer_gtw_baseimage(node) {
    console.log("layer_gtw_baseimage" + node.label);
  };

  /**
   * 加载arcgis切片作为底图
   * @param aa
   * @param bb
   * @returns {*[]}
   */
  var layer_arcgis_tilelayer = function layer_arcgis_tilelayer(node) {
    var TileLayer = window.require('esri/layers/TileLayer');
    var Basemap = window.require('esri/Basemap');

    var tileLayer = new TileLayer({
      id: node.id,
      title: node.label,
      url: node.url
    });

    var basemap = new Basemap({
      baseLayers: [tileLayer],
      title: node.label,
      id: node.id + "_basemap"
    });

    window.map.basemap = basemap;

    console.log(node.label + "图层加载完成");
  };


  /**
   * 加载福田地图切片作为底图
   * @param aa
   * @param bb
   * @returns {*[]}
   */
  var layer_arcgis_tilelayer_futianBaseMap_load = function layer_arcgis_tilelayer_futianBaseMap_load(nodeId) {
    var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId + "_" + baseMapStyleType);

    layer_arcgis_tilelayer(node);
  }

  /**
   * 切换福田地图切片作为底图
   * @param aa
   * @param bb
   * @returns {*[]}
   */
  var layer_arcgis_tilelayer_futianBaseMap_toggle = function layer_arcgis_tilelayer_futianBaseMap_toggle(index) {
    console.log(index)
    if (index == 0) {
      if (baseMapStyleType == "normal") {
        baseMapStyleType = "dark";
        var nodeId = window.map.basemap.baseLayers.items[0].id.replace(/normal/, "");
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId + baseMapStyleType);
        layer_arcgis_tilelayer(node);
      }
    }
    else if (index == 1) {
      if (baseMapStyleType == "dark") {
        baseMapStyleType = "normal";
        var nodeId = window.map.basemap.baseLayers.items[0].id.replace(/dark/, "");
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId + baseMapStyleType);
        layer_arcgis_tilelayer(node);
      }
    }

  }

  return {
    layer_gtw_basemap: layer_gtw_basemap,
    layer_gtw_baseimage: layer_gtw_baseimage,
    layer_arcgis_tilelayer: layer_arcgis_tilelayer,
    layer_arcgis_tilelayer_futianBaseMap_load: layer_arcgis_tilelayer_futianBaseMap_load,
    layer_arcgis_tilelayer_futianBaseMap_toggle: layer_arcgis_tilelayer_futianBaseMap_toggle
  }

}));
