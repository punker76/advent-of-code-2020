import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(n => +n)
        .sort((n1, n2) => n1 - n2);

function partOne() {
    let _jolts = 0;
    let _1jolts = 0;
    let _3jolts = 0;

    for (let index = 0; index < data.length; index++) {
        const next3 = data.slice(index, index + 3);
        const nextJolts = next3.find(v => v - _jolts === 1 || v - _jolts === 3);
        if (nextJolts - _jolts === 3) {
            _3jolts++;
        }
        else {
            _1jolts++;
        }
        _jolts = nextJolts;
    }

    _3jolts++;

    console.log(`There are ${_1jolts} differences of 1 jolt and ${_3jolts} differences of 3 jolts, multiplied: ${_1jolts * _3jolts}`);
}

partOne();
