import { readFileSync } from "fs";

let data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(l => '.' + l + '.');

data.unshift(Array(data[0].length).fill('.').join(''));
data.push(Array(data[0].length).fill('.').join(''));

/**
 * @param {number} row
 * @param {number} col
 * @param {string[][]} input
 */
function occupiedSeatsAround(row, col, input) {
    const arround =
        [
            input[row - 1][col - 1], input[row - 1][col - 0], input[row - 1][col + 1],
            input[row - 0][col - 1], input[row - 0][col + 1],
            input[row + 1][col - 1], input[row + 1][col - 0], input[row + 1][col + 1]
        ];
    return arround.reduce((t, v) => v === '#' ? t + 1 : t, 0);
}

/**
 * @param {string[][]} input
 */
function matrixRound(input) {
    const matrix = input.map((arr) => arr.slice());
    for (let row = 1; row < input.length - 1; row++) {
        for (let col = 1; col < input[row].length - 1; col++) {
            const seat = input[row][col];
            if (seat === 'L') {
                matrix[row][col] = occupiedSeatsAround(row, col, input) === 0 ? '#' : 'L';
            }
            else if (seat === '#') {
                matrix[row][col] = occupiedSeatsAround(row, col, input) > 3 ? 'L' : '#';
            }
        }
    }
    return matrix;
}

/**
 * @param {string[][]} m1
 * @param {string[][]} m2
 */
function sameMatrix(m1, m2) {
    return m1.every((r, row) => r.every((v, col) => v === m2[row][col]));

    // for (let row = 0; row < m1.length; row++) {
    //     for (let col = 0; col < m1[row].length; col++) {
    //         if (m1[row][col] !== m2[row][col]) {
    //             return false;
    //         }
    //     }
    // }

    // return true;
}

/**
 * @param {string[]} input
 */
function partOne(input) {
    let matrix = input.map(l => [...l]);

    while (true) {
        let changedMatrix = matrixRound(matrix);
        if (sameMatrix(matrix, changedMatrix)) {
            break;
        }
        matrix = [...changedMatrix].map((arr) => arr.slice());
    };

    const occupiedSeats = matrix.reduce((total, row) => total += row.reduce((t, v) => v === '#' ? t + 1 : t, 0), 0);
    console.log(`${occupiedSeats} seats are occupied.`)
}

partOne([...data]);
