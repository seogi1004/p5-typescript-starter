class Point<T> {
    x: number;
    y: number;
    userData: T;

    constructor(x: number, y: number, userData: T) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}

class Rectangle<T> {
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

    contains(point: Point<T>) {
        return (
            point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h
        );
    }

    intersects(range: Rectangle<T>) {
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
        );
    }
}

class Circle<T> extends Rectangle<T> {
    x: number;
    y: number;
    r: number;
    rSquared: number;

    constructor(x: number, y: number, r: number) {
        super(x, y, r, r);
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }

    contains(point: Point<T>) {
        // check if the point is in the circle by checking if the euclidean distance of
        // the point and the center of the circle if smaller or equal to the radius of
        // the circle
        let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
        return d <= this.rSquared;
    }

    intersects(range: Rectangle<T>) {
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);

        // radius of the circle
        let r = this.r;

        let w = range.w;
        let h = range.h;

        let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

        // no intersection
        if (xDist > r + w || yDist > r + h) return false;

        // intersection within the circle
        if (xDist <= w || yDist <= h) return true;

        // intersection on the edge of the circle
        return edges <= this.rSquared;
    }
}

class QuadTree<T> {
    boundary: Rectangle<T>;
    capacity: number;
    points: Point<T>[];
    northwest: QuadTree<T>;
    northeast: QuadTree<T>;
    southwest: QuadTree<T>;
    southeast: QuadTree<T>;
    divided: boolean;

    constructor(boundary: Rectangle<T>, n: number) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        const { x, y, w, h } = this.boundary;
        const capacity = this.capacity;

        let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.northwest = new QuadTree<T>(nw, capacity);

        let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree<T>(ne, capacity);

        let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree<T>(sw, capacity);

        let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree<T>(se, capacity);

        this.divided = true;
    }

    insert(point: Point<T>): boolean {
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

    query<S extends Rectangle<T>>(range: S, found?: Point<T>[]): Point<T>[] {
        if (!found) found = [];

        if (!this.boundary.intersects(range)) {
            return found;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }

            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
        }

        return found;
    }

    show() {
        const { x, y, w, h } = this.boundary;
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(x, y, w * 2, h * 2);

        for (let p of this.points) {
            strokeWeight(2);
            point(p.x, p.y);
        }

        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
    }
}
