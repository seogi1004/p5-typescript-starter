class Boundary {
    a: p5.Vector;
    b: p5.Vector;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}