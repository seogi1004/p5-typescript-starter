class Boid {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    maxForce: number;
    maxSpeed: number;

    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = width;
        } else if (this.position.x < 0) {
            this.position.x = 0;
        }

        if (this.position.y > height) {
            this.position.y = height;
        } else if (this.position.y < 0) {
            this.position.y = 0;
        }
    }

    cohesion(boids: Boid[]) {
        let perceptionRadius = 10;
        let steering = createVector();
        let total = 0;

        for (let other of boids) {
            const d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
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
    }

    align(boids: Boid[]) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;

        for (let other of boids) {
            const d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
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
    }

    flock(boids: Boid[]) {
        // let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        // this.acceleration = alignment;
        this.acceleration = cohesion;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}
