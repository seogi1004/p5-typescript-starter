var vehicles = [];
var food = [];
var poison = [];
function setup() {
    createCanvas(640, 360);
    for (var i = 0; i < 50; i++) {
        var x = random(width);
        var y = random(height);
        vehicles[i] = new Vehicle(x, y);
    }
    for (var i = 0; i < 40; i++) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
    for (var i = 0; i < 20; i++) {
        var x = random(width);
        var y = random(height);
        poison.push(createVector(x, y));
    }
}
function mouseDragged() {
    vehicles.push(new Vehicle(mouseX, mouseY));
}
function draw() {
    background(51);
    if (random(1) < 0.1) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
    if (random(1) < 0.05) {
        var x = random(width);
        var y = random(height);
        poison.push(createVector(x, y));
    }
    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        ellipse(food[i].x, food[i].y, 4, 4);
    }
    for (var i = 0; i < poison.length; i++) {
        fill(255, 0, 0);
        ellipse(poison[i].x, poison[i].y, 4, 4);
    }
    for (var i = vehicles.length - 1; i >= 0; i--) {
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        vehicles[i].update();
        vehicles[i].display();
        var newVehicle = vehicles[i].clone();
        if (newVehicle !== null) {
            vehicles.push(newVehicle);
        }
        if (vehicles[i].dead()) {
            var x = vehicles[i].position.x;
            var y = vehicles[i].position.y;
            food.push(createVector(x, y));
            vehicles.splice(i, 1);
        }
    }
}
var Vehicle = (function () {
    function Vehicle(x, y, dna) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 4;
        this.maxspeed = 5;
        this.maxforce = 0.2;
        this.health = 1;
        this.dna = [];
        if (dna !== undefined) {
            this.dna[0] = dna[0];
            this.dna[1] = dna[1];
            this.dna[2] = dna[2];
            this.dna[3] = dna[3];
        }
        else {
            var mr = 0.1;
            this.dna[0] = random(-2, 2);
            if (random(1) < mr) {
                this.dna[0] += random(-0.1, 0.1);
            }
            this.dna[1] = random(-2, 2);
            if (random(1) < mr) {
                this.dna[1] += random(-0.1, 0.1);
            }
            this.dna[2] = random(0, 100);
            if (random(1) < mr) {
                this.dna[2] += random(-10, 10);
            }
            this.dna[3] = random(0, 100);
            if (random(1) < mr) {
                this.dna[3] += random(-10, 10);
            }
        }
    }
    Vehicle.prototype.update = function () {
        this.health -= 0.01;
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
        var steerG = this.eat(good, 0.3, this.dna[2]);
        var steerB = this.eat(bad, -0.75, this.dna[3]);
        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);
        this.applyForce(steerG);
        this.applyForce(steerB);
    };
    Vehicle.prototype.clone = function () {
        if (random(1) < 0.005) {
            return new Vehicle(this.position.x, this.position.y, this.dna);
        }
        else {
            return null;
        }
    };
    Vehicle.prototype.eat = function (list, nutrition, perception) {
        var record = Infinity;
        var closet = null;
        for (var i = list.length - 1; i >= 0; i--) {
            var d = this.position.dist(list[i]);
            if (d < this.maxspeed) {
                list.splice(i, 1);
                this.health += nutrition;
            }
            else {
                if (d < record && d < perception) {
                    record = d;
                    closet = list[i];
                }
            }
        }
        if (closet !== null) {
            return this.seek(closet);
        }
        return createVector(0, 0);
    };
    Vehicle.prototype.dead = function () {
        return this.health < 0;
    };
    Vehicle.prototype.display = function () {
        var angle = this.velocity.heading() + PI / 2;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        strokeWeight(3);
        stroke(0, 255, 0);
        noFill();
        line(0, 0, 0, -this.dna[0] * 25);
        strokeWeight(2);
        ellipse(0, 0, this.dna[2] * 2);
        stroke(255, 0, 0);
        line(0, 0, 0, -this.dna[1] * 25);
        ellipse(0, 0, this.dna[3] * 2);
        var gr = color(0, 255, 0);
        var rd = color(255, 0, 0);
        var col = lerpColor(gr, rd, this.health);
        fill(col);
        stroke(col);
        strokeWeight(1);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    };
    Vehicle.prototype.boundaries = function () {
        var d = 25;
        var desired = null;
        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        }
        else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }
        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed);
        }
        else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }
        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    };
    return Vehicle;
}());
//# sourceMappingURL=build.js.map