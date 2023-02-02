class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point: Point) {
        return (
            point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h
        );
    }
}

class QuadTree {
    boundary: Rectangle;
    capacity: number;
    points: Point[];
    northwest: QuadTree;
    northeast: QuadTree;
    southwest: QuadTree;
    southeast: QuadTree;
    divided: boolean;

    constructor(boundary: Rectangle, n: number) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        const { x, y, w, h } = this.boundary;
        const capacity = this.capacity;

        let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, capacity);

        let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, capacity);

        let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, capacity);

        let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, capacity);

        this.divided = true;
    }

    insert(point: Point): boolean {
        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            if (this.northeast.insert(point)) return true;
            else if (this.northwest.insert(point)) return true;
            else if (this.southeast.insert(point)) return true;
            else if (this.southwest.insert(point)) return true;
        }
    }

    show() {
        const { x, y, w, h } = this.boundary;
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(x, y, w * 2, h * 2);

        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }

        // for (let p of this.points) {
        //     strokeWeight(4);
        //     point(p.x, p.y);
        // }
    }
}
