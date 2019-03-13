
import {mapconfig} from '../api/common'

// /**
//  * 获取所有地图图层
//  */
// //xml转json
// function xmlToJson (nodes) {
//   var itemList = new Array();
//   $.each(nodes, function () {
//     var entity = {};
//     var obj = $(this);
//     entity.label = obj[0].getAttribute("label");
//     entity.id = obj[0].getAttribute("id");
//     //entity.text = obj[0].getAttribute("label");
//     //entity.href = '#parent1';
//     // entity.tags = ['0'];
//
//     if (obj[0].hasChildNodes()) {
//       entity.nodes = xmlToJson(obj.children());
//     }
//     else {
//       entity.table = obj[0].getAttribute("table");
//       entity.pid = obj[0].getAttribute("pid");
//       entity.type = obj[0].getAttribute("type");
//       entity.show = obj[0].getAttribute("show");
//       entity.bm = obj[0].getAttribute("bm");
//       entity.function = obj[0].getAttribute("function");
//       entity.url = obj[0].getAttribute("url");
//       entity.gisUrl = obj[0].getAttribute("gisUrl");
//       entity.query = obj[0].getAttribute("query");
//       entity.icon = obj[0].getAttribute("icon");
//       entity.iconArray = obj[0].getAttribute("iconArray");
//       entity.iconsize = obj[0].getAttribute("iconsize");
//       entity.minZoom = obj[0].getAttribute("minZoom");
//       entity.maxZoom = obj[0].getAttribute("maxZoom");
//       entity.weightField = obj[0].getAttribute("weightField");//热力图，权重字段
//       entity.maxPixelIntensity = obj[0].getAttribute("maxPixelIntensity");//热力图，最大像素强度
//       entity.lineColor = obj[0].getAttribute("lineColor");
//       entity.lineWidth = obj[0].getAttribute("lineWidth");
//       entity.lineStyle = obj[0].getAttribute("lineStyle");
//       entity.fillColor = obj[0].getAttribute("fillColor");
//       entity.outlineColor = obj[0].getAttribute("outlineColor");
//       entity.outlineWidth = obj[0].getAttribute("outlineWidth");
//       entity.outlineStyle = obj[0].getAttribute("outlineStyle");
//     }
//     itemList.push(entity);
//   });
//   return itemList;
// }
// export function getAllMapLayer() {
//   var xmlJson = {};
//   mapconfig().then(function(data) {
//     $(data).find("Map").each(function () {
//       data = xmlToJson($(this).children());
//     })
//     return data
//   })
// }
