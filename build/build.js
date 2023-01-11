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
var cols = 25;
var rows = 25;
var grid = new Array(cols);
var w;
var h;
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
var Spot = (function () {
    function Spot(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.previous = undefined;
    }
    Spot.prototype.show = function (color) {
        var _a = this, i = _a.i, j = _a.j;
        fill(color);
        noStroke();
        rect(i * w, j * h, w - 1, h - 1);
    };
    Spot.prototype.addNeighbors = function (grid) {
        var _a = this, i = _a.i, j = _a.j;
        if (i < cols - 1)
            this.neighbors.push(grid[i + 1][j]);
        if (i > 0)
            this.neighbors.push(grid[i - 1][j]);
        if (j < rows - 1)
            this.neighbors.push(grid[i][j + 1]);
        if (j > 0)
            this.neighbors.push(grid[i][j - 1]);
    };
    return Spot;
}());
function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}
function heuristic(a, b) {
    var d = abs(a.i - b.i) - abs(a.j - b.j);
    return d;
}
function setup() {
    createCanvas(400, 400);
    w = width / cols;
    h = height / rows;
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    openSet.push(start);
    console.log(grid);
}
function draw() {
    if (openSet.length > 0) {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];
        if (current === end) {
            noLoop();
            console.log('DONE!');
        }
        removeFromArray(openSet, current);
        closedSet.push(current);
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (closedSet.indexOf(neighbor) === -1) {
                var tempG = current.g + 1;
                if (openSet.indexOf(neighbor) !== -1) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                }
                else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        }
        background(0);
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j].show(color(255));
            }
        }
        for (var i = 0; i < closedSet.length; i++) {
            closedSet[i].show(color(255, 0, 0));
        }
        for (var i = 0; i < openSet.length; i++) {
            openSet[i].show(color(0, 255, 0));
        }
        path = [];
        var temp = current;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }
        for (var i = 0; i < path.length; i++) {
            path[i].show(color(0, 0, 255));
        }
    }
    else {
    }
}
//# sourceMappingURL=build.js.map