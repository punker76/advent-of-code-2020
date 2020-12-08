import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

const usedInstructons = new Set();
let accumulator = 0;
let line = 0;

while (true) {
    if (usedInstructons.has(line)) {
        break;
    }

    usedInstructons.add(line);
    const [arg, op] = data[line].split(' ');
    switch (arg) {
        case 'acc':
            accumulator += +op;
            line++;
            break;
        case 'jmp':
            line += +op;
            break;
        default:
            line++;
            break;
    }
}

console.log(`The value of the accumulator is ${accumulator}`);
