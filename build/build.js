var Circle = (function () {
    function Circle(x_, y_, c_) {
        this.growing = true;
        this.x = x_;
        this.y = y_;
        this.c = c_;
        this.r = 1;
    }
    Circle.prototype.grow = function () {
        var _a = this, r = _a.r, growing = _a.growing;
        if (growing) {
            this.r = r + 0.5;
        }
    };
    Circle.prototype.edges = function () {
        var _a = this, x = _a.x, y = _a.y, r = _a.r;
        return x + r > width || x - r < 0 || y + r > height || y - r < 0;
    };
    Circle.prototype.show = function () {
        var _a = this, x = _a.x, y = _a.y, c = _a.c, r = _a.r;
        fill(c);
        ellipse(x, y, r * 2, r * 2);
    };
    return Circle;
}());
var circles;
var img;
function setup() {
    circles = [];
    loadImage('../data/kitten.jpeg', function (newImg) {
        img = newImg;
        createCanvas(img.width, img.height);
        img.loadPixels();
    });
}
function draw() {
    if (img === undefined)
        return;
    background(0);
    var total = 10;
    var count = 0;
    var attempts = 0;
    while (count < total) {
        var newC = newCircle();
        if (newC !== null) {
            circles.push(newC);
            count++;
        }
        attempts++;
        if (attempts > 1000) {
            noLoop();
            console.log('FINISHED');
            break;
        }
    }
    circles.forEach(function (c) {
        if (c.growing) {
            if (c.edges()) {
                c.growing = false;
            }
            else {
                for (var i = 0; i < circles.length; i++) {
                    var other = circles[i];
                    if (c !== other) {
                        var d = newDist(c.x, c.y, other.x, other.y);
                        if (d < c.r + other.r) {
                            c.growing = false;
                            break;
                        }
                    }
                }
            }
        }
        c.show();
        c.grow();
    });
}
function newCircle() {
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);
    var valid = true;
    for (var i = 0; i < circles.length; i++) {
        var c = circles[i];
        var d = newDist(x, y, c.x, c.y);
        if (d < c.r + 2) {
            valid = false;
            break;
        }
    }
    if (valid) {
        var index = x + y * img.width;
        return new Circle(x, y, color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], img.pixels[index + 3]));
    }
    else {
        return null;
    }
}
function newDist(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}
//# sourceMappingURL=build.js.map