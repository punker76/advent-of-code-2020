import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

/**
 * @param {string[]} [theData]
 */
function calcAccumulator(theData) {
    const usedInstructons = new Set();
    let accumulator = 0;
    let terminated = false;
    let line = 0;

    while (!terminated && !usedInstructons.has(line)) {
        usedInstructons.add(line);
        const [arg, op] = theData[line].split(' ');
        switch (arg) {
            case 'acc':
                accumulator += +op;
                break;
            case 'jmp':
                line += +op - 1;
                break;
        }
        line++;
        terminated = line >= theData.length;
    }

    return { terminated, accumulator };
}

console.log(`The value of the accumulator is ${calcAccumulator(data).accumulator}`);

const swapOp = { 'jmp': 'nop', 'nop': 'jmp' };

for (let index = 0; index < data.length; index++) {
    const [arg, op] = data[index].split(' ');
    if (arg !== 'acc' && +op != 0) {
        data[index] = data[index].replace(arg, swapOp[arg]);
        const calc = calcAccumulator(data);
        data[index] = data[index].replace(swapOp[arg], arg);

        if (calc.terminated) {
            console.log(`The value of the accumulator is ${calc.accumulator}`);
            break;
        }
    }
}
