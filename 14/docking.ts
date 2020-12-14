import fs = require('fs');
import { join } from 'path';

const data: string[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

const addMask = (value: string, mask: string) => {
    const fill: string = Array(mask.length - value.length).fill('0').join('');
    const valueArray = [...fill + value];
    for (let index = 0; index < mask.length; index++) {
        const bit = mask[index];
        if (bit !== 'X') {
            valueArray[index] = bit;
        }
    }
    return parseInt(valueArray.join(''), 2);
}

const partOne = (input: string[]) => {
    const maskPattern = /^mask = (.+)$/;
    const memPattern = /^mem\[(\d+)\] = (\d+)$/;
    const memory = new Map<number, number>();

    let mask: string = '';
    for (const line of input) {
        if (line.startsWith('mask')) {
            mask = maskPattern.exec(line)[1];
        } else {
            const address = +memPattern.exec(line)[1];
            const value = +memPattern.exec(line)[2];
            const newValue = addMask(value.toString(2), mask);
            // console.log(value + ' >> ' + newValue);
            memory.set(address, newValue);
        }
    }

    let sum = 0;
    for (let v of memory.values()) {
        sum += v;
    }

    console.log(`Part One: The sum of all values left in memory are ${sum}`);
}

partOne(data);
