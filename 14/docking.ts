import fs = require('fs');

const maskPattern = /^mask = (.+)$/;
const memPattern = /^mem\[(\d+)\] = (\d+)$/;

const data: string[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

const addMask = (value: string, mask: string) => {
    const fill: string = Array(mask.length - value.length).fill('0').join('');
    value = [...fill + value].map((bit, i) => mask[i] !== 'X' ? mask[i] : bit).join('');

    return parseInt(value, 2);
}

const partOne = (input: string[]) => {
    const memory = new Map<number, number>();

    let mask: string = '';
    for (const line of input) {
        if (line.startsWith('mask')) {
            mask = maskPattern.exec(line)[1];
        } else {
            const address = +memPattern.exec(line)[1];
            const value = +memPattern.exec(line)[2];
            const newValue = addMask(value.toString(2), mask);
            memory.set(address, newValue);
        }
    }

    let sum = 0;
    for (let v of memory.values()) {
        sum += v;
    }

    console.log(`Part One: The sum of all values left in memory are ${sum}`);
}

const addMaskTwo = (address: string, mask: string) => {
    const result = [];

    const fill: string = Array(mask.length - address.length).fill('0').join('');
    address = [...fill + address].map((bit, i) => mask[i] !== '0' ? mask[i] : bit).join('');

    const floating = [...address].filter(b => b === 'X').length;
    const floatingBits = (1 << floating);
    for (var i = 0; i < floatingBits; i++) {
        let tmp = address;
        for (var j = 0; j < floating; j++) {
            tmp = tmp.replace('X', i & (1 << j) ? '1' : '0');
        }
        result.push(parseInt(tmp, 2));
    }

    return result;
}

const partTwo = (input: string[]) => {
    const memory = new Map<number, number>();

    let mask: string = '';
    for (const line of input) {
        if (line.startsWith('mask')) {
            mask = maskPattern.exec(line)[1];
        } else {
            const address = +memPattern.exec(line)[1];
            const value = +memPattern.exec(line)[2];
            const newValues = addMaskTwo(address.toString(2), mask);
            for (const a of newValues) {
                memory.set(a, value);
            }
        }
    }

    let sum = 0;
    for (let v of memory.values()) {
        sum += v;
    }

    console.log(`Part One: The sum of all values left in memory are ${sum}`);
}

partOne(data);
partTwo(data);
