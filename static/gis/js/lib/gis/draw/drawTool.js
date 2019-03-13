/**
 * Created by Administrator on 2018/3/5.
 */
/*由于4.X版本目前没有画图工具  因此自定义此画图工具
 *1.调用构造函数，并传入相应参数:
 *Polyline=>Polyline模块;view=>当前的MapView; Graphic=>Graphic模块;
 *Point=>Point模块; Polygon=>Polygon模块; Circle=>模块;
 *2.调用该类的的draw方方法，并传入相应参数:
 *geometryType=>要绘制的几何类型(string): point|polyline|polygon|rectangle|circle
 *symbol=>对应的geometry的symbol
 *callback=>绘制完成时执行的回掉函数，回掉函数带有一个参数graphic=>所绘制的graphic
 *
 *可能出bug的操作:在绘制过程中拖拽地图
 *
 */
DrawTools = function (view, Graphic, Point, Polyline, Polygon, Circle) {
    this.isDrawActive = false;
    this.pointerDownListener = null;
    this.pointerMoveListener = null;
    this.pointerUpListener = null;
    this.doubleClickListener = null;
    this.dragListener = null;
    this.curGraphic = null;
    this.view = view;
    this.Graphic = Graphic;
    this.Point = Point;
    this.Polyline = Polyline;
    this.Polygon = Polygon;
    this.Circle = Circle;
    this.draging = false;//判断用户是否在拖动地图
};

DrawTools.prototype.draw = function (geometryType, symbol, callback) {
    this.geometryType = geometryType;
    this.symbol = symbol;
    this.setFunc();
    if (this.drawEndCallback) this.drawEndCallback = null;
    this.drawEndCallback = callback;
    this.activeDraw();
};

DrawTools.prototype.setFunc = function () {
    switch (this.geometryType) {
        case "point":
            this.drawFunction = this.drawPoint;
            break;
        case "polyline":
            this.drawFunction = this.drawLine;
            break;
        case "polygon":
            this.drawFunction = this.drawPolygon;
            break;
        case "rectangle":
            this.drawFunction = this.drawRectangle;
            break;
        case "circle":
            this.drawFunction = this.drawCircle;
            break;
    }
    ;
}

DrawTools.prototype.activeDraw = function () {
    this.isDrawActive = true;
    this.clearGraphic();
    this.deactiveDraw();
    try {
        this.drawFunction();
    } catch (err) {

    }
};

DrawTools.prototype.deactiveDraw = function () {
    this.isDrawActive = false;
    if (this.pointerDownListener) this.pointerDownListener.remove();
    this.pointerDownListener = null;
    if (this.pointerMoveListener) this.pointerMoveListener.remove();
    this.pointerMoveListener = null;
    if (this.pointerUpListener) this.pointerUpListener.remove();
    this.pointerUpListener = null;
    if (this.doubleClickListener) this.doubleClickListener.remove();
    this.doubleClickListener = null;
    if (this.dragListener) this.dragListener.remove();
    this.dragListener = null;
    this.clearGraphic();
};

DrawTools.prototype.clearGraphic = function () {
    if (this.curGraphic) this.view.graphics.remove(this.curGraphic);
    if (this.moveLine) this.view.graphics.remove(this.moveLine);
    this.curGraphic = null;
    this.moveLine = null;
};

DrawTools.prototype.createGraphic = function (graphic) {
    this.view.graphics.add(graphic);
    this.curGraphic = graphic;
};

DrawTools.prototype.createPoint = function (event) {
    return this.view.toMap(event);
};

DrawTools.prototype.endDraw = function (event) {
    event.stopPropagation();
    var graphic = this.curGraphic.clone();
    this.deactiveDraw();
    this.drawEndCallback(graphic);
};

DrawTools.prototype.drawPoint = function () {
    var self = this;
    self.pointerUpListener = self.view.on("pointer-up", function (event) {
        if (self.draging) {
            self.draging = !self.draging;
            return;
        }
        ;
        self.clearGraphic();
        event.stopPropagation();
        var graphic = new self.Graphic(self.createPoint(event), self.symbol);
        self.createGraphic(graphic);
        self.endDraw(event);
    });
    self.dragListener = self.view.on("drag", function (event) {
        if (event.action == "start") self.draging = true;
    });
};

DrawTools.prototype.drawLine = function () {
    var self = this;
    self.pointerDownListener = self.view.on("pointer-down", function (event) {
        event.stopPropagation();
        var line = self.curGraphic;
        var point = self.createPoint(event);
        if (!line) {
            var polyline = new self.Polyline({
                spatialReference: self.view.spatialReference,
                paths: [[[point.x, point.y]]]
            });
            var graphic = new self.Graphic(polyline, self.symbol);
            self.createGraphic(graphic);
        } else {
            var line = self.curGraphic.clone();
            self.clearGraphic();
            var pathLength = line.geometry.paths[0].length;
            //line.geometry.insertPoint(0, pathLength, point);//bug  方法添加新点无效
            line.geometry.paths[0][pathLength] = [point.x, point.y];

            //console.log(line.geometry.getPoint(0, 0));
            // console.log(point);
            // console.log(line.geometry.paths);

            self.createGraphic(line);
        }
        ;
    });

    self.pointerMoveListener = self.view.on("pointer-move", function (event) {
        if (!self.curGraphic) return;
        event.stopPropagation();
        var point = self.createPoint(event);
        var line = self.curGraphic.clone();
        var lastPoint = line.geometry.paths[0][line.geometry.paths[0].length - 1];
        if (!lastPoint) return;
        if (self.moveLine) {
            self.view.graphics.remove(self.moveLine);
            self.moveLine = null;
        }
        ;
        self.moveLine = new self.Graphic(new self.Polyline({
            paths: [[lastPoint[0], lastPoint[1]], [point.x, point.y]],
            spatialReference: self.view.spatialReference
        }), self.symbol);
        self.view.graphics.add(self.moveLine);

    });

    self.doubleClickListener = self.view.on("double-click", function (event) {
        self.endDraw(event);
    });

    self.dragListener = self.view.on("drag", function (event) {
        if (event.action == "start") self.draging = !self.draging;
        if (event.action == "end") {
            self.draging = !self.draging;
            if (!self.curGraphic) return;
            var line = self.curGraphic.clone();
            self.clearGraphic();
            var pathLength = line.geometry.paths[0].length;
            if (!pathLength) return;
            line.geometry.removePoint(0, pathLength - 1);
            self.createGraphic(line);
        }
        ;
    });
};


