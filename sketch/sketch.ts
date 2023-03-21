let vehicles: Vehicle[] = [];
let food: p5.Vector[] = [];
let poison: p5.Vector[] = [];

function setup() {
    createCanvas(640, 360)
    for (let i = 0; i < 10; i++) {
        const x = random(width);
        const y = random(height);
        vehicles[i] = new Vehicle(x, y);
    }

    for (let i = 0; i < 40; i++) {
        const x = random(width);
        const y = random(height);
        food.push(createVector(x, y));
    }
    for (let i = 0; i < 20; i++) {
        const x = random(width);
        const y = random(height);
        poison.push(createVector(x, y));
    }
}

function draw() {
    background(51);

    if (random(1) < 0.05) {
        const x = random(width);
        const y = random(height);
        food.push(createVector(x, y));
    }
    if (random(1) < 0.05) {
        const x = random(width);
        const y = random(height);
        poison.push(createVector(x, y));
    }

    for (let i = 0; i < food.length; i++) {
        fill(0, 255, 0)
        ellipse(food[i].x, food[i].y, 8, 8);
    }

    for (let i = 0; i < poison.length; i++) {
        fill(255, 0, 0)
        ellipse(poison[i].x, poison[i].y, 8, 8);
    }

    for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        vehicles[i].update();
        vehicles[i].display();

        if (vehicles[i].dead()) {
            vehicles.splice(i, 1);
        }
    }

}
