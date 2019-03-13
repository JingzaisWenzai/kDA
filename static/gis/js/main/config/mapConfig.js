/**
 * Created by Administrator on 2018/3/6.
 */
/* --------------------------------地图初始信息配置-------------------------------- */
function MapConfig() {
}
//4326-测试环境，4490-政务外网环境
//MapConfig.currentEnvironment = "市-测试环境";
//MapConfig.currentEnvironment = "市-正式环境";
//MapConfig.currentEnvironment = "福田-测试环境";
// MapConfig.currentEnvironment = "福田-测试环境-2000坐标";
//MapConfig.currentEnvironment = "福田-正式环境-天地图";
//MapConfig.currentEnvironment = "福田-正式环境-规土委";
MapConfig.currentEnvironment ='福田-规土委-2000';
//MapConfig.currentEnvironment ='福州-测试环境-天地图';


// MapConfig.baseUrlheader = "http://10.192.19.107:8081";  //改ip
// MapConfig.baseUrlheader = 'http://10.192.19.164:8081' //测试服务器

MapConfig.baseUrlheader = baseUrl

// MapConfig.baseUrlheader = "http://10.190.55.58:8081";  /*部署用*/

/*******************************市-测试环境*******************************/
if (MapConfig.currentEnvironment == "市-测试环境") {
    MapConfig.currentWkid = 4326;
  MapConfig.mapXmlUrl= MapConfig.baseUrlheader + "/hiddendanger/mapconfig.xml";
  MapConfig.nearbySearchUrl=MapConfig.baseUrlheader + "/hiddendanger/search/near/layer";
    MapConfig.mapInitParams = {
        fullExtent: {//全图范围
            xmin: 13026179.382488998,
            ymin: 2677291.306672236,
            xmax: 13044409.613734988,
            ymax: 2685919.1362399133
        },
        extent: {//初始化范围
            xmin: 113.67958810043397,
            ymin: 22.518332934559176,
            xmax: 114.61543011402703,
            ymax: 22.94021137089289
        },
        center: {
            x: 114.060168,
            y: 22.603403,
            // x: 114.049,//福田
            //  y: 22.539,//福田
            spatialReference: {
                wkid: 4326
            }
        },
        spatialReference: {
            //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
            //4326-GCS_WGS_1984
            //4490 GCS_China_Geodetic_Coordinate_System_2000
            wkid: 4326
        },
        zoom: 12
        // zoom: 14 //福田

    };


    MapConfig.normMap = {
        Url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
        LabelUrl: "",
        type: 1
    };
    MapConfig.imgMap = {
        Url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer",
        LabelUrl: "",
        type: 1
    };

    MapConfig.backgroundService = {
        // sanfangNearbyUrl: baseUrl.baseUrl+"/NearbySanFangResources/selectByExample",
        // xiaofangNearbyUrl: baseUrl.baseUrl+"/NearbyXiaoFangResources/selectByExample",
        // commonNearbyUrl: baseUrl.baseUrl+"/NearbyResources/selectByExample",
        webType: "消防"
    };
}

