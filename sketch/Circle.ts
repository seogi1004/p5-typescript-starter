class Circle {
    x: number;
    y: number;
    r: number;
    growing: boolean = true;

    constructor(x_: number, y_: number) {
        this.x = x_;
        this.y = y_;
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
        const { x, y, r } = this;
        stroke(255);
        strokeWeight(2);
        noFill();
        ellipse(x, y, r * 2, r * 2);
    }
}
