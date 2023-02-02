var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Rectangle = (function () {
    function Rectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    Rectangle.prototype.contains = function (point) {
        return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    };
    return Rectangle;
}());
var QuadTree = (function () {
    function QuadTree(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }
    QuadTree.prototype.subdivide = function () {
        var _a = this.boundary, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        var capacity = this.capacity;
        var nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, capacity);
        var ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, capacity);
        var sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, capacity);
        var se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, capacity);
        this.divided = true;
    };
    QuadTree.prototype.insert = function (point) {
        if (!this.boundary.contains(point)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        else {
            if (!this.divided) {
                this.subdivide();
            }
            if (this.northeast.insert(point))
                return true;
            else if (this.northwest.insert(point))
                return true;
            else if (this.southeast.insert(point))
                return true;
            else if (this.southwest.insert(point))
                return true;
        }
    };
    QuadTree.prototype.show = function () {
        var _a = this.boundary, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(x, y, w * 2, h * 2);
        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
    };
    return QuadTree;
}());
var qtree;
function setup() {
    createCanvas(400, 400);
    var boundary = new Rectangle(200, 200, 200, 200);
    qtree = new QuadTree(boundary, 4);
    console.log(qtree);
}
function draw() {
    if (mouseIsPressed) {
        for (var i = 0; i < 5; i++) {
            var m = new Point(mouseX, mouseY);
            qtree.insert(m);
        }
    }
    background(0);
    qtree.show();
}
//# sourceMappingURL=build.js.map