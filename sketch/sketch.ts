let vehicle: Vehicle;
let food: p5.Vector[] = [];
let poison: p5.Vector[] = [];

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
        poison.push(createVector(x, y));
    }
}

function draw() {
    background(51);

    for (let i = 0; i < food.length; i++) {
        fill(0, 255, 0)
        ellipse(food[i].x, food[i].y, 8, 8);
    }

    for (let i = 0; i < poison.length; i++) {
        fill(255, 0, 0)
        ellipse(poison[i].x, poison[i].y, 8, 8);
    }

    vehicle.behaviors(food, poison);

    // vehicle.eat(food);
    // vehicle.seek(target);
    vehicle.update();
    vehicle.display();

}
