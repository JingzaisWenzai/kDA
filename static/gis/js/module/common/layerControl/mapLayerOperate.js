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
        root.module.common = ( root.module.common ) ? root.module.common : {};
        root.module.common.layerControl = ( root.module.common.layerControl ) ? root.module.common.layerControl : {};

        root.module.common.layerControl.mapLayerOperate = factory();
    }
}(this, function () {
    var loadSingleLayerById = function loadSingleLayerById(layerId) {
        var layerNode = module.common.layerControl.mapLayerXml.getLayerNodeById(layerId);
        if (layerNode) {
            module.common.layerControl.mapLayerXml.loadLayer(layerNode);
        }
        else {
            console.log(layerId + "图层不存在");
        }
    }
    var loadSingleLayerByNode = function loadSingleLayerByNode(layerNode) {
        if (layerNode) {
            module.common.layerControl.mapLayerXml.loadLayer(layerNode);
        }
        else {
            console.log("Node图层加载错误");
        }
    }
    var loadGroupLayerById = function loadGroupLayerById(groupId) {
        var layerNode = module.common.layerControl.mapLayerXml.getLayerNodeById(groupId);
        module.common.layerControl.mapLayerXml.loadAllChildLayer(layerNode);
    }
    var closeSingleLayerById = function closeSingleLayerById(layerId) {
        var layerNode = module.common.layerControl.mapLayerXml.getLayerNodeById(layerId);
        console.log(layerNode);
        module.common.layerControl.mapLayerXml.closeLayer(layerNode);
    }
    var removeSingleLayerById = function removeSingleLayerById(layerId) {
        var layerNode = module.common.layerControl.mapLayerXml.getLayerNodeById(layerId);
        //console.log(layerNode);
        module.common.layerControl.mapLayerXml.removeLayer(layerNode);
    }
    var removeAllLayer = function removeAllLayer() {
      window.map.removeAll();
    }
    var closeGroupLayerById = function loadGroupLayerById(groupId) {
        var layerNode = module.common.layerControl.mapLayerXml.getLayerNodeById(groupId);
        console.log(layerNode);
        module.common.layerControl.mapLayerXml.closeAllChildLayer(layerNode);
    }
     var copyLayerNode= function copyLayerNode(obj){
        var newobj = {};
        for ( var attr in obj) {
          newobj[attr] = obj[attr];
        }
        return newobj;
      }
    var getAllLayerInfo= function getAllLayerInfo(){
      var layers = window.map.layers;

      var layerInfo=[];
      for (var i = 0; i < layers.length; i++) {
        var layer = layers.items[i];
        var layerInfoTemp={
          Id:layer.id,
          Label:layer.title
        }
        layerInfo.push(layerInfoTemp);
      }

      //console.log(layerIds)
      return layerInfo;
    }

  return {
        loadSingleLayerById: loadSingleLayerById,
        loadSingleLayerByNode: loadSingleLayerByNode,
        loadGroupLayerById: loadGroupLayerById,
        closeSingleLayerById: closeSingleLayerById,
        removeSingleLayerById: removeSingleLayerById,
        closeGroupLayerById: closeGroupLayerById,
        copyLayerNode:copyLayerNode,
        removeAllLayer: removeAllLayer,
        getAllLayerInfo:getAllLayerInfo
    }
}));