/*******************************市-正式环境*******************************/
if (MapConfig.currentEnvironment == "市-正式环境") {
    MapConfig.currentWkid = 4490;
    MapConfig.mapInitParams = {
        fullExtent: {//全图范围
            xmin: 13026179.382488998,
            ymin: 2677291.306672236,
            xmax: 13044409.613734988,
            ymax: 2685919.1362399133
        },
        extent: {//初始化范围
            xmin: 113.67958810043397,
            ymin: 22.518332934559176,
            xmax: 114.61543011402703,
            ymax: 22.94021137089289
        },
        center: {
            x: 114.060168,
            y: 22.603403,
            //x: 114.049,//福田
            // y: 22.539,//福田
            spatialReference: {
                wkid: 4490
            }
        },
        spatialReference: {
            //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
            //4326-GCS_WGS_1984
            //4490 GCS_China_Geodetic_Coordinate_System_2000
            wkid: 4490
        },
        zoom: 2
        //zoom:4 //福田
    };


    MapConfig.normMap = {
        Url: "http://192.168.95.80:89/arcgis/rest/services/baseMap/basemap_201703/MapServer",
        LabelUrl: "",
        type: 1
    };
    MapConfig.imgMap = {
        Url: "http://192.168.95.80:89/arcgis/rest/services/raster/200701_hkyx_05m/MapServer",
        LabelUrl: "",
        type: 1
    };

    MapConfig.backgroundService = {
        // sanfangNearbyUrl: baseUrl.baseUrl+"/NearbySanFangResources/selectByExample",
        // xiaofangNearbyUrl: baseUrl.baseUrl+"/NearbyXiaoFangResources/selectByExample",
        // commonNearbyUrl: baseUrl.baseUrl+"/NearbyResources/selectByExample",
        webType: "消防"
    };
}

/*******************************福田-测试环境*******************************/
if (MapConfig.currentEnvironment == "福田-测试环境") {
    MapConfig.currentWkid = 4326;
    MapConfig.mapInitParams = {
        fullExtent: {//全图范围
            xmin: 13026179.382488998,
            ymin: 2677291.306672236,
            xmax: 13044409.613734988,
            ymax: 2685919.1362399133
        },
        extent: {//初始化范围
            xmin: 113.67958810043397,
            ymin: 22.518332934559176,
            xmax: 114.61543011402703,
            ymax: 22.94021137089289
        },
        center: {
            x: 114.049,//福田
            y: 22.539,//福田
            spatialReference: {
                wkid: 4326
            }
        },
        spatialReference: {
            //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
            //4326-GCS_WGS_1984
            //4490 GCS_China_Geodetic_Coordinate_System_2000
            wkid: 4326
        },
        zoom: 14

    }


    MapConfig.normMap = {
        Url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
        LabelUrl: "",
        type: 1
    };
    MapConfig.imgMap = {
        Url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer",
        LabelUrl: "",
        type: 1
    };

    MapConfig.backgroundService = {
        sanfangNearbyUrl: "http://192.168.16.195:8080/NearbySanFangResources/selectByExample",
        xiaofangNearbyUrl: "http://192.168.16.195:8080/NearbyXiaoFangResources/selectByExample",
        commonNearbyUrl: "http://192.168.16.195:8080/NearbyResources/selectByExample",
        webType: "消防"
    };
}

/*******************************福田-测试环境-2000坐标*************************/
if (MapConfig.currentEnvironment == "福田-测试环境-2000坐标") {
    MapConfig.currentWkid = 4490;
    MapConfig.mapInitParams = {
        fullExtent: {//全图范围
            xmin: 13026179.382488998,
            ymin: 2677291.306672236,
            xmax: 13044409.613734988,
            ymax: 2685919.1362399133
        },
        extent: {//初始化范围
            xmin: 113.67958810043397,
            ymin: 22.518332934559176,
            xmax: 114.61543011402703,
            ymax: 22.94021137089289
        },
        center: {
            x: 114.049,//福田
            y: 22.539,//福田
            spatialReference: {
                wkid: 4490
            }
        },
        spatialReference: {
            //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
            //4326-GCS_WGS_1984
            //4490 GCS_China_Geodetic_Coordinate_System_2000
            wkid: 4490
        },
        zoom:4 //福田
    }


    MapConfig.normMap = {
        Url: "http://192.168.16.240:6080/arcgis/rest/services/FuTian/futian_ss6/MapServer",
        LabelUrl: "",
        type: 1
    };
    MapConfig.imgMap = {
        Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer",
        LabelUrl: "",
        type: 1
    };

    MapConfig.backgroundService = {
        sanfangNearbyUrl: "http://192.16.10.172:8080/NearbySanFangResources/selectByExample",
        xiaofangNearbyUrl: "http://192.16.10.172:8080/NearbyXiaoFangResources/selectByExample",
        commonNearbyUrl: "http://192.16.10.172:8080/NearbyResources/selectByExample",
        webType: "消防"
    };
}

