var Boid = (function () {
    function Boid() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 5;
    }
    Boid.prototype.edges = function () {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    };
    Boid.prototype.separation = function (boids) {
        var perceptionRadius = 24;
        var steering = createVector();
        var total = 0;
        for (var _i = 0, boids_1 = boids; _i < boids_1.length; _i++) {
            var other = boids_1[_i];
            var d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other !== this && d < perceptionRadius) {
                var diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    };
    Boid.prototype.cohesion = function (boids) {
        var perceptionRadius = 50;
        var steering = createVector();
        var total = 0;
        for (var _i = 0, boids_2 = boids; _i < boids_2.length; _i++) {
            var other = boids_2[_i];
            var d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other !== this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    };
    Boid.prototype.align = function (boids) {
        var perceptionRadius = 25;
        var steering = createVector();
        var total = 0;
        for (var _i = 0, boids_3 = boids; _i < boids_3.length; _i++) {
            var other = boids_3[_i];
            var d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other !== this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    };
    Boid.prototype.flock = function (boids) {
        var alignment = this.align(boids);
        var cohesion = this.cohesion(boids);
        var separation = this.separation(boids);
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    };
    Boid.prototype.update = function () {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    };
    Boid.prototype.show = function () {
        strokeWeight(6);
        stroke(255);
        point(this.position.x, this.position.y);
    };
    return Boid;
}());
var flock = [];
var alignSlider, cohesionSlider, separationSlider;
function setup() {
    createCanvas(640, 360);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    for (var i = 0; i < 200; i++) {
        flock.push(new Boid());
    }
}
function draw() {
    background(51);
    for (var _i = 0, flock_1 = flock; _i < flock_1.length; _i++) {
        var boid = flock_1[_i];
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
//# sourceMappingURL=build.js.map