var Particle = (function () {
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.r = 4;
        this.highlight = false;
    }
    Particle.prototype.setHighlight = function (value) {
        this.highlight = value;
    };
    Particle.prototype.intersects = function (other) {
        var d = dist(this.x, this.y, other.x, other.y);
        return d < this.r + other.r;
    };
    Particle.prototype.move = function () {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    };
    Particle.prototype.render = function () {
        noStroke();
        if (this.highlight) {
            fill(255);
        }
        else {
            fill(100);
        }
        ellipse(this.x, this.y, this.r * 2);
    };
    return Particle;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Point = (function () {
    function Point(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
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
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, r) {
        var _this = _super.call(this, x, y, r, r) || this;
        _this.x = x;
        _this.y = y;
        _this.r = r;
        _this.rSquared = _this.r * _this.r;
        return _this;
    }
    Circle.prototype.contains = function (point) {
        var d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
        return d <= this.rSquared;
    };
    Circle.prototype.intersects = function (range) {
        var xDist = Math.abs(range.x - this.x);
        var yDist = Math.abs(range.y - this.y);
        var r = this.r;
        var w = range.w;
        var h = range.h;
        var edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
        if (xDist > r + w || yDist > r + h)
            return false;
        if (xDist <= w || yDist <= h)
            return true;
        return edges <= this.rSquared;
    };
    return Circle;
}(Rectangle));
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
var particles = [];
function setup() {
    createCanvas(600, 400);
    for (var i = 0; i < 1000; i++) {
        particles[i] = new Particle(random(width), random(height));
    }
}
function draw() {
    background(0);
    var boundary = new Rectangle(300, 200, 600, 400);
    var qtree = new QuadTree(boundary, 4);
    for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
        var p = particles_1[_i];
        var point_1 = new Point(p.x, p.y, p);
        qtree.insert(point_1);
        p.move();
        p.render();
        p.setHighlight(false);
    }
    for (var _a = 0, particles_2 = particles; _a < particles_2.length; _a++) {
        var p = particles_2[_a];
        var range = new Circle(p.x, p.y, p.r * 2);
        var points = qtree.query(range);
        for (var _b = 0, points_1 = points; _b < points_1.length; _b++) {
            var point_2 = points_1[_b];
            var other = point_2.userData;
            if (p !== other && p.intersects(other)) {
                p.setHighlight(true);
            }
        }
    }
}
//# sourceMappingURL=build.js.map