let particles: Particle[] = [];

function setup() {
    createCanvas(600, 400);

    for (let i = 0; i < 1000; i++) {
        particles[i] = new Particle(random(width), random(height));
    }
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
    background(0);

    let boundary = new Rectangle<Particle>(300, 200, 600, 400);
    let qtree: QuadTree<Particle> = new QuadTree(boundary, 4);

    for (let p of particles) {
        let point = new Point(p.x, p.y, p);
        qtree.insert(point);
        p.move();
        p.render();
        p.setHighlight(false);
    }

    for (let p of particles) {
        let range = new Circle(p.x, p.y, p.r * 2);
        let points = qtree.query<Circle<Particle>>(range);
        for (let point of points) {
            let other = point.userData;
            // for (let other of particles) {
            if (p !== other && p.intersects(other)) {
                p.setHighlight(true);
            }
        }
    }
}