/*******************************福田-正式环境-天地图*************************/
if (MapConfig.currentEnvironment == "福田-正式环境-天地图") {
    MapConfig.currentWkid = 4326;
    MapConfig.mapInitParams = {
        fullExtent: {//全图范围
            xmin: 13026179.382488998,
            ymin: 2677291.306672236,
            xmax: 13044409.613734988,
            ymax: 2685919.1362399133
        },
        extent: {//初始化范围
            xmin: 113.67958810043397,
            ymin: 22.518332934559176,
            xmax: 114.61543011402703,
            ymax: 22.94021137089289
        },
        center: {
            x: 114.049,//福田
             y: 22.539,//福田
            spatialReference: {
                wkid: 4326
            }
        },
        spatialReference: {
            //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
            //4326-GCS_WGS_1984
            //4490 GCS_China_Geodetic_Coordinate_System_2000
            wkid: 4326
        },
        zoom:14 //福田
    }


    MapConfig.normMap = {
        Url: "http://192.168.95.80:89/arcgis/rest/services/baseMap/basemap_201703/MapServer",
        LabelUrl: "",
        type: 1
    };
    MapConfig.imgMap = {
        Url: "http://192.168.95.80:89/arcgis/rest/services/raster/200701_hkyx_05m/MapServer",
        LabelUrl: "",
        type: 1
    };

    MapConfig.backgroundService = {
        sanfangNearbyUrl: "http://192.16.10.172:8080/NearbySanFangResources/selectByExample",
        xiaofangNearbyUrl: "http://192.16.10.172:8080/NearbyXiaoFangResources/selectByExample",
        commonNearbyUrl: "http://192.16.10.172:8080/NearbyResources/selectByExample",
        webType: "消防"
    };
}

/*******************************福田-正式环境-规土委*************************/
if (MapConfig.currentEnvironment == "福田-正式环境-规土委") {
    MapConfig.currentWkid = 4490;
    MapConfig.mapInitParams = {
        fullExtent: {//全图范围
            xmin: 13026179.382488998,
            ymin: 2677291.306672236,
            xmax: 13044409.613734988,
            ymax: 2685919.1362399133
        },
        extent: {//初始化范围
            xmin: 113.67958810043397,
            ymin: 22.518332934559176,
            xmax: 114.61543011402703,
            ymax: 22.94021137089289
        },
        center: {
            x: 114.049,//福田
            y: 22.539,//福田
            spatialReference: {
                wkid: 4490
            }
        },
        spatialReference: {
            //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
            //4326-GCS_WGS_1984
            //4490 GCS_China_Geodetic_Coordinate_System_2000
            wkid: 4490
        },
        zoom:5 //福田
    }


    MapConfig.normMap = {
        Url: "http://10.190.55.65:6080/arcgis/rest/services/FuTian/basemap_blue_2000/MapServer",
/*
        Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer/",
*/
      /*  Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer",*/
        LabelUrl: "",
        type: 1
    };
    MapConfig.imgMap = {

        Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer/",
      /*  Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer",*/
        LabelUrl: "",
        type: 2
    };

    MapConfig.backgroundService = {
        sanfangNearbyUrl: "http://192.16.10.172:8080/NearbySanFangResources/selectByExample",
        xiaofangNearbyUrl: "http://192.16.10.172:8080/NearbyXiaoFangResources/selectByExample",
        commonNearbyUrl: "http://192.16.10.172:8080/NearbyResources/selectByExample",
        webType: "消防"
    };
}
/***********************************福田-规土委-2000************************************/

