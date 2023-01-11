// GLOBAL VARS & TYPES
const cols = 25;
const rows = 25;
const grid = new Array(cols);
let w: number;
let h: number;

const openSet: Array<Spot> = [];
const closedSet: Array<Spot> = [];
let start: Spot;
let end: Spot;
let path: Array<Spot> = [];

class Spot {
    i: number;
    j: number;
    f: number;
    g: number;
    h: number;
    neighbors: Spot[];
    previous: Spot;

    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.previous = undefined;
    }

    show(color: p5.Color): void {
        const { i, j } = this;
        fill(color);
        noStroke();
        rect(i * w, j * h, w - 1, h - 1);
    }

    addNeighbors(grid: Spot[][]) {
        const { i, j } = this;
        if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
        if (i > 0) this.neighbors.push(grid[i - 1][j]);
        if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
        if (j > 0) this.neighbors.push(grid[i][j - 1]);
    }
}

function removeFromArray(arr: Spot[], elt: Spot) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a: Spot, b: Spot) {
    // const d = dist(a.i, a.j, b.i, b.j);
    const d = abs(a.i - b.i) - abs(a.j - b.j);
    return d;
}

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
    createCanvas(400, 400);

    w = width / cols;
    h = height / rows;

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    openSet.push(start);

    console.log(grid);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
    if (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        const current = openSet[winner];
        if (current === end) {
            noLoop();
            console.log('DONE!');
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        const neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if (closedSet.indexOf(neighbor) === -1) {
                const tempG = current.g + 1;

                if (openSet.indexOf(neighbor) !== -1) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }

                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        }
        background(0);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].show(color(255));
            }
        }

        for (let i = 0; i < closedSet.length; i++) {
            closedSet[i].show(color(255, 0, 0));
        }

        for (let i = 0; i < openSet.length; i++) {
            openSet[i].show(color(0, 255, 0));
        }

        path = [];
        let temp = current;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }

        for (let i = 0; i < path.length; i++) {
            path[i].show(color(0, 0, 255));
        }
    } else {
        // TODO: no solution
    }
}
