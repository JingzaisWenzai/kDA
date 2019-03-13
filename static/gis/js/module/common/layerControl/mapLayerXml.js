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

        root.module.common.layerControl.mapLayerXml = factory();
    }
}(this, function () {

    var alllayerNode = null;
    var temLayerNode = null;

    var getAllLayerNode = function getAllLayerNode() {
        if (!alllayerNode) {
            getAllMapLayer();
        }
        return alllayerNode;
    }

    var getLayerNodeById = function getLayerNodeById(layerId) {
        getAllLayerNode();

        getLayerNodeRec(alllayerNode, layerId);

        var layerNode = temLayerNode;
        temLayerNode = null;

        if (layerNode == null) {
            console.log(layerId + "图层未找到")
        }

        return layerNode;
    }

    var getLayerNodeRec = function getLayerNodeRec(node, layerId) {
        for (var i = 0; i < node.length; i++) {
            var item = node[i];

            if (item.id == layerId) {
                temLayerNode = item;
            }
            else {
                if (item.nodes) {
                    getLayerNodeRec(item.nodes, layerId);
                }
            }
        }
    }

    var loadLayer = function loadLayer(node) {
        // console.log(node.function);
        var fn = eval(node.function + "(node)");
      module.layerControl.futianLayer.base.layer_futian_base_iot
    }

    var closeLayer = function closeLayer(node) {
        var layer = window.map.findLayerById(node.id);
        if (layer) {
            layer.visible = false;
        }
    }

    var removeLayer = function removeLayer(node) {
        var layer = window.map.findLayerById(node.id);
        if (layer) {
            window.map.remove(layer);
        }
    }

    function loadAllChildLayer(node) {
        for (var i = 0; i < node.nodes.length; i++) {
            var item = node.nodes[i];
            if (item.nodes) {
                loadAllChildLayer(item);
            }
            else {
                loadLayer(item);
            }
        }
    }

    function closeAllChildLayer(node) {
        for (var i = 0; i < node.nodes.length; i++) {
            var item = node.nodes[i];
            if (item.nodes) {
                closeAllChildLayer(item);
            }
            else {
                closeLayer(item);
            }
        }
    }

    var getAllMapLayer = function getAllMapLayer() {
        var xmlJson = {};
        $.ajax({
            headers: {
              token: module.common.layerControl.mapNet.getCookieByName("Admin-Token")
            },
            type: "GET",
            url: MapConfig.mapXmlUrl,  //"config/mapconfig.xml",
            //dataType: "xml",
            async: false,
            success: function (data) {
              module.common.layerControl.mapNet.checkLogin(data);//token登录校验

                $(data).find("Map").each(function () {
                    data = xmlToJson($(this).children());
                });
                xmlJson = data;
            },
            error: function () {
              console.log("图层配置文件加载失败");
            }
        });
        alllayerNode = xmlJson;
        return alllayerNode;
    };

    var xmlToJson = function (nodes) {
        var itemList = new Array();
        $.each(nodes, function () {
            var entity = {};
            var obj = $(this);
            entity.label = obj[0].getAttribute("label");
            entity.id = obj[0].getAttribute("id");
            //entity.text = obj[0].getAttribute("label");
            //entity.href = '#parent1';
            // entity.tags = ['0'];

            if (obj[0].hasChildNodes()) {
                entity.nodes = xmlToJson(obj.children());
            }
            else {
                entity.table = obj[0].getAttribute("table");
                entity.pid = obj[0].getAttribute("pid");
                entity.type = obj[0].getAttribute("type");
                entity.show = obj[0].getAttribute("show");
                entity.bm = obj[0].getAttribute("bm");
                entity.function = obj[0].getAttribute("function");
                entity.url = obj[0].getAttribute("url");
                entity.gisUrl = obj[0].getAttribute("gisUrl");
                entity.query = obj[0].getAttribute("query");
                entity.icon = obj[0].getAttribute("icon");
                entity.iconArray = obj[0].getAttribute("iconArray");
                entity.iconsize = obj[0].getAttribute("iconsize");
                entity.minZoom = obj[0].getAttribute("minZoom");
                entity.maxZoom = obj[0].getAttribute("maxZoom");
                entity.weightField = obj[0].getAttribute("weightField");//热力图，权重字段
                entity.maxPixelIntensity = obj[0].getAttribute("maxPixelIntensity");//热力图，最大像素强度
                entity.lineColor = obj[0].getAttribute("lineColor");
                entity.lineWidth = obj[0].getAttribute("lineWidth");
                entity.lineStyle = obj[0].getAttribute("lineStyle");
                entity.fillColor = obj[0].getAttribute("fillColor");
                entity.outlineColor = obj[0].getAttribute("outlineColor");
                entity.outlineWidth = obj[0].getAttribute("outlineWidth");
                entity.outlineStyle = obj[0].getAttribute("outlineStyle");
            }
            itemList.push(entity);
        });
        return itemList;
    };

    return {
        getLayerNodeById: getLayerNodeById,
        getAllLayerNode: getAllLayerNode,
        loadLayer: loadLayer,
        closeLayer: closeLayer,
        removeLayer: removeLayer,
        loadAllChildLayer: loadAllChildLayer,
        closeAllChildLayer: closeAllChildLayer
    }
}));
