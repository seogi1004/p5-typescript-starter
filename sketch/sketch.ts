var circles: Circle[];

function setup() {
    createCanvas(640, 360);
    circles = [];
}

function draw() {
    background(0);
    // frameRate(5);

    const total = 10;
    let count = 0;
    let attempts = 0;

    while (count < total) {
        const newC = newCircle();
        if (newC !== null) {
            circles.push(newC);
            count++;
        }
        attempts++;
        if (attempts > 1000) {
            noLoop();
            console.log('FINISHED');
            break;
        }
    }

    circles.forEach((c) => {
        if (c.growing) {
            if (c.edges()) {
                c.growing = false;
            } else {
                for (let i = 0; i < circles.length; i++) {
                    const other = circles[i];
                    if (c !== other) {
                        const d = newDist(c.x, c.y, other.x, other.y);
                        if (d - 2 < c.r + other.r) {
                            c.growing = false;
                            break;
                        }
                    }
                }
            }
        }
        c.show();
        c.grow();
    });
}

function newCircle() {
    const x = Math.random() * width;
    const y = Math.random() * height;

    let valid = true;
    for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        const d = newDist(x, y, c.x, c.y);
        if (d < c.r) {
            valid = false;
            break;
        }
    }

    if (valid) {
        return new Circle(x, y);
    } else {
        return null;
    }
}

function newDist(x1: number, y1: number, x2: number, y2: number) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}
