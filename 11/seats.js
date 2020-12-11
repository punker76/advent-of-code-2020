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
 * @param {number} occupied
 * @param {(arg0: number, arg1: number, arg2: string[][]) => number} [occupiedSeatsAroundCallback]
 */
function matrixRound(input, occupied, occupiedSeatsAroundCallback) {
    const matrix = input.map((arr) => arr.slice());
    for (let row = 1; row < input.length - 1; row++) {
        for (let col = 1; col < input[row].length - 1; col++) {
            const seat = input[row][col];
            if (seat === 'L') {
                matrix[row][col] = occupiedSeatsAroundCallback(row, col, input) === 0 ? '#' : 'L';
            }
            else if (seat === '#') {
                matrix[row][col] = occupiedSeatsAroundCallback(row, col, input) >= occupied ? 'L' : '#';
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
}

/**
 * @param {string[]} input
 */
function partOne(input) {
    let matrix = input.map(l => [...l]);

    while (true) {
        let changedMatrix = matrixRound(matrix, 4, occupiedSeatsAround);
        if (sameMatrix(matrix, changedMatrix)) {
            break;
        }
        matrix = [...changedMatrix].map((arr) => arr.slice());
    };

    const occupiedSeats = matrix.reduce((total, row) => total += row.reduce((t, v) => v === '#' ? t + 1 : t, 0), 0);
    console.log(`Part One: ${occupiedSeats} seats are occupied.`)
}

/**
 * @param {number} row
 * @param {number} col
 * @param {string[][]} input
 */
function occupiedSeatsAroundPartTwo(row, col, input) {
    let occupiedSeats = 0;
    const steps = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for (const step of steps) {
        if (step[0] === 0) {
            let seats = { '#': 0, 'L': 0, '.': 0 };

            for (let c = col + step[1]; c < input[row].length && c >= 0; c += step[1]) {
                const seat = input[row][c];
                seats[seat]++;
                if (seats["#"] === 1 && seats.L === 0) {
                    occupiedSeats++;
                    break;
                }
            }
        }
        else if (step[1] === 0) {
            let seats = { '#': 0, 'L': 0, '.': 0 };

            for (let r = row + step[0]; r < input.length && r >= 0; r += step[0]) {
                const seat = input[r][col];
                seats[seat]++;
                if (seats["#"] === 1 && seats.L === 0) {
                    occupiedSeats++;
                    break;
                }
            }
        }
        else {
            let seats = { '#': 0, 'L': 0, '.': 0 };
            let r = row + step[0];
            let c = col + step[1];
            while (r >= 0 && r < input.length && c >= 0 && c < input[r].length) {
                let seat = input[r][c];
                seats[seat]++;
                if (seats["#"] === 1 && seats.L === 0) {
                    occupiedSeats++;
                    break;
                }

                r += step[0];
                c += step[1];
            }
        }
    }
    return occupiedSeats;
}

/**
 * @param {string[]} input
 */
function partTwo(input) {
    let matrix = input.map(l => [...l]);

    while (true) {
        let changedMatrix = matrixRound(matrix, 5, occupiedSeatsAroundPartTwo);
        if (sameMatrix(matrix, changedMatrix)) {
            break;
        }
        matrix = [...changedMatrix].map((arr) => arr.slice());
    };

    const occupiedSeats = matrix.reduce((total, row) => total += row.reduce((t, v) => v === '#' ? t + 1 : t, 0), 0);
    console.log(`Part Two: ${occupiedSeats} seats are occupied.`)
}

partOne([...data]);
partTwo([...data]);
