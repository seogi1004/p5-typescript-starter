let values: number[] = [];

let i = 0;
let w = 10;

function setup() {
    createCanvas(800, 200);
    values = new Array(floor(width /  w));
    for ( let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    quickSort(values, 0, values.length - 1);
}

async function quickSort(arr: number[], start: number, end: number) {
    if(start >= end) {
        return;
    }
    let index =  await partition(arr, start, end);

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ])
}

async function partition(arr: number[], start: number, end: number): Promise<number> {
    let pivotIndex = start;
    let pivotValue = arr[end];
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue){
            await swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }

    await swap(arr, pivotIndex, end);
    return pivotIndex;
}

async function swap(arr: number[], a: number,  b: number) {
    await sleep(50);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    background(51);
    for (let i = 0; i < values.length; i++) {
        stroke(0);
        fill(255);
        rect(i * w, height - values[i], w, values[i]);
    }
}
