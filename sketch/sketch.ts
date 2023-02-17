let values: number[] = [];

let i = 0;
let w = 10;

function setup() {
    createCanvas(800, 200);
    values = new Array(floor(width /  w));
    for ( let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    frameRate(5);
    quickSort(values, 0, values.length - 1);
}

function quickSort(arr: number[], start: number, end: number) {
    if(start >= end) {
        return;
    }
    let index = partition(arr, start, end);
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end)
}

function partition(arr: number[], start: number, end: number): number {
    let pivotIndex = start;
    let pivotValue = arr[end];
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue){
            swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }

    swap(arr, pivotIndex, end);
    return pivotIndex;
}

function swap(arr: number[], a: number,  b: number) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function draw() {
    background(51);
    for (let i = 0; i < values.length; i++) {
        stroke(0);
        fill(255);
        rect(i * w, height - values[i], w, values[i]);
    }
}
