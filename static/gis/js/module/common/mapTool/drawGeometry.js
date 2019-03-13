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
        root.module.common = ( root.module.common ) ? root.module.common : {};
        root.module.common.mapTool = ( root.module.common.mapTool ) ? root.module.common.mapTool : {};

        root.module.common.mapTool.drawGeometry = factory();
    }
}(this, function () {
        var drawTools;

        var drawText = function drawText(text, size,callback) {

            if (!text)
                text = "输入文本";
            if (!size)
                size = 14;

            var symbol = {
                type: "text",
                color: "red",
                haloColor: "black",
                haloSize: "1px",
                text: text,
                xoffset: 3,
                yoffset: 3,
                font: { // autocast as Font
                    size: size,
                    family: "sans-serif"
                }
            }

            drawPoint(symbol,callback);
        }

        var drawPointMarker = function drawPointMarker(url, width, height,callback) {
            var symbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: url,
                width: width + "px",
                height: height + "px"
            }

            drawPoint(symbol,callback);
        }

       /* var drawPointMarker = function drawPointMarker(type) {
            var symbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: "img/mapTool/draw/point/1.png",
                width: "34px",
                height: "32px"
            }

            switch (type) {
                case "jjqy":
                    symbol.url = "img/mapTool/draw/point/1.png";
                    break;
                case "clkz":
                    symbol.url = "img/mapTool/draw/point/2.png";
                    break;
                case "ssjh":
                    symbol.url = "img/mapTool/draw/point/3.png";
                    break;
                case "xfc":
                    symbol.url = "img/mapTool/draw/point/4.png";
                    break;
                case "yljh":
                    symbol.url = "img/mapTool/draw/point/5.png";
                    break;
                default:
                    symbol.url = "img/mapTool/draw/point/1.png";
                    break;
            }

            drawPoint(symbol);
        }*/

        var drawPoint = function drawPoint(symbol,callback) {
            var Graphic = window.require("esri/Graphic");
            var Point = window.require("esri/geometry/Point");
            var Polyline = window.require("esri/geometry/Polyline");
            var Polygon = window.require("esri/geometry/Polygon");
            var Circle = window.require("esri/geometry/Circle");

            var graphicsLayer = window.map.findLayerById("drawGeometryGraphicsLayer");

            if (drawTools)
                drawTools.deactiveDraw();

            drawTools = new DrawTools(window.mapView, Graphic, Point, Polyline, Polygon, Circle);

            /*  var symbol = {
             type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
             color: [226, 119, 40],
             outline: { // autocasts as new SimpleLineSymbol()
             color: [255, 255, 255],
             width: 2
             }
             };*/
            /*var renderer = {
             type: "simple",  // autocasts as new SimpleRenderer()
             symbol: {
             type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
             url: node.icon,
             width: "640px",
             height: "402px"
             }
             };*/

            drawTools.draw("point", symbol, function (graphic) {
                graphicsLayer.add(graphic);
                callback();
                graphicsLayer.visible = true;
            })
        }

        var drawPolyline = function drawPolyline() {
            var Graphic = window.require("esri/Graphic");
            var Point = window.require("esri/geometry/Point");
            var Polyline = window.require("esri/geometry/Polyline");
            var Polygon = window.require("esri/geometry/Polygon");
            var Circle = window.require("esri/geometry/Circle");

            var graphicsLayer = window.map.findLayerById("drawGeometryGraphicsLayer");

            //绘制前，清除画图事件
            if (drawTools)
                drawTools.deactiveDraw();

            drawTools = new DrawTools(window.mapView, Graphic, Point, Polyline, Polygon, Circle);

            var symbol = {
                type: "simple-line", // autocasts as SimpleLineSymbol()
                color: [226, 119, 40],
                width: 2
            };

            drawTools.draw("polyline", symbol, function (graphic) {
                graphicsLayer.add(graphic);

                graphicsLayer.visible = true;
            })
        }

        var drawRectangle = function drawRectangle() {
            var Graphic = window.require("esri/Graphic");
            var Point = window.require("esri/geometry/Point");
            var Polyline = window.require("esri/geometry/Polyline");
            var Polygon = window.require("esri/geometry/Polygon");
            var Circle = window.require("esri/geometry/Circle");

            var graphicsLayer = window.map.findLayerById("drawGeometryGraphicsLayer");

            //绘制前，清除画图事件
            if (drawTools)
                drawTools.deactiveDraw();

            drawTools = new DrawTools(window.mapView, Graphic, Point, Polyline, Polygon, Circle);

            var symbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [227, 139, 79, 0.8],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 1
                }
            }

            drawTools.draw("rectangle", symbol, function (graphic) {
                graphicsLayer.add(graphic);

                graphicsLayer.visible = true;
            })
        }

        var drawPolygon = function drawPolygon() {
            var Graphic = window.require("esri/Graphic");
            var Point = window.require("esri/geometry/Point");
            var Polyline = window.require("esri/geometry/Polyline");
            var Polygon = window.require("esri/geometry/Polygon");
            var Circle = window.require("esri/geometry/Circle");

            var graphicsLayer = window.map.findLayerById("drawGeometryGraphicsLayer");

            //绘制前，清除画图事件
            if (drawTools)
                drawTools.deactiveDraw();

            drawTools = new DrawTools(window.mapView, Graphic, Point, Polyline, Polygon, Circle);

            var symbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [227, 139, 79, 0.8],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 1
                }
            }

            drawTools.draw("polygon", symbol, function (graphic) {
                graphicsLayer.add(graphic);

                graphicsLayer.visible = true;
            })
        }

        var drawCircle = function drawCircle(callback) {
            var Graphic = window.require("esri/Graphic");
            var Point = window.require("esri/geometry/Point");
            var Polyline = window.require("esri/geometry/Polyline");
            var Polygon = window.require("esri/geometry/Polygon");
            var Circle = window.require("esri/geometry/Circle");

            var graphicsLayer = window.map.findLayerById("drawGeometryGraphicsLayer");

            if (drawTools)
                drawTools.deactiveDraw();

            drawTools = new DrawTools(window.mapView, Graphic, Point, Polyline, Polygon, Circle);

            var symbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [227, 139, 79, 0.8],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 1
                }
            }

            drawTools.draw("circle", symbol, function (graphic) {
                graphicsLayer.add(graphic);

                graphicsLayer.visible = true;
            })
        }

        var measureDistance = function measureDistance(callback) {
          var Draw= window.require("esri/views/2d/draw/Draw");
          var draw = new Draw({
            view: window.mapView
          });

          var graphicsLayer = window.map.findLayerById("messureGeometryGraphicsLayer");

          //绘制前，清除画图事件
          if (drawTools)
            drawTools.deactiveDraw();

          window.mapView.focus();

          var action = draw.create("polyline");

          action.on("vertex-add", createGraphic);
          //action.on("vertex-remove", updateVertices);
          action.on("cursor-update", createGraphic);
          //action.on("redo", updateVertices);
          //action.on("undo", updateVertices);
          action.on("draw-complete",function (evt) {
            callback();
          });
        }

        var createGraphic = function createGraphic(event) {
          var Graphic = window.require('esri/Graphic');
          var geometryEngine = window.require('esri/geometry/geometryEngine');
          var webMercatorUtils = window.require("esri/geometry/support/webMercatorUtils");

          var graphicsLayer = window.map.findLayerById('messureGeometryGraphicsLayer');

          var vertices = event.vertices;
          graphicsLayer.removeAll();

          var line = new Graphic({
            geometry: {
              type: 'polyline',
              paths: vertices,
              spatialReference: window.mapView.spatialReference
            },
            symbol: {
              type: 'simple-line', // autocasts as new SimpleFillSymbol
              color: [226, 119, 40],
              width: 2,
              cap: 'round',
              join: 'round'
            }
          })
          //console.log(graphic.paths);
          //添加标注
          graphicsLayer.add(line);

          var totalDistance = 0

          if (line.geometry.paths[0].length > 1) {
            for (var i = 1; i < line.geometry.paths[0].length; i++) {

              var point1 = window.mapView.center.clone()
              point1.x = line.geometry.paths[0][i][0]
              point1.y = line.geometry.paths[0][i][1]

              var point2 = window.mapView.center.clone()
              point2.x = line.geometry.paths[0][i - 1][0]
              point2.y = line.geometry.paths[0][i - 1][1]

              var distance = geometryEngine.distance(webMercatorUtils.geographicToWebMercator(point1), webMercatorUtils.geographicToWebMercator(point2));
              //console.log(point1)
              //console.log(distance)

              totalDistance += distance
              if (i == line.geometry.paths[0].length - 1) {
                var label = (totalDistance > 1000) ? '总长：' + (totalDistance / 1000).toFixed(1) + '公里' : '总长：' + totalDistance.toFixed(0) + '米'
                labelAreas(point1, label)
              }
              else {
                var label = (distance > 1000) ? (distance / 1000).toFixed(1) + '公里' : distance.toFixed(0) + '米'
                labelAreas(point1, label)
              }
            }
          }
          graphicsLayer.visible=true;
        }

        var labelAreas = function labelAreas(point, label) {
          var Graphic = window.require('esri/Graphic')
          var graphicsLayer = window.map.findLayerById('messureGeometryGraphicsLayer')

          var graphic = new Graphic({
            geometry: point,
            symbol: {
              type: "text",
              color: "#00e4ff",
              haloColor: "white",
              //haloSize: "1px",
              text: label,
              xoffset: 15,
              yoffset: -10,
              font: {
                size: 10,
                family: "sans-serif"
              }
            }
          });
          graphicsLayer.add(graphic);
        }

        var clearGraphicsLayer = function clearGraphicsLayer(callback) {
            var graphicsLayer = window.map.findLayerById("drawGeometryGraphicsLayer");
            graphicsLayer.removeAll();

          var graphicsLayer2 = window.map.findLayerById("messureGeometryGraphicsLayer");
          graphicsLayer2.removeAll();

          //绘制前，清除画图事件
          if (drawTools)
            drawTools.deactiveDraw();

            callback();
        }

        var undoGraphicsLayer = function undoGraphicsLayer() {
            var graphicsLayer = window.map.findLayerById("drawGeometryGraphicsLayer");
            var graphics = graphicsLayer.graphics;

            // console.log(graphics);
            var graphic = graphics.items[graphics.length - 1];
            graphicsLayer.remove(graphic);
        }

        return {
            drawText: drawText,
            drawPointMarker: drawPointMarker,
            drawPoint: drawPoint,
            drawPolyline: drawPolyline,
            drawRectangle: drawRectangle,
            drawPolygon: drawPolygon,
            drawCircle: drawCircle,
            measureDistance:measureDistance,
            clearGraphicsLayer: clearGraphicsLayer,
            undoGraphicsLayer: undoGraphicsLayer

        }
    }
))
;
