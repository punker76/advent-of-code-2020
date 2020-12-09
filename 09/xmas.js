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
}

/**
 * @param {number} n
 * @param {number[]} range
 */
function getWeakness(n, range) {
    for (let idx1 = 0; idx1 < range.length; idx1++) {
        let result = [range[idx1]];
        for (let idx2 = idx1 + 1; idx2 < range.length; idx2++) {
            result.push(range[idx2]);
            if (result.reduce((v1, v2) => v1 + v2) === n) {
                return Math.min(...result) + Math.max(...result);
            }
        }
    }

    return 0;
}

for (let index = preamble; index < data.length; index++) {
    const n = data[index];
    const isValid = isSumOf2(n, data.slice(index - preamble, index));
    if (!isValid) {
        console.log(`The first invalid number is ${n}`);
        console.log(`The encryption weakness is ${getWeakness(n, data)}`);
        break;
    }
}
