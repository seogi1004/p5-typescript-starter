class Vehicle {
    acceleration: p5.Vector;
    velocity: p5.Vector;
    position: p5.Vector;
    r: number;
    maxspeed: number;
    maxforce: number;
    health: number;
    dna: number[];

    constructor(x: number, y: number) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 4;
        this.maxspeed = 5;
        this.maxforce = 0.2;
        this.health = 1;

        this.dna = [];
        this.dna[0] = random(-2, 2); // Food weight
        this.dna[1] = random(-2, 2); // Poison weight
        this.dna[2] = random(0, 100); // Food perception
        this.dna[3] = random(0, 100); // Poison perception
    }

    update() {
        this.health -= 0.01;

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force: p5.Vector) {
        this.acceleration.add(force);
    }

    seek(target: p5.Vector) {
        const desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxspeed);

        const steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);

        return steer;
    }


    behaviors(good: p5.Vector[], bad: p5.Vector[]) {
        let steerG = this.eat(good, 0.2, this.dna[2]);
        let steerB = this.eat(bad, -0.5, this.dna[3]);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    eat(list: p5.Vector[], nutrition: number, perception: number): p5.Vector {
        let record = Infinity;
        let closet = -1;
        for (let i = 0; i < list.length; i++) {
            const d = this.position.dist(list[i]);
            if (d < record && d < perception) {
                record = d;
                closet = i;
            }
        }

        if (record < 5) {
            list.splice(closet, 1);
            this.health += nutrition;
        } else if (closet > -1) {
            return this.seek(list[closet]);
        }

        return createVector(0, 0)
    }

    dead() {
        return this.health < 0;
    }

    display() {
        // Draw a triangle rotated in the direction of velocity
        const angle = this.velocity.heading() + PI / 2;

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

        const gr = color(0, 255, 0);
        const rd = color(255, 0, 0);
        const col = lerpColor(gr, rd, this.health);

        fill(col);
        stroke(col);
        strokeWeight(1);

        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);

        pop();
    }

    boundaries() {
        const d = 25;

        let desired = null;

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            const steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }
}