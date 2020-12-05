import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .split('\n')
        .map(l => l.replace('\r', ''));

console.log(`Data has been read ${data.length}`);

/**
 * @param {string} instructions
 * @param {number} count
 */
function partOf(instructions, count) {
    let n = [...Array(count).keys()];
    for (let i of instructions) {
        if (i === 'F' || i === 'L') {
            n = n.slice(0, n.length / 2);
        }
        else {
            n = n.slice(n.length / 2);
        }
    }
    return n[0];
}

function getHighestSeatID() {
    return data
        .map(pass => { return partOf(pass.slice(0, 7), 128) * 8 + partOf(pass.slice(7), 8); })
        .reduce((v1, v2) => { return Math.max(v1, v2); });
}

function getTheEmptySeatID() {
    const seats = data
        .map(pass => { return partOf(pass.slice(0, 7), 128) * 8 + partOf(pass.slice(7), 8); })
        .sort((a, b) => { return a - b; });

    for (let index = 1; index < seats.length; index++) {
        const element = seats[index];
        if (element - seats[index - 1] > 1) {
            return element - 1;
        }
    }
}

console.log(`The highest seat ID is: ${getHighestSeatID()}`);
console.log(`The empty seat ID is: ${getTheEmptySeatID()}`);
