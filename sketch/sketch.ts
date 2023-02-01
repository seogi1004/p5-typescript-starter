let qtree: QuadTree;

function setup() {
    createCanvas(400, 400);

    let boundary = new Rectangle(200, 200, 200, 200);
    qtree = new QuadTree(boundary, 4);
    console.log(qtree);

    // for (let i = 0; i < 500; i++) {
    //     let p = new Point(random(width), random(height));
    //     qtree.insert(p);
    // }
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
    background(0);
    qtree.show();

    if (mouseIsPressed) {
        let m = new Point(mouseX, mouseY);
    }
}
