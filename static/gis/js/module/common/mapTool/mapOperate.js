/**
 *地图图层操作
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
        root.module.common = (root.module.common) ? root.module.common : {};
        root.module.common.mapTool = (root.module.common.mapTool) ? root.module.common.mapTool : {};

        root.module.common.mapTool.mapOperate = factory();
    }
}(this, function () {

    var baseMapToggleEvent = function baseMapToggleEvent(index) {

        if (index == 0) {           /*0是深色地图*/
            baseMapToggle("normBasemap");

            document.getElementById("normalToggleDiv").setAttribute("class", "activeMapImage");
            document.getElementById("imgToggleDiv").setAttribute("class", "");
        }
        if (index == 1) {           /*0是浅色地图*/
            baseMapToggle("imgBasemap");

            document.getElementById("normalToggleDiv").setAttribute("class", "");
            document.getElementById("imgToggleDiv").setAttribute("class", "activeMapImage");
        }
          if(parent.$nuxt){
            parent.$nuxt.$store.state.mapType =index;
            parent.$nuxt.$store.state.addressStreet = '福田区';
          }
    }


    /**
     * 地图底图切换
     * normBasemap,imgBasemap
     */
    var baseMapToggle = function baseMapToggle(baseMap) {

        var TileLayer = window.require('esri/layers/TileLayer');
        var Basemap = window.require('esri/Basemap');

        if (baseMap == "normBasemap") {
            if (MapConfig.currentWkid == 4490) {
                var normBasemap = getNormBasemap();
            }
            else {
                var normBasemap = getNormTDBasemap();
            }

            window.map.basemap = normBasemap;
        }
        else if (baseMap == "imgBasemap") {
            if (MapConfig.currentWkid == 4490) {
                var imgBasemap = getImgBasemap();
            }
            else {
                var imgBasemap = getImgTDBasemap();
            }

            window.map.basemap = imgBasemap;
        }
    }

    /**
     *电子底图
     */
    var getNormBasemap = function getNormBasemap() {

        var TileLayer = window.require('esri/layers/TileLayer');
        var Basemap = window.require('esri/Basemap');

        //基础电子底图
        var normBaseLayer = new TileLayer({
            url: MapConfig.normMap.Url,
            id: "layer_arcgis_basemap_futainqu_dark"
        });

        var normBasemap = new Basemap({
            baseLayers: [normBaseLayer],
            title: "电子底图",
            id: "normBasemap"
        });

        return normBasemap;
    }

    /**
     *影像底图
     */
    var getImgBasemap = function getImgBasemap() {

        var TileLayer = window.require('esri/layers/TileLayer');
        var Basemap = window.require('esri/Basemap');

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

        return imgBasemap;
    }

    /**
     *天地图电子地图
     */
    var getNormTDBasemap = function getNormTDBasemap() {

        var WebTileLayer = window.require('esri/layers/WebTileLayer');
        var Basemap = window.require('esri/Basemap');

        var tdBaseTileMap = new WebTileLayer({
            urlTemplate: "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=80b4a531b6517edd87099466fcd83fd3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图矢量"/*,
             spatialReference: {
             wkid: 4490
             }*/
        });

        var tdLabelTileMap = new WebTileLayer({
            urlTemplate: "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=80b4a531b6517edd87099466fcd83fd3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图注记"/*,
             spatialReference: {
             wkid:4490
             }*/
        });


        var normTDBasemap = new Basemap({
            baseLayers: [tdBaseTileMap, tdLabelTileMap],
            title: "天地图矢量",
            id: "normBaseTDMap"
        });


        return normTDBasemap;
    }

    /**
     *天地图影像
     */
    var getImgTDBasemap = function getImgTDBasemap() {

        var WebTileLayer = window.require('esri/layers/WebTileLayer');
        var Basemap = window.require('esri/Basemap');

        var tdImgTileMap = new WebTileLayer({
            urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图影像"
        });

        var tdLabelTileMap = new WebTileLayer({
            urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=cva_w&x={col}&y={row}&l={level}",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图注记"
        });

        var imgTDBasemap = new Basemap({
            baseLayers: [tdImgTileMap, tdLabelTileMap],
            title: "天地图影像",
            id: "imgBaseTDMap"
        });

        return imgTDBasemap;
    }


    /**
     * 设置地图中心点
     */
    var setMapViewCenter = function setMapViewCenter(lng, lat) {
        var Point = require("esri/geometry/Point")

        window.mapView.center = new Point({
            x: lng,
            y: lat,
            spatialReference: MapConfig.mapInitParams.spatialReference.wkid
        });
    }

    /**
     * 设置地图缩放级别
     */
    var setMapViewZoom = function setMapViewZoom(zoom) {
        window.mapView.zoom = zoom;
    }

    /**
     * 地图图层鼠标悬浮事件
     */
    var currentId = ''
    var mouseOverHandle;

    var mouseOver = function(featureId, graphic) {
      console.log('over')
      mouseOverHandle = setTimeout(function() {
        if (currentId == featureId) {
          console.log(featureId + '悬浮1秒才触发')
          //mapView.popup.close();
          //module.layerControl.basegeoLayer.featureMapFutian.mapViewOpenSamplePopup(graphic);
          module.layerControl.basegeoLayer.featureMapFutian.openFeatureLayerPopup(graphic.layer.id,graphic.attributes.id)
          console.log(graphic);
          /* mapView.popup.open({
             features: [graphic],
             updateLocationEnabled:true
           });*/
          //callback(graphic)
        }
      }, 1000)
    }

    var mouseLeave = function() {
      console.log('leave')
      clearTimeout(mouseOverHandle)
    }

    var mapMouseOverEevent = function mapMouseOverEevent() {//layerid, callback
      console.log("aaaa")
      window.mapView.on('pointer-move', function(event) {
        window.mapView.hitTest(event)
          .then(function(response) {

            var graphics = response.results.filter(function(result) {
              return result.graphic.layer.id == 'layer_keyinformation_realtimevideo_gonganshipin'
            })//[0].graphic

            //over
            if (graphics.length > 0) {
              //document.getElementById("popupTest").style.display=none;
              var graphic = graphics[0].graphic

              //单点不重复
              if (currentId != graphic.attributes.id) {
                mouseOver(graphic.attributes.id, graphic)
                currentId = graphic.attributes.id
              }
              else { //单点重复
                return
              }
            }
            else {//leave
              mouseLeave()
              currentId = ''
            }
            //console.log(graphic.attributes.id);
          })
      })
    }


    return {
        baseMapToggle: baseMapToggle,
        baseMapToggleEvent: baseMapToggleEvent,
        getNormBasemap: getNormBasemap,
        getImgBasemap: getImgBasemap,
        getNormTDBasemap: getNormTDBasemap,
        getImgTDBasemap: getImgTDBasemap,
        setMapViewCenter: setMapViewCenter,
        setMapViewZoom: setMapViewZoom,
        mapMouseOverEevent:mapMouseOverEevent
    }
}));
