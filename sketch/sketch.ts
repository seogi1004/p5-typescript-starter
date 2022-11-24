interface GridNode {
  collapsed: boolean;
  options: number[];
}

// GLOBAL VARS & TYPES
const tiles: p5.Image[] = [];
let grid: GridNode[] = [];

const DIM = 8;

const _BLANK = 0;
const _UP = 1;
const _RIGHT = 2;
const _DOWN = 3;
const _LEFT = 4;

const rules = [
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
]

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
  // grid[2].options = [_BLANK, _UP];
  // grid[0].options = [_BLANK, _UP];
}

function checkValid(arr: number[], valid: number[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (valid.indexOf(element) === -1) {
      arr.splice(i, 1);
    }
  }
}

function mousePressed() {
  redraw();
}
function draw() {
  let gridCopy = grid.slice();
  gridCopy = gridCopy.filter((a) => !a.collapsed);

  if (gridCopy.length === 0) {
    noLoop();
    return;
  } else {
    background(0);
  }

  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  // 옵션 길이가 가장 낮은거부터 시작함
  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }

  if (stopIndex > 0) gridCopy.splice(stopIndex);

  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options = [pick];

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

  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + (j * DIM);
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = [_BLANK, _UP, _RIGHT, _DOWN, _LEFT];
        let validOptions: number[] = [];

        // UP
        if (j > 0) {
          let up = grid[i + (j - 1) * DIM];
          for(let option of up.options) {
            let valid = rules[option][2];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // RIGHT
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          for(let option of right.options) {
            let valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // DOWN
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          for(let option of down.options) {
            let valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // LEFT
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          for(let option of left.options) {
            let valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        nextGrid[index] = {
          options,
          collapsed: false,
        }
      }
    }
  }

  grid = nextGrid;
  // noLoop();
}