let circles: Circle[];
let img: p5.Image;

function setup() {
    circles = [];

    loadImage('../data/kitten.jpeg', (newImg: p5.Image) => {
        img = newImg;
        createCanvas(img.width, img.height);
        img.loadPixels();

        console.log(img.pixels.slice(0, 16));
    });
}

function draw() {
    if (img === undefined) return;

    background(0);

    const total = 30;
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
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

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
        const index = (x + y * img.width) * 4;
        const r = img.pixels[index];
        const g = img.pixels[index + 1];
        const b = img.pixels[index + 2];
        const a = img.pixels[index + 3];
        return new Circle(x, y,
            color(r, g, b, a)
        );
    } else {
        return null;
    }
}

function newDist(x1: number, y1: number, x2: number, y2: number) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}
