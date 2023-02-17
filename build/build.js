var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var values = [];
var i = 0;
var w = 10;
function setup() {
    createCanvas(800, 200);
    values = new Array(floor(width / w));
    for (var i_1 = 0; i_1 < values.length; i_1++) {
        values[i_1] = random(height);
    }
    quickSort(values, 0, values.length - 1);
}
function quickSort(arr, start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (start >= end) {
                        return [2];
                    }
                    return [4, partition(arr, start, end)];
                case 1:
                    index = _a.sent();
                    return [4, Promise.all([
                            quickSort(arr, start, index - 1),
                            quickSort(arr, index + 1, end)
                        ])];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function partition(arr, start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var pivotIndex, pivotValue, i_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pivotIndex = start;
                    pivotValue = arr[end];
                    i_2 = start;
                    _a.label = 1;
                case 1:
                    if (!(i_2 < end)) return [3, 4];
                    if (!(arr[i_2] < pivotValue)) return [3, 3];
                    return [4, swap(arr, i_2, pivotIndex)];
                case 2:
                    _a.sent();
                    pivotIndex++;
                    _a.label = 3;
                case 3:
                    i_2++;
                    return [3, 1];
                case 4: return [4, swap(arr, pivotIndex, end)];
                case 5:
                    _a.sent();
                    return [2, pivotIndex];
            }
        });
    });
}
function swap(arr, a, b) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, sleep(50)];
                case 1:
                    _a.sent();
                    temp = arr[a];
                    arr[a] = arr[b];
                    arr[b] = temp;
                    return [2];
            }
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function draw() {
    background(51);
    for (var i_3 = 0; i_3 < values.length; i_3++) {
        stroke(0);
        fill(255);
        rect(i_3 * w, height - values[i_3], w, values[i_3]);
    }
}
//# sourceMappingURL=build.js.map