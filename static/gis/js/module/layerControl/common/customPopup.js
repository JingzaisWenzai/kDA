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
        root.module.layerControl.common = (root.module.layerControl.common) ? root.module.layerControl.common : {};

        root.module.layerControl.common.customPopup = factory();
    }
}(this, function () {
    //定义一些常量

    var getUrlParam = function getUrlParam(url) {
        var params = {};
        var name, value;
        var str = url;
        //console.log(1)
        var num = str.indexOf("?");
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里

        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    }

    var initPopupStyle = function initPopupStyle() {
        //删除head
        var childHead = document.getElementsByClassName("esri-popup__header")[0];
        //childHead.parentNode.removeChild(childHead);
        childHead.style.cssText = "display:none";

        //删除button
        var childButton = document.getElementsByClassName("esri-popup__feature-buttons")[0];
        //childButton.parentNode.removeChild(childButton);
        if(childButton)
          childButton.style.cssText = "display:none";


        var childButton = document.getElementsByClassName("esri-popup__footer")[0];//sdk 4.10 兼容
        if(childButton)
          childButton.style.cssText = "display:none";

        //去除margin
        var childContent = document.getElementsByClassName("esri-popup__content")[0];
        childContent.style.cssText = "margin-left: 0px;margin-right: 0px;margin-bottom: 0px;";


        //设置三角背景色
        var childPointer = document.getElementsByClassName("esri-popup__pointer-direction")[0];
        childPointer.style.cssText = "background-color: #196db4";


         //div背景透明
         var childContainer = document.getElementsByClassName("esri-popup__main-container")[0];
         childContainer.style.cssText = "background-color: rgba(3,25,39,1)";

         //边框阴影
        /*  var childContainerParent = document.getElementsByClassName("esri-popup__position-container")[0];
         childContainerParent.style.cssText = "box-shadow:0 1px 4px rgba(0, 0, 0, 0)";*/
    }

    var zooTo = function zooTo(mapView, longitude, latitude) {
        //4490-xy,4326-lnglat,坐标特殊处理
        console.log(latitude);
        console.log(longitude);

        var point = mapView.center;

        point.x = parseFloat(longitude);
        point.y = parseFloat(latitude);

        point.longitude = parseFloat(longitude);
        point.latitude = parseFloat(latitude);

        //console.log(point);

        mapView.goTo({
            center: point,
            zoom: mapView.zoom + 2
        });

        //重新定位popup位置
        mapView.popup.location = point;
    }

    var loadJsonData =  function loadJsonData(params, callback) {
        var htmlItem = ""

        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(params.nodeId);
        var getPopupDataUrl = node.url + "/summaryInfo";

        var options = {
            query: {
                id: params.featureId,
                type: MapConfig.backgroundService.webType
            },
            responseType: 'json'
        };

        $.ajax({
            headers: {
              token: module.common.layerControl.mapNet.getCookieByName("Admin-Token")
            },
            url: getPopupDataUrl,
            type: 'GET',
            data: options.query,
            dataType: "json", //指定服务器返回的数据类型
            async: false,
            success: function (data) {
                module.common.layerControl.mapNet.checkLogin(data);//token登录校验

                //数据填充
                callback(data);
            },
            error: function (error) {
                console.log(params.nodeId + "图层弹框加载错误，", error.message);
            }
        });
    }

    var loadJsonDataByQuery =  function loadJsonDataByQuery(params, callback) {
      var htmlItem = ""

      var node = module.common.layerControl.mapLayerXml.getLayerNodeById(params.nodeId);
      var getPopupDataUrl = node.url + "/summaryInfo";

      console.log(node.query)

      var queryParams={};
      var temArray = node.query.split('&')
      for (var i = 0;i < temArray.length;i++){
          if( temArray[i].length > 0 ){
            var paramArray=temArray[i].split('=')
            queryParams[paramArray[0]] = paramArray[1];
          }
      }
      queryParams.id=params.featureId;
      queryParams.type=MapConfig.backgroundService.webType;

      var options = {
        query: queryParams,
        responseType: 'json'
      };

      $.ajax({
        headers: {
          token: module.common.layerControl.mapNet.getCookieByName("Admin-Token")
        },
        url: getPopupDataUrl,
        type: 'GET',
        data: options.query,
        dataType: "json", //指定服务器返回的数据类型
        async: false,
        success: function (data) {
          module.common.layerControl.mapNet.checkLogin(data);//token登录校验

          //数据填充
          callback(data);
        },
        error: function (error) {
          console.log(params.nodeId + "图层弹框加载错误，", error.message);
        }
      });
    }


    var loadArcgisData = function loadArcgisData(params, callback) {
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(params.nodeId);

        var sql = "objectid=" + params.featureId;

        module.layerQuery.featureAttributeQuery.queryFeatureLayerBySql(node, sql, function (features) {
            //console.log(features);
            callback(features);
        })
    }


    var layer_common_customPopup_template = function layer_common_customPopup_template(node) {
        module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_common_customPopup_template);
    }

    var setContentInfo_layer_common_customPopup_template = function setContentInfo_layer_common_customPopup_template(feature) {
        //console.log(feature);
        var node = module.common.layerControl.mapLayerXml.getLayerNodeById(feature.graphic.layer.id);

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

        var html = "<div style='width: 360px;height: 320px;overflow: hidden;'>" +
            "<iframe src='../gis/js/module/layerInfoWindow/base/basePopupTemplate.html" + htmlUrlParams + "'  style='width:100%;height:100%; auto;border:none;background-color:rgba(255,0,0,0.1);' scrolling='no'></iframe>" +
            "</div>";

        return html;
    }


    return {
        getUrlParam: getUrlParam,
        initPopupStyle: initPopupStyle,
        zooTo: zooTo,
        loadJsonData: loadJsonData,
        loadArcgisData: loadArcgisData,
        loadJsonDataByQuery:loadJsonDataByQuery,
        layer_common_customPopup_template: layer_common_customPopup_template
    }
}));
