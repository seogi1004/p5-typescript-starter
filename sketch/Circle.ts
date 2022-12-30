class Circle {
    x: number;
    y: number;
    r: number;
    c: p5.Color;
    growing: boolean = true;

    constructor(x_: number, y_: number, c_: p5.Color) {
        this.x = x_;
        this.y = y_;
        this.c = c_;
        this.r = 1;
    }

    grow(): void {
        const { r, growing } = this;
        if (growing) {
            this.r = r + 0.5;
        }
    }

    edges(): boolean {
        const { x, y, r } = this;
        return x + r > width || x - r < 0 || y + r > height || y - r < 0;
    }

    show(): void {
        const { x, y, c, r } = this;
        // stroke(255);
        // strokeWeight(2);
        // noFill();
        fill(c);
        ellipse(x, y, r * 2, r * 2);
    }
}
