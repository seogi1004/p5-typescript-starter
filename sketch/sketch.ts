let values: number[] = [];

let i = 0;
let w = 10;

function setup() {
    createCanvas(800, 200);
    values = new Array(floor(width /  w));
    for ( let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    frameRate(5);
}

function draw() {
    background(51);
    for (let i = 0; i < values.length; i++) {
        stroke(0);
        fill(255);
        rect(i * w, height - values[i], w, values[i]);
    }
}
