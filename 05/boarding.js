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
    return Math.max(...data.map(pass => { return partOf(pass.slice(0, 7), 128) * 8 + partOf(pass.slice(7), 8); }));
}

function getTheEmptySeatID() {
    const seats = data
        .map(pass => { return partOf(pass.slice(0, 7), 128) * 8 + partOf(pass.slice(7), 8); })
        .sort((a, b) => { return a - b; });

    for (let index = 1; index < seats.length; index++) {
        const seat = seats[index];
        if (seat - seats[index - 1] > 1) {
            return seat - 1;
        }
    }
}

const binary = { 'F': 0, 'B': 1, 'L': 0, 'R': 1 };

function getHighestSeatID_Binary() {
    return Math.max(...data.map(pass => parseInt([...pass].map(b => binary[b]).join(''), 2)));
}

function getTheEmptySeatID_Binary() {
    const seats = data.map(pass => parseInt([...pass].map(b => binary[b]).join(''), 2));
    const [min, max] = [Math.min(...seats), Math.max(...seats)];
    const all_seats = [...Array(max - min + 1)].map((v, i) => min + i);
    return all_seats.filter(s => !seats.includes(s));
}

console.log(`The highest seat ID is: ${getHighestSeatID()}`);
console.log(`The empty seat ID is: ${getTheEmptySeatID()}`);

console.log(`The highest seat ID is: ${getHighestSeatID_Binary()}`);
console.log(`The empty seat ID is: ${getTheEmptySeatID_Binary()}`);