if (MapConfig.currentEnvironment == "福田-规土委-2000") {
  MapConfig.currentWkid = 4490;
  MapConfig.mapXmlUrl= MapConfig.baseUrlheader + "/hiddendanger/mapconfig.xml";
  MapConfig.nearbySearchUrl=MapConfig.baseUrlheader + "/hiddendanger/search/near/layer";
  MapConfig.mapInitParams = {
    fullExtent: {//全图范围
      xmin: 114.07401085997627,
      ymin: 22.526067738990008,
      xmax: 114.1011287421085,
      ymax: 22.544771574689907
    },
    extent: {//初始化范围
      xmin: 113.98266110148175,
      ymin: 22.49640275816134,
      xmax: 114.10551419720883,
      ymax: 22.59599795074845
    },
    center: {
      x: 114.049,//福田
      y: 22.539,//福田
      spatialReference: {
        wkid: 4490
      }
    },
    spatialReference: {
      //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
      //4326-GCS_WGS_1984
      //4490 GCS_China_Geodetic_Coordinate_System_2000
      wkid: 4490
    },
    zoom:5 //福田
  }


  MapConfig.normMap = {                   /*10.190.55.55:8080*/
    Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_SS_CGCS2000/MapServer/",
    /*
     Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer/",
     */
    /*  Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer",*/
    LabelUrl: "",
    type: 1
  };
  MapConfig.imgMap = {

    Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer/",
    /*  Url: "http://10.190.65.123:6080/arcgis/rest/services/FTKSJ/DLG_ZQ_FT_DB_CGCS2000/MapServer",*/
    LabelUrl: "",
    type: 2
  };

  MapConfig.backgroundService = {
    sanfangNearbyUrl: "http://192.16.10.172:8080/NearbySanFangResources/selectByExample",
    xiaofangNearbyUrl: "http://192.16.10.172:8080/NearbyXiaoFangResources/selectByExample",
    commonNearbyUrl: "http://192.16.10.172:8080/NearbyResources/selectByExample",
    webType: "消防"
  };
}


/*******************************福州-测试环境-天地图*************************/
if (MapConfig.currentEnvironment == "福州-测试环境-天地图") {
  MapConfig.currentWkid = 4326;
  MapConfig.mapXmlUrl= MapConfig.baseUrlheader + "/hiddendanger/mapconfig.xml";
  MapConfig.nearbySearchUrl=MapConfig.baseUrlheader + "/hiddendanger/search/near/layer";
  MapConfig.mapInitParams = {
    fullExtent: {//全图范围
      xmin: 13026179.382488998,
      ymin: 2677291.306672236,
      xmax: 13044409.613734988,
      ymax: 2685919.1362399133
    },
    extent: {//初始化范围
      xmin: 113.67958810043397,
      ymin: 22.518332934559176,
      xmax: 114.61543011402703,
      ymax: 22.94021137089289
    },
    center: {
      x: 119.3133,//福田
      y: 26.0535,//福田
      spatialReference: {
        wkid: 4326
      }
    },
    spatialReference: {
      //3857 - WGS_1984_Web_Mercator_Auxiliary_Sphere
      //4326-GCS_WGS_1984
      //4490 GCS_China_Geodetic_Coordinate_System_2000
      wkid: 4326
    },
    zoom:14 //福田
  }


  MapConfig.normMap = {
    Url: "http://192.168.95.80:89/arcgis/rest/services/baseMap/basemap_201703/MapServer",
    LabelUrl: "",
    type: 1
  };
  MapConfig.imgMap = {
    Url: "http://192.168.95.80:89/arcgis/rest/services/raster/200701_hkyx_05m/MapServer",
    LabelUrl: "",
    type: 1
  };

  MapConfig.backgroundService = {
    sanfangNearbyUrl: "http://192.16.10.172:8080/NearbySanFangResources/selectByExample",
    xiaofangNearbyUrl: "http://192.16.10.172:8080/NearbyXiaoFangResources/selectByExample",
    commonNearbyUrl: "http://192.16.10.172:8080/NearbyResources/selectByExample",
    webType: "消防"
  };
}
