var vehicle;
var food = [];
function setup() {
    createCanvas(640, 360);
    vehicle = new Vehicle(width / 2, height / 2);
    for (var i = 0; i < 10; i++) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
}
function draw() {
    background(51);
    var target = createVector(mouseX, mouseY);
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(target.x, target.y, 48, 48);
    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        ellipse(food[i].x, food[i].y, 8, 8);
    }
    vehicle.seek(target);
    vehicle.update();
    vehicle.display();
}
var Vehicle = (function () {
    function Vehicle(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 6;
        this.maxspeed = 8;
        this.maxforce = 0.2;
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
        this.applyForce(steer);
    };
    Vehicle.prototype.display = function () {
        var angle = this.velocity.heading() + PI / 2;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
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