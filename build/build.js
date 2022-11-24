var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var PolygonHelper = (function () {
    function PolygonHelper() {
    }
    PolygonHelper.draw = function (numberOfSides, width) {
        push();
        var angle = TWO_PI / numberOfSides;
        var radius = width / 2;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = cos(a) * radius;
            var sy = sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
        pop();
    };
    return PolygonHelper;
}());
var tiles = [];
var grid = [];
var DIM = 2;
var _BLANK = 0;
var _UP = 1;
var _RIGHT = 2;
var _DOWN = 3;
var _LEFT = 4;
function preload() {
    tiles[0] = loadImage('../tiles/blank.png');
    tiles[1] = loadImage('../tiles/up.png');
    tiles[2] = loadImage('../tiles/right.png');
    tiles[3] = loadImage('../tiles/down.png');
    tiles[4] = loadImage('../tiles/left.png');
}
function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < DIM * DIM; i++) {
        grid[i] = {
            collapsed: false,
            options: [_BLANK, _UP, _RIGHT, _DOWN, _LEFT]
        };
    }
}
function draw() {
    background(0);
    var w = width / DIM;
    var h = height / DIM;
    for (var j = 0; j < DIM; j++) {
        for (var i = 0; i < DIM; i++) {
            var cell = grid[i + (j * DIM)];
            if (cell.collapsed) {
                var index = cell.options[0];
                image(tiles[index], i * w, j * h, w, h);
            }
            else {
                fill(0);
                stroke(255);
                rect(i * w, j * h, w, h);
            }
        }
    }
}
//# sourceMappingURL=build.js.map