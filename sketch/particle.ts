class Particle {
    pos: p5.Vector;
    rays: Ray[];

    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let i = 0; i < 360; i += 1) {
            this.rays[i] = new Ray(this.pos, radians(i));
        }
    }

    update(x: number, y: number) {
        this.pos.set(x, y);
    }

    look(walls: Boundary[]) {
        this.rays.forEach(ray => {
            let closest: p5.Vector = null;
            let record = Infinity;
            walls.forEach(wall => {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
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
        })
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        this.rays.forEach(ray => {
            ray.show();
        })
    }
}