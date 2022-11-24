interface GridNode {
  collapsed: boolean;
  options: number[];
}

// GLOBAL VARS & TYPES
const tiles: p5.Image[] = [];
const grid: GridNode[] = [];

const DIM = 2;
const _BLANK = 0;
const _UP = 1;
const _RIGHT = 2;
const _DOWN = 3;
const _LEFT = 4;

function preload() {
  tiles[0] = loadImage('../tiles/blank.png')
  tiles[1] = loadImage('../tiles/up.png')
  tiles[2] = loadImage('../tiles/right.png')
  tiles[3] = loadImage('../tiles/down.png')
  tiles[4] = loadImage('../tiles/left.png')
}
function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [_BLANK, _UP, _RIGHT, _DOWN, _LEFT]
    }
  }

  // grid[0].collapsed = true;
  // grid[0].options = [_UP];
}

function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM;

  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      // j=0, 0*2+0 = 0
      // j=0, 0*2+1 = 1;
      // j=1, 1*2+0 = 2;
      // j=1, 1*2+1 = 3;
      let cell = grid[i + (j * DIM)];

      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index], i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(i * w, j * h, w, h);
        // y=0, x=0
        // y=0, x=200
        // y=200, x=0
        // y=200, x=200
      }
    }
  }
}