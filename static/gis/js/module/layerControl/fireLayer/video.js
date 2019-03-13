/**
 * Created by Administrator on 2018/3/23.
 */
/**
 * Created by Administrator on 2018/3/9.
 */
/**
 *消防摄像头图层
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
        root.module = ( root.module) ? root.module : {};
        root.module.layerControl = ( root.module.layerControl) ? root.module.layerControl : {};
        root.module.layerControl.fireLayer = ( root.module.layerControl.fireLayer) ? root.module.layerControl.fireLayer : {};

        root.module.layerControl.fireLayer.video = factory();
    }
}(this, function () {
//定义一些常量

        /**
         * 摄像头--其他路段图层加载
         */
        var layer_fire_video_qitazhuyaoluduan = function layer_fire_video_qitazhuyaoluduan(node) {

            module.layerControl.common.loadUtil.loadPointJsonLayerModule(node, setContentInfo_layer_fire_video_qitazhuyaoluduan);
        }

        var setContentInfo_layer_fire_video_qitazhuyaoluduan = function setContentInfo_layer_fire_video_qitazhuyaoluduan(feature) {
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

            var getPopupDataUrl = node.url + "/summaryInfo";
            var options = {
                query: {
                    id: feature.graphic.attributes.id,
                    type: MapConfig.backgroundService.webType
                },
                responseType: 'json'
            };

            var htmlItem = "";
            var htmlVideo = "";
            var htmlVideoPlay = "";

            var htmlDetail = "";

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

                    for (var i = 0; i < data.video.length; i++) {
                        var video = data.video[i];
                        var a = "<a href='####' title='播放' onclick='parent.monographicLayer.openVideoAction(" + "&quot;" + feature.graphic.attributes.id + "&quot;" + ",&quot;" + video["videoId"] + "&quot;)'>" + "播放</a>"

                        var btn = "<button style=' float: left; width: 50px;height: 22px;line-height: 16px !important;position: relative;top: 100%; margin-top: -22px;display: block;' onclick='parent.monographicLayer.openVideoAction(" + "&quot;" + feature.graphic.attributes.id + "&quot;" + ",&quot;" + video["videoId"] + "&quot;)'>" + "播放</button>"
/*
                        var btn = "<button style='float:right;width: 50px;height: 22px;line-height: 16px !important;margin-top: 20px;' onclick='parent.monographicLayer.openVideoAction(" + "&quot;" + feature.graphic.attributes.id + "&quot;" + ",&quot;" + video["videoId"] + "&quot;)'>" + "播放</button>"
*/

                        /*htmlVideo += "<p>" + "视频" + (i + 1) + "：" + video["videoName"] + btn + "</p>";*/
                        htmlVideo += "<p>" + "视频" + (i + 1) + "：" + video["videoName"] + "</p>";
                        htmlVideoPlay += btn ;
                    }

                    //是否有详细按钮
                    if (data.hasDetailInfo) {
                        htmlDetail = "<div class='k_c_left' > " +
                            "<a href='####' title='详情' onclick='parent.monographicLayer.loadSFDetailMessage(" + "&quot;" + node.id + "&quot;" + ",&quot;" + feature.graphic.attributes.id + "&quot;)'>" +
                            "<span><img src='img/layerControl/popup/detail.png'></span>" +
                            "<span style='margin-top: 10px'>详情</span>" +
                            "</a>" +
                            " </div>";
                    }
                },
                error: function (error) {
                    console.log(node.id + "图层弹框加载错误，", error.message);
                }
            });

            var html = "<div class='popup_content_div'>" +
                /*"<p>id：" + feature.graphic.attributes.id + "</p>" +*/
                htmlItem +
                htmlVideo +
                " </div>" +
                /*"<button onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + feature.graphic.geometry.longitude + "," + feature.graphic.geometry.latitude + ")'>" + "附近资源</button>" +*/
                "<div class='k_c'>" +
                htmlDetail +
                " <div class='k_c_right'>" +
                " <a href='####' title='附近资源' onclick='module.layerControl.common.loadUtil.drawCirleQuery(" + pointLocal.x + "," + pointLocal.y + ")'>" +
                " <span><img src='img/layerControl/popup/search.png'></span>" +
                " <span>附近资源</span>" +
                " </a>" +
                " </div>" +
                htmlVideoPlay +
                "</div>";

            return html;
        }


        return {
         /*   layer_fire_video_qitazhuyaoluduan: layer_fire_video_qitazhuyaoluduan*/
        }
    }
));
