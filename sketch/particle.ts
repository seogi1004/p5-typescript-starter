class Particle {
    x: number;
    y: number;
    r: number;
    highlight: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = 4;
        this.highlight = false;
    }

    setHighlight(value: boolean) {
        this.highlight = value;
    }

    intersects(other: Particle): boolean {
        let d = dist(this.x, this.y, other.x, other.y);

        return d < this.r + other.r;
    }

    move() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    render() {
        noStroke();
        if (this.highlight) {
            fill(255);
        } else {
            fill(100);
        }
        ellipse(this.x, this.y, this.r * 2);
    }
}
