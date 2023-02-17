var values = [];
var i = 0;
var w = 10;
function setup() {
    createCanvas(800, 200);
    values = new Array(floor(width / w));
    for (var i_1 = 0; i_1 < values.length; i_1++) {
        values[i_1] = random(height);
    }
    frameRate(5);
}
function draw() {
    background(51);
    for (var i_2 = 0; i_2 < values.length; i_2++) {
        stroke(0);
        fill(255);
        rect(i_2 * w, height - values[i_2], w, values[i_2]);
    }
}
//# sourceMappingURL=build.js.map