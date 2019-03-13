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
    root.module.layerQuery = (root.module.layerQuery) ? root.module.layerQuery : {};

    root.module.layerQuery.featureNearbyQuery = factory();
  }
}(this, function () {

    var gtwQueryResults = {};
    var gtwQueryCount = 0;

    var featureQueryByCircle = function featureQueryByCircle(graphic) {
      var QueryTask = window.require("esri/tasks/QueryTask");
      var Query = window.require("esri/tasks/support/Query");

      gtwQueryResults = {
        "街道办事处": [],
        "社区工作站": [],
        "银行": [],
        "知名企事业": [],   // "建筑物": [],

        "公交车站": [],
        "地铁站": [],
        "道路交叉口": [],
        "加油站": [],

        "公园": [],
        "自然景点": [],
        "学校": [],
        "综合商场": [],
        "餐厅": [],
        "医院": [],
        "港口": [],

        "邮政": [],
        "公共厕所": [],
        "电信": [],
        "供电": []
      };
      // {layerid: "", data: [], count: 0}
      gtwQueryCount = 0;

      var urlColletion = {
        "街道办事处": ["layer_gtwpoi_goverment_jiedaobanshiqu"],
        "社区工作站": ["layer_gtwpoi_govermentshequgongzuozhan"],
        "银行": ["layer_gtwpoi_financialcenter_yinhang"],
        "知名企事业": ["gtwpoi_otherfacilities"],

        //"建筑物": ["layer_basegeo_data_building_builds"],

        "公交车站": ["layer_gtwpoi_transpoutation_gongjiaozhandian"],
        "地铁站": ["layer_gtwpoi_transpoutation_ditiezhan"],

        "道路交叉口": ["layer_gtwpoi_transpoutation_daolujiaochakou"],
        "加油站": ["layer_gtwpoi_transpoutation_jiayouzhan"],
        "港口": ["layer_gtwpoi_transpoutation_gangkou"],

        "公园": ["layer_gtwpoi_tourism_zhutigongyuan"],
        "自然景点": ["layer_gtwpoi_tourism_ziyuanjingdian"],
        "学校": ["layer_gtwpoi_technologyandeducation_daxue", "layer_gtwpoi_technologyandeducation_zhongxue", "layer_gtwpoi_technologyandeducation_xiaoxue", "layer_gtwpoi_technologyandeducation_youeryuantuoersuo", "layer_gtwpoi_technologyandeducation_zhiyexuexiao"],
        "综合商场": ["layer_gtwpoi_shoppingmall_zongheshangchang"],
        "餐厅": ["layer_gtwpoi_chainrestaurant_zhongcanting"],
        "医院": ["layer_gtwpoi_medicalcenter_zongheyiyuan", "layer_gtwpoi_medicalcenter_zhuankeyiyuan", "layer_gtwpoi_medicalcenter_zhongyiyuan", "layer_gtwpoi_medicalcenter_shequweishengzhongxin", "layer_gtwpoi_medicalcenter_dulimenzhen", "layer_gtwpoi_medicalcenter_daxingyaodian", "layer_gtwpoi_medicalcenter_jijiuzhongxin"],

        "邮政": ["layer_gtwpoi_telecommunication_youzheng"],
        "公共厕所": ["layer_gtwpoi_publicservice_gongce"],
        "电信": ["layer_gtwpoi_telecommunication_dianxing"],
        "供电": ["layer_gtwpoi_mulicipalnode_gongdian"]
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
        //loadGtwResultGrapicLayer(results.features, node);

        //异步执行控制
        //gtwQueryResults[typeName] += results.features.length
        var layer = {layerid: node.id, data: results.features, count: results.features.length};

        gtwQueryResults[typeName].push(layer);
        //console.log(gtwQueryResults);

        gtwQueryCount++;
        //console.log(gtwQueryCount);

        if (gtwQueryCount == 19) {
          //异步执行完成后弹框
          // parent.monographicLayer.reloadSFNearByMessage(data);//弹框
          console.log(gtwQueryResults);
          console.log("arcgis图层查询完成");
          console.log(graphic);
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
      /* if (MapConfig.backgroundService.webType == "三防") {
       url = MapConfig.backgroundService.sanfangNearbyUrl;
       }
       else {
       url = MapConfig.backgroundService.xiaofangNearbyUrl;
       }*/
      url = MapConfig.backgroundService.commonNearbyUrl;

      var circleJson = circle.toJSON();
      var params = {
        "geometry": JSON.stringify(circleJson.geometry)
      }

      // console.log(params);

      $.ajax({
        url: url,
        type: 'GET',
        data: params,
        dataType: "json", //指定服务器返回的数据类型
        async: false,
        success: function (data) {
          //console.log(data);
          //for (var i = 0; i < data.length; i++) {
          // var item = data[i];
          //console.log(item);

          // if (item.data.length > 0) {
          //var pointJsonFeature = module.layerControl.common.convert.pointJsonToFeatureLayerJson(item.data, "jd", "wd");
          //console.log(pointJsonFeature);
          //  var node = module.common.layerControl.mapLayerXml.getLayerNodeById(item.layerid);

          //if (node) {
          //console.log(node);
          //数据库落图
          //loadPointJsonResultGrapicLayer(pointJsonFeature.graphics, node);
          //  }
          //  }
          // }
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
    var loadPointJsonResultGrapicLayer = function loadPointJsonResultGrapicLayer(data, node) {
      //console.log(node.id);
      //console.log(graphics);

      var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
      var graphicsLayer = window.map.findLayerById("circleQueryResultGraphicsLayer");

      //数据转换为几何对象
      var esriFeatureJson = module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");
      var graphics = esriFeatureJson.graphics;

      if (!graphicsLayer) {
        graphicsLayer = new GraphicsLayer({id: "circleQueryResultGraphicsLayer", title: "周边查询结果"});
      }

      for (var i = 0; i < graphics.length; i++) {
        var graphic = graphics[i];

        graphic.symbol = {
          type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
          url: node.icon,
          width: (node.iconsize) ? node.iconsize.split(",")[0] : "26" + "px",
          height: (node.iconsize) ? node.iconsize.split(",")[1] : "36" + "px"
        };

        graphic.popupTemplate = {
          title: node.label,
          content: setPointJsonContentInfo
        };

        graphicsLayer.add(graphic);
      }

      window.map.add(graphicsLayer);
      graphicsLayer.visible = true;
    }

    //信息框内容模块--旧版
    var setPointJsonContentInfo = function setPointJsonContentInfo(feature) {
      //console.log(feature);
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

      //var htmlUrl = "../gis/js/module/layerInfoWindow/base/basePopupTemplate.html?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id;

      var htmlUrlParams = "?nodeId=" + node.id + "&featureId=" + feature.graphic.attributes.id + "&longitude=" + pointLocal.x + "&latitude=" + pointLocal.y;

      var html = "<div style='width: 260px;height: 293px;overflow:hidden;'>" +
        "<iframe src='../gis/js/module/layerInfoWindow/base/futianBasePop.html" + htmlUrlParams + "'  style='width:100%;height:100%; border: 1px solid #196db4;background-color: #032335;' scrolling='no'></iframe>" +
        "</div>";

      return html;
    }

    /**
     * 数据库数据图层加载--旧版
     */
    var loadPointJsonResultGrapicLayer_old = function loadPointJsonResultGrapicLayer_old(graphics, node) {
      //console.log(node.id);
      //console.log(graphics);

      var GraphicsLayer = window.require("esri/layers/GraphicsLayer");
      var graphicsLayer = window.map.findLayerById("circleQueryResultGraphicsLayer");

      if (!graphicsLayer) {
        graphicsLayer = new GraphicsLayer({id: "circleQueryResultGraphicsLayer", title: "周边查询结果"});
      }

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
          content: setPointJsonContentInfo,
          actions: [clearResultsThisAction]
        };

        graphicsLayer.add(graphic);
        //console.log(graphic);
      }

      window.map.add(graphicsLayer);
      graphicsLayer.visible = true;
    }


    //信息框内容模块--旧版
    var setPointJsonContentInfo_old = function setPointJsonContentInfo_old(feature) {
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
      //var circleQueryResultGraphicsLayer = window.map.findLayerById("circleQueryResultGraphicsLayer");

      if (circleQueryGraphicsLayer) {
        circleQueryGraphicsLayer.visible = false;
      }
      /* if (circleQueryResultGraphicsLayer) {
         circleQueryResultGraphicsLayer.removeAll();
         circleQueryResultGraphicsLayer.visible = false;
       }*/
      removePointJsonCircleSearchResultLayer();

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


    /***************************************************周边搜索图层加载*********************************************/
    var loadPointJsonLayerByCircleSearch = function loadPointJsonLayerByCircleSearch(nodeId, lng, lat, range) {

      //绘制周边圆形图层
      module.layerControl.common.loadUtil.drawCirleQuery(lng, lat, range);

      //搜索图层加载
      var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId);
      var newNode = module.common.layerControl.mapLayerOperate.copyLayerNode(node);

      newNode.id += "_CircleSearchResultLayer";
      newNode.label += "-周边搜索";
      newNode.url = MapConfig.nearbySearchUrl;
      newNode.query = "&tableName=" + newNode.table + "&jd=" + lng + "&wd=" + lat + "&range=" + range / 1000;
      //http://10.192.19.107:8081/search/near/layer/selectByExample?tableName=BJ0301&jd=114.09462820727758&wd=22.54998918105337&range=1

      //预先移除图层
      var layer = window.map.findLayerById(newNode.id);
      if (layer) {
        window.map.remove(layer);
      }
      module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(newNode);
    }

    /**
     * 清除周边查询图层
     */
    var removePointJsonCircleSearchResultLayer = function removePointJsonCircleSearchResultLayer() {

      var allLayer = window.map.allLayers.filter(function (layer) {
        return layer.id.indexOf("_CircleSearchResultLayer") > 0;
      });

      for (var i = 0; i < allLayer.length; i++) {
        var layer = allLayer.items[i];
        window.map.remove(layer);
      }
    }

    /**
     * 打开单个单点查询图层
     */
    var openPointJsonCircleSearchResultLayer = function openPointJsonCircleSearchResultLayer(layerId) {
      var layer = window.map.findLayerById(layerId+"_CircleSearchResultLayer")
      if(layer){
        layer.visible=true;
      }
    }

    /**
     * 关闭单个单点查询图层
     */
    var closePointJsonCircleSearchResultLayer = function closePointJsonCircleSearchResultLayer(layerId) {
      var layer = window.map.findLayerById(layerId+"_CircleSearchResultLayer")
      if(layer){
        layer.visible=false;
      }
    }

    /***************************************************搜索单点图层加载*********************************************/
    var loadSinglePointJsonLayerBySearch = function loadSinglePointJsonLayerBySearch(nodeId, id) {
      //搜索图层加载
      var node = module.common.layerControl.mapLayerXml.getLayerNodeById(nodeId);
      var newNode = module.common.layerControl.mapLayerOperate.copyLayerNode(node);

      newNode.id += "_SinglePointSearchResultLayer";
      newNode.label += "-单点搜索";
      newNode.query = "&id=" + id;

      //预先移除图层
      var layer = window.map.findLayerById(newNode.id);
      if (layer) {
        window.map.remove(layer);
      }
      module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(newNode);
    }

    /**
     * 清除单点查询图层
     */
    var removeSinglePointSearchResultLayer = function removeSinglePointSearchResultLayer() {
      var allLayer = window.map.allLayers.filter(function (layer) {
        return layer.id.indexOf("_SinglePointSearchResultLayer") > 0;
      });

      for (var i = 0; i < allLayer.length; i++) {
        var layer = allLayer.items[i];
        window.map.remove(layer);
      }
    }


  return {
      featureQueryByCircle: featureQueryByCircle,
      loadGtwResultGrapicLayer: loadGtwResultGrapicLayer,
      loadPointJsonResultGrapicLayer: loadPointJsonResultGrapicLayer,
      closeResultGrapicLayer: closeResultGrapicLayer,
      clearResultGrapicLayer: clearResultGrapicLayer,
      loadPointJsonLayerByCircleSearch: loadPointJsonLayerByCircleSearch,
      removePointJsonCircleSearchResultLayer: removePointJsonCircleSearchResultLayer,
      loadSinglePointJsonLayerBySearch:loadSinglePointJsonLayerBySearch,
      removeSinglePointSearchResultLayer:removeSinglePointSearchResultLayer,
      openPointJsonCircleSearchResultLayer:openPointJsonCircleSearchResultLayer,
      closePointJsonCircleSearchResultLayer:closePointJsonCircleSearchResultLayer
    }

  }
))
;
