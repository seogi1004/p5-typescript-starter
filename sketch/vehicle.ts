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
        this.dna[0] = random(-5, 5);
        this.dna[1] = random(-5, 5);
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
        let steerG = this.eat(good, 0.1);
        let steerB = this.eat(bad, -0.5);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    eat(list: p5.Vector[], nutrition: number): p5.Vector {
        let record = Infinity;
        let closet = -1;
        for (let i = 0; i < list.length; i++) {
            var d = this.position.dist(list[i]);
            if (d < record) {
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

        stroke(0, 255, 0);
        line(0, 0, 0, -this.dna[0] * 20);
        stroke(255, 0, 0);
        line(0, 0, 0, -this.dna[1] * 20);

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
}