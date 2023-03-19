let vehicle: Vehicle;
let food: p5.Vector[] = [];
let poision: p5.Vector[] = [];

function setup() {
    createCanvas(640, 360)
    vehicle = new Vehicle(width / 2, height / 2);
    for (let i = 0; i < 10; i++) {
        const x = random(width);
        const y = random(height);
        food.push(createVector(x, y));
    }
    for (let i = 0; i < 10; i++) {
        const x = random(width);
        const y = random(height);
        poision.push(createVector(x, y));
    }
}

function draw() {
    background(51);

    for (let i = 0; i < food.length; i++) {
        fill(0, 255, 0)
        ellipse(food[i].x, food[i].y, 8, 8);
    }

    for (let i = 0; i < poision.length; i++) {
        fill(255, 0, 0)
        ellipse(poision[i].x, poision[i].y, 8, 8);
    }

    vehicle.eat(food);
    // vehicle.seek(target);
    vehicle.update();
    vehicle.display();

}
