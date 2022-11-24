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
var DIM = 8;
var _BLANK = 0;
var _UP = 1;
var _RIGHT = 2;
var _DOWN = 3;
var _LEFT = 4;
var rules = [
    [
        [_BLANK, _UP],
        [_BLANK, _RIGHT],
        [_BLANK, _DOWN],
        [_BLANK, _LEFT],
    ],
    [
        [_RIGHT, _LEFT, _DOWN],
        [_LEFT, _UP, _DOWN],
        [_BLANK, _DOWN],
        [_RIGHT, _UP, _DOWN],
    ],
    [
        [_RIGHT, _LEFT, _DOWN],
        [_LEFT, _UP, _DOWN],
        [_RIGHT, _LEFT, _UP],
        [_BLANK, _LEFT],
    ],
    [
        [_BLANK, _UP],
        [_LEFT, _UP, _DOWN],
        [_RIGHT, _LEFT, _UP],
        [_RIGHT, _UP, _DOWN],
    ],
    [
        [_RIGHT, _LEFT, _DOWN],
        [_BLANK, _RIGHT],
        [_RIGHT, _LEFT, _UP],
        [_UP, _DOWN, _RIGHT],
    ]
];
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
function checkValid(arr, valid) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var element = arr[i];
        if (valid.indexOf(element) === -1) {
            arr.splice(i, 1);
        }
    }
}
function mousePressed() {
    redraw();
}
function draw() {
    var gridCopy = grid.slice();
    gridCopy = gridCopy.filter(function (a) { return !a.collapsed; });
    if (gridCopy.length === 0) {
        noLoop();
        return;
    }
    else {
        background(0);
    }
    gridCopy.sort(function (a, b) {
        return a.options.length - b.options.length;
    });
    var len = gridCopy[0].options.length;
    var stopIndex = 0;
    for (var i = 1; i < gridCopy.length; i++) {
        if (gridCopy[i].options.length > len) {
            stopIndex = i;
            break;
        }
    }
    if (stopIndex > 0)
        gridCopy.splice(stopIndex);
    var cell = random(gridCopy);
    cell.collapsed = true;
    var pick = random(cell.options);
    cell.options = [pick];
    var w = width / DIM;
    var h = height / DIM;
    for (var j = 0; j < DIM; j++) {
        for (var i = 0; i < DIM; i++) {
            var cell_1 = grid[i + (j * DIM)];
            if (cell_1.collapsed) {
                var index = cell_1.options[0];
                image(tiles[index], i * w, j * h, w, h);
            }
            else {
                fill(0);
                stroke(255);
                rect(i * w, j * h, w, h);
            }
        }
    }
    var nextGrid = [];
    for (var j = 0; j < DIM; j++) {
        for (var i = 0; i < DIM; i++) {
            var index = i + (j * DIM);
            if (grid[index].collapsed) {
                nextGrid[index] = grid[index];
            }
            else {
                var options = [_BLANK, _UP, _RIGHT, _DOWN, _LEFT];
                var validOptions = [];
                if (j > 0) {
                    var up = grid[i + (j - 1) * DIM];
                    for (var _i = 0, _a = up.options; _i < _a.length; _i++) {
                        var option = _a[_i];
                        var valid = rules[option][2];
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                if (i < DIM - 1) {
                    var right = grid[i + 1 + j * DIM];
                    for (var _b = 0, _c = right.options; _b < _c.length; _b++) {
                        var option = _c[_b];
                        var valid = rules[option][3];
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                if (j < DIM - 1) {
                    var down = grid[i + (j + 1) * DIM];
                    for (var _d = 0, _e = down.options; _d < _e.length; _d++) {
                        var option = _e[_d];
                        var valid = rules[option][0];
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                if (i > 0) {
                    var left = grid[i - 1 + j * DIM];
                    for (var _f = 0, _g = left.options; _f < _g.length; _f++) {
                        var option = _g[_f];
                        var valid = rules[option][1];
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                nextGrid[index] = {
                    options: options,
                    collapsed: false,
                };
            }
        }
    }
    grid = nextGrid;
}
//# sourceMappingURL=build.js.map