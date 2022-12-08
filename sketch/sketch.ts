const density = 'N@#W$9876543210?!abc;:+=-,._ ';

let gloria: p5.Image;

function preload() {
    gloria = loadImage('./asset/gloria48.jpg');
}

function setup() {
    // createCanvas(400, 400)
    noCanvas();
    // background(0);
    // image(gloria, 0, 0, width, height);

    let w = width / gloria.width;
    let h = height / gloria.height;
    gloria.loadPixels();

    let asciiImage = '';
    let asciiDiv = createDiv();
    for (let j = 0; j < gloria.width; j++) {
        for (let i = 0; i < gloria.height; i++) {
            const pixelIndex = (i + j * gloria.width) * 4;
            const r = gloria.pixels[pixelIndex + 0];
            const g = gloria.pixels[pixelIndex + 1];
            const b = gloria.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;
            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, len, 0));

            const c = density.charAt(charIndex);
            if (c === '') asciiImage += '&nbsp;';
            else asciiImage += c;

            // noStroke();
            // fill(avg);
            // square(i * w, j * h, w);
            // textSize(w);
            // textAlign(CENTER, CENTER);
            // text('G', i * w + w * 0.5, j * h + h * 0.5)
        }
        asciiImage += '<br/>';
    }

    asciiDiv.html(asciiImage);
}
