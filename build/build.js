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
var density = 'N@#W$9876543210?!abc;:+=-,._ ';
var gloria;
function preload() {
    gloria = loadImage('./asset/dog4.png');
}
function setup() {
    noCanvas();
    var w = width / gloria.width;
    var h = height / gloria.height;
    gloria.loadPixels();
    var asciiImage = '';
    var asciiDiv = createDiv();
    for (var j = 0; j < gloria.width; j++) {
        for (var i = 0; i < gloria.height; i++) {
            var pixelIndex = (i + j * gloria.width) * 4;
            var r = gloria.pixels[pixelIndex + 0];
            var g = gloria.pixels[pixelIndex + 1];
            var b = gloria.pixels[pixelIndex + 2];
            var avg = (r + g + b) / 3;
            var len = density.length;
            var charIndex = floor(map(avg, 0, 255, len, 0));
            var c = density.charAt(charIndex);
            if (c === '')
                asciiImage += '&nbsp;';
            else
                asciiImage += c;
        }
        asciiImage += '<br/>';
    }
    asciiDiv.html(asciiImage);
}
//# sourceMappingURL=build.js.map