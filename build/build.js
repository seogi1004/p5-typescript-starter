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
        this.fov = 45;
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0;
        for (var a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }
    Particle.prototype.move = function (dist) {
        var vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(dist);
        this.pos.add(vel);
    };
    Particle.prototype.updateFOV = function (fov) {
        this.fov = fov;
        this.rays = [];
        for (var a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a) + this.heading));
        }
    };
    Particle.prototype.rotate = function (angle) {
        this.heading += angle;
        var index = 0;
        for (var a = -this.fov / 2; a < this.fov / 2; a += 1) {
            if (this.rays[index]) {
                this.rays[index].setAngle(radians(a) + this.heading);
                index++;
            }
        }
    };
    Particle.prototype.update = function (x, y) {
        this.pos.set(x, y);
    };
    Particle.prototype.look = function (walls) {
        var _this = this;
        var scene = [];
        this.rays.forEach(function (ray, i) {
            var closest = null;
            var record = Infinity;
            walls.forEach(function (wall) {
                var pt = ray.cast(wall);
                if (pt) {
                    var d = p5.Vector.dist(_this.pos, pt);
                    var a = ray.dir.heading() - _this.heading;
                    if (!mouseIsPressed) {
                        d *= cos(a);
                    }
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
            scene[i] = record;
        });
        return scene;
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
    Ray.prototype.setAngle = function (angle) {
        this.dir = p5.Vector.fromAngle(angle);
    };
    return Ray;
}());
var walls = [];
var particle;
var sceneW = 400;
var sceneH = 400;
var sliderFOV;
function setup() {
    createCanvas(800, 400);
    for (var i = 0; i < 5; i++) {
        var x1 = random(sceneW);
        var x2 = random(sceneW);
        var y1 = random(sceneH);
        var y2 = random(sceneH);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(0, 0, sceneW, 0));
    walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
    walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
    walls.push(new Boundary(0, sceneH, 0, 0));
    particle = new Particle();
    sliderFOV = createSlider(0, 360, 45);
    sliderFOV.input(changeFOV);
}
function changeFOV() {
    var fov = sliderFOV.value();
    particle.updateFOV(fov);
}
function draw() {
    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.1);
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.1);
    }
    else if (keyIsDown(UP_ARROW)) {
        particle.move(1);
    }
    else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-1);
    }
    background(0);
    walls.forEach(function (wall) {
        wall.show();
    });
    particle.show();
    var scene = particle.look(walls);
    var w = sceneW / scene.length;
    push();
    translate(sceneW, 0);
    for (var i = 0; i < scene.length; i++) {
        noStroke();
        var sq_1 = scene[i] * scene[i];
        var wSq = sceneW * sceneW;
        var b = map(sq_1, 0, wSq, 255, 0);
        var h = map(scene[i], 0, sceneW, sceneH, 0);
        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2, w + 1, h);
    }
    pop();
}
//# sourceMappingURL=build.js.map