import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(n => +n);

const preamble = 25;

/**
 * @param {number} n
 * @param {number[]} range
 */
function isSumOf2(n, range) {
    return range.some((value, i) => range.slice(i + 1).some(v => value + v === n));

    // for (let index = 0; index < range.length; index++) {
    //     const exists = range.slice(index + 1).some(v => range[index] + v === n);
    //     if (exists) {
    //         return true;
    //     }
    // }

    // return false;
}

for (let index = preamble; index < data.length; index++) {
    const n = data[index];
    const isValid = isSumOf2(n, data.slice(index - preamble, index));
    if (!isValid) {
        console.log(`The first invalid number is ${n}`);
        break;
    }
}
