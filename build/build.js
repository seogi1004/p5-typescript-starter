var Boundary = (function () {
    function Boundary(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }
    Boundary.prototype.show = function () {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    };
    return Boundary;
}());
var Ray = (function () {
    function Ray(x, y) {
        this.pos = createVector(x, y);
        this.dir = createVector(1, 0);
    }
    Ray.prototype.lookAt = function (x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    };
    Ray.prototype.cast = function (wall) {
        var x1 = wall.a.x;
        var y1 = wall.a.y;
        var x2 = wall.b.x;
        var y2 = wall.b.y;
        var x3 = this.pos.x;
        var y3 = this.pos.y;
        var x4 = this.pos.x + this.dir.x;
        var y4 = this.pos.y + this.dir.y;
        var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0)
            return;
        var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            return true;
        }
        else {
            return;
        }
    };
    Ray.prototype.show = function () {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    };
    return Ray;
}());
var wall;
var ray;
function setup() {
    createCanvas(400, 400);
    wall = new Boundary(300, 100, 300, 300);
    ray = new Ray(100, 200);
}
function draw() {
    background(0);
    wall.show();
    ray.show();
    ray.lookAt(mouseX, mouseY);
    var pt = ray.cast(wall);
    console.log(pt);
}
//# sourceMappingURL=build.js.map