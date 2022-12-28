var circles: Circle[];
var spots: [number, number][];

function setup() {
    circles = [];
    spots = [];

    loadImage('../data/2022.png', (img) => {
        createCanvas(img.width, img.height);
        img.loadPixels();

        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                const index = x + y * img.width;
                const c = img.pixels[index * 4];
                const b = brightness([c]);
                if (b > 1) {
                    spots.push([x, y]);
                }
            }
        }
    });
}

function draw() {
    background(0);

    const total = 5;
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
                        if (d < c.r + other.r) {
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
    const r = Math.floor(Math.random() * spots.length);
    const spot = spots[r];

    const x = spot[0];
    const y = spot[1];

    let valid = true;
    for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        const d = newDist(x, y, c.x, c.y);
        if (d < c.r + 2) {
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
