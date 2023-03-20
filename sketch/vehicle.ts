class Vehicle {
    acceleration: p5.Vector;
    velocity: p5.Vector;
    position: p5.Vector;
    r: number;
    maxspeed: number;
    maxforce: number;
    dna: number[];

    constructor(x: number, y: number) {
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

    update() {
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
        let steerG = this.eat(good);
        let steerB = this.eat(bad);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    eat(list: p5.Vector[]): p5.Vector {
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
        } else if (closet > -1) {
            return this.seek(list[closet]);
        }

        return createVector(0, 0)
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

        fill(127);
        stroke(200);
        strokeWeight(1);

        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);

        pop();
    }
}