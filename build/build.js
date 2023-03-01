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
var Particle = (function () {
    function Particle() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (var i = 0; i < 360; i += 1) {
            this.rays[i] = new Ray(this.pos, radians(i));
        }
    }
    Particle.prototype.update = function (x, y) {
        this.pos.set(x, y);
    };
    Particle.prototype.look = function (walls) {
        var _this = this;
        this.rays.forEach(function (ray) {
            var closest = null;
            var record = Infinity;
            walls.forEach(function (wall) {
                var pt = ray.cast(wall);
                if (pt) {
                    var d = p5.Vector.dist(_this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            });
            if (closest) {
                stroke(255, 100);
                line(_this.pos.x, _this.pos.y, closest.x, closest.y);
            }
        });
    };
    Particle.prototype.show = function () {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        this.rays.forEach(function (ray) {
            ray.show();
        });
    };
    return Particle;
}());
var Ray = (function () {
    function Ray(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
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
            var pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
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
var walls = [];
var particle;
function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < 5; i++) {
        var x1 = random(width);
        var x2 = random(width);
        var y1 = random(height);
        var y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));
    particle = new Particle();
}
function draw() {
    background(0);
    walls.forEach(function (wall) {
        wall.show();
    });
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);
}
//# sourceMappingURL=build.js.map