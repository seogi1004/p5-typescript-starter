class Particle {
    pos: p5.Vector;
    rays: Ray[];
    heading: number;
    fov: number;

    constructor() {
        this.fov = 45;
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    move(dist: number) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(dist);
        this.pos.add(vel);
    }

    updateFOV(fov: number) {
        this.fov = fov;
        this.rays = [];
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a) + this.heading));
        }
    }

    rotate(angle: number) {
        this.heading += angle;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            if (this.rays[index]) {
                this.rays[index].setAngle(radians(a) + this.heading);
                index++;
            }
        }
    }

    update(x: number, y: number) {
        this.pos.set(x, y);
    }

    look(walls: Boundary[]) {
        const scene: number[] = [];
        this.rays.forEach((ray, i ) => {
            let closest: p5.Vector = null;
            let record = Infinity;
            walls.forEach(wall => {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - this.heading;
                    if (!mouseIsPressed) {
                        d *= cos(a)
                    }
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            });
            if (closest) {
                stroke(255, 100)
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            scene[i] = record;
        });
        return scene;
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        this.rays.forEach(ray => {
            ray.show();
        })
    }
}