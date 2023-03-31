class Vehicle {
    pos: p5.Vector;
    target: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    r: number;
    maxspeed: number;
    maxforce: number;

    constructor(x: number, y: number) {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 8;
        this.maxspeed = 10;
        this.maxforce = 1;
    }

    behaviors() {
        const arrive = this.arrive(this.target);
        const mouse = createVector(mouseX, mouseY);
        const flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    applyForce(f: p5.Vector) {
        this.acc.add(f);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show() {
        stroke(255);
        strokeWeight(8);
        point(this.pos.x, this.pos.y);
    }

    arrive(target: p5.Vector): p5.Vector {
        const desired = p5.Vector.sub(target, this.pos);
        const d = desired.mag();
        let speed = this.maxspeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed)
        const steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    flee(target: p5.Vector): p5.Vector {
        const desired = p5.Vector.sub(target, this.pos);
        const d = desired.mag();

        if (d < 50) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }
}