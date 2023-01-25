const flock: Boid[] = [];

function setup() {
    createCanvas(640, 360);
    for (let i = 0; i < 100; i++) {
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
