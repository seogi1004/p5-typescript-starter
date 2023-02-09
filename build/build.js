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
    Rectangle.prototype.intersects = function (range) {
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);
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
    QuadTree.prototype.query = function (range, found) {
        if (!found)
            found = [];
        if (!this.boundary.intersects(range)) {
            return found;
        }
        else {
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var p = _a[_i];
                if (range.contains(p)) {
                    found.push(p);
                }
            }
            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
        }
        return found;
    };
    QuadTree.prototype.show = function () {
        var _a = this.boundary, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(x, y, w * 2, h * 2);
        for (var _i = 0, _b = this.points; _i < _b.length; _i++) {
            var p = _b[_i];
            strokeWeight(2);
            point(p.x, p.y);
        }
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
    for (var i = 0; i < 300; i++) {
        var x = randomGaussian(width / 2, width / 8);
        var y = randomGaussian(height / 2, height / 8);
        var p = new Point(x, y);
        qtree.insert(p);
    }
}
function draw() {
    background(0);
    qtree.show();
    stroke(0, 255, 0);
    rectMode(CENTER);
    var range = new Rectangle(mouseX, mouseY, 25, 25);
    rect(range.x, range.y, range.w * 2, range.h * 2);
    var points = qtree.query(range);
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var p = points_1[_i];
        strokeWeight(4);
        point(p.x, p.y);
    }
}
//# sourceMappingURL=build.js.map