DrawTools.prototype.drawPolygon = function () {
    var self = this;
    self.pointerDownListener = self.view.on("pointer-down", function (event) {
        event.stopPropagation();
        var polygon = self.curGraphic;
        var point = self.createPoint(event);
        if (!polygon) {
            var polygon = new self.Polygon({
                spatialReference: self.view.spatialReference,
                rings: [[point.x, point.y], [point.x, point.y]]
            });
            var graphic = new self.Graphic(polygon, self.symbol);
            self.createGraphic(graphic);
        } else {
            var polygon = self.curGraphic.clone();
            self.clearGraphic();
            var ringLength = polygon.geometry.rings[0].length;
            polygon.geometry.insertPoint(0, ringLength - 1, point);
            self.createGraphic(polygon);
        }
    });

    self.pointerMoveListener = self.view.on("pointer-move", function (event) {
        if (!self.curGraphic) return;
        event.stopPropagation();
        var polygon = self.curGraphic.clone();
        self.clearGraphic();
        var ringLength = polygon.geometry.rings[0].length;
        var point = self.createPoint(event);
        polygon.geometry.setPoint(0, ringLength - 1, point);
        self.createGraphic(polygon);
    });

    self.doubleClickListener = self.view.on("double-click", function (event) {
        self.endDraw(event);
    });

    self.dragListener = self.view.on("drag", function (event) {
        if (event.action == "start") self.draging = !self.draging;
        if (event.action == "end") {
            self.draging = !self.draging;
            if (!self.curGraphic) return;
            var polygon = self.curGraphic.clone();
            self.clearGraphic();
            var ringLength = polygon.geometry.rings[0].length;
            if (!ringLength) return;
            polygon.geometry.removePoint(0, ringLength - 2);
            self.createGraphic(polygon);
        }
        ;
    });
};

DrawTools.prototype.drawRectangle = function () {
    var self = this;
    self.dragListener = self.view.on("drag", function (event) {
        event.stopPropagation();
        var point = self.createPoint(event);
        var rectangle = self.curGraphic;
        if (event.action == "start") {
            if (!rectangle) {
                var rectangle = new self.Polygon({
                    spatialReference: self.view.spatialReference,
                    rings: [[point.x, point.y], [point.x, point.y], [point.x, point.y], [point.x, point.y]]
                });
                var graphic = new self.Graphic(rectangle, self.symbol);
                self.createGraphic(graphic);
            }
        }
        ;
        if (event.action == "update") {
            if (!rectangle) return;
            var rectangle = self.curGraphic.clone();
            self.clearGraphic();
            var point = self.createPoint(event);
            var originPoint = rectangle.geometry.rings[0][0];
            var pointScreen = self.view.toScreen(new self.Point({
                x: point.x,
                y: point.y,
                spatialReference: self.view.spatialReference
            }));
            var originPointScreen = self.view.toScreen(new self.Point({
                x: originPoint[0],
                y: originPoint[1],
                spatialReference: self.view.spatialReference
            }));
            var screenRings = [[originPointScreen.x, originPointScreen.y], [pointScreen.x, originPointScreen.y], [pointScreen.x, pointScreen.y], [originPointScreen.x, pointScreen.y]];
            var mapRings = screenRings.map(function (point, index) {
                var mapPoint = self.view.toMap({x: point[0], y: point[1]});
                return [mapPoint.x, mapPoint.y];
            });

            var newRectangle = new self.Polygon({
                spatialReference: self.view.spatialReference,
                rings: mapRings
            });
            var graphic = new self.Graphic(newRectangle, self.symbol);
            self.createGraphic(graphic);
        }
        ;
        if (event.action == "end") {
            self.endDraw(event);
        }
        ;
    });
};

DrawTools.prototype.drawCircle = function () {
    var self = this;
    self.dragListener = self.view.on("drag", function (event) {
        event.stopPropagation();
        var circle = self.curGraphic;
        var point = self.createPoint(event);
        if (event.action == "start") {
            if (!circle) {
                var circle = new self.Circle({
                    center: point,
                    radius: 0,
                    spatialReference: self.view.spatialReference
                });
                var graphic = new self.Graphic(circle, self.symbol);
                self.createGraphic(graphic);
            }
        }
        ;
        if (event.action == "update") {
            if (!circle) return;
            self.clearGraphic();
            var center = circle.geometry.center;
            var radius = Math.pow((Math.pow((point.x - center.x), 2) + Math.pow((point.y - center.y), 2)), 0.5);
            var newCircle = new self.Circle({
                center: center,
                radius: radius,
                spatialReference: self.view.spatialReference
            });
            var graphic = new self.Graphic(newCircle, self.symbol);
            self.createGraphic(graphic);
        }
        ;
        if (event.action == "end") {
            self.endDraw(event);
        }
        ;
    });
};