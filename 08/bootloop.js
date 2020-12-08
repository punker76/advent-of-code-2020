import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

/**
 * @param {string[]} [theData]
 */
function isInfinite(theData) {
    const usedInstructons = new Set();
    let accumulator = 0;
    let line = 0;

    while (line < theData.length) {
        if (usedInstructons.has(line)) {
            break;
        }

        usedInstructons.add(line);
        const [arg, op] = theData[line].split(' ');
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

    return accumulator;
}


console.log(`The value of the accumulator is ${isInfinite(data)}`);

/**
 * @param {string[]} [theData]
 */
function getAccumulator(theData) {
    const usedInstructons = new Set();
    let accumulator = 0;
    let line = 0;

    while (line < theData.length) {
        if (usedInstructons.has(line)) {
            return -1;
        }

        usedInstructons.add(line);
        const [arg, op] = theData[line].split(' ');
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

    return accumulator;
}

for (let index = 0; index < data.length; index++) {
    const [arg, op] = data[index].split(' ');

    if (arg === 'jmp' && +op != null) {
        const newData = [...data];
        newData[index] = newData[index].replace('jmp', 'nop');
        const count = getAccumulator(newData);
        if (count >= 0) {
            console.log(`The value of the accumulator is ${count}`);
        }
    }
    else if (arg === 'nop' && +op != 0) {
        const newData = [...data];
        newData[index] = newData[index].replace('nop', 'jmp');
        const count = getAccumulator(newData);
        if (count >= 0) {
            console.log(`The value of the accumulator is ${count}`);
        }
    }
}
