const flock: Boid[] = [];

let alignSlider: p5.Element,
    cohesionSlider: p5.Element,
    separationSlider: p5.Element;

function setup() {
    createCanvas(640, 360);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    for (let i = 0; i < 200; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    // CLEAR BACKGROUND
    background(51);

    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
