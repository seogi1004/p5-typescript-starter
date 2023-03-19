let vehicle: Vehicle;
const food: p5.Vector[] = [];

function setup() {
    createCanvas(640, 360)
    vehicle = new Vehicle(width / 2, height / 2);
    for (let i = 0; i < 10; i++) {
        const x = random(width);
        const y = random(height);
        food.push(createVector(x, y));
    }
}

function draw() {
    background(51);

    const target = createVector(mouseX, mouseY);

    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(target.x, target.y, 48, 48);

    for (let i = 0; i < food.length; i++) {
        fill(0, 255, 0)
        ellipse(food[i].x, food[i].y, 8, 8);
    }

    vehicle.seek(target);
    vehicle.update();
    vehicle.display();

}
