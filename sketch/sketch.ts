let font: p5.Font;
let vehicles: Vehicle[] = [];

function preload() {
    font = loadFont('./build/AvenirNextLTPro-Demi.otf')
}

function setup() {
    createCanvas(600, 300);
    // textFont(font);
    // textSize(192);
    // fill(255);
    // noStroke();
    // text('train', 100, 200);

    let points = font.textToPoints('train', 100, 200, 192);
    points.forEach(pt => {
        const vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    })
}

function draw() {
    background(51)
    vehicles.forEach(v => {
        v.behaviors();
        v.update();
        v.show();
    });
}
