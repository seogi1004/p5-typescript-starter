var vehicle;
var food = [];
var poison = [];
function setup() {
    createCanvas(640, 360);
    vehicle = new Vehicle(width / 2, height / 2);
    for (var i = 0; i < 10; i++) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
    for (var i = 0; i < 10; i++) {
        var x = random(width);
        var y = random(height);
        poison.push(createVector(x, y));
    }
}
function draw() {
    background(51);
    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        ellipse(food[i].x, food[i].y, 8, 8);
    }
    for (var i = 0; i < poison.length; i++) {
        fill(255, 0, 0);
        ellipse(poison[i].x, poison[i].y, 8, 8);
    }
    vehicle.behaviors(food, poison);
    vehicle.update();
    vehicle.display();
}
var Vehicle = (function () {
    function Vehicle(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 6;
        this.maxspeed = 5;
        this.maxforce = 0.2;
        this.dna = [];
        this.dna[0] = random(-5, 5);
        this.dna[1] = random(-5, 5);
    }
    Vehicle.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };
    Vehicle.prototype.applyForce = function (force) {
        this.acceleration.add(force);
    };
    Vehicle.prototype.seek = function (target) {
        var desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxspeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        return steer;
    };
    Vehicle.prototype.behaviors = function (good, bad) {
        var steerG = this.eat(good);
        var steerB = this.eat(bad);
        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);
        this.applyForce(steerG);
        this.applyForce(steerB);
    };
    Vehicle.prototype.eat = function (list) {
        var record = Infinity;
        var closet = -1;
        for (var i = 0; i < list.length; i++) {
            var d = this.position.dist(list[i]);
            if (d < record) {
                record = d;
                closet = i;
            }
        }
        if (record < 5) {
            list.splice(closet, 1);
        }
        else if (closet > -1) {
            return this.seek(list[closet]);
        }
        return createVector(0, 0);
    };
    Vehicle.prototype.display = function () {
        var angle = this.velocity.heading() + PI / 2;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        stroke(0, 255, 0);
        line(0, 0, 0, -this.dna[0] * 20);
        stroke(255, 0, 0);
        line(0, 0, 0, -this.dna[1] * 20);
        fill(127);
        stroke(200);
        strokeWeight(1);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    };
    return Vehicle;
}());
//# sourceMappingURL=build.js.map