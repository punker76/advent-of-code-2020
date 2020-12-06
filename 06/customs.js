import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .toString()
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

const groups = [[]];

data.forEach(element => {
    if (element === '') {
        groups.push([]);
    }
    else {
        groups[groups.length - 1].push(element);
    }
});

var count = groups
    .map(v => new Set(v.join('')).size)
    .reduce((v1, v2) => v1 + v2);

console.log(`Part one: Sum of group count is ${count}`);

var count2 = groups
    .map(v => {
        const everyone = v.reduce((v1, v2) => [...v1].filter(value => [...v2].includes(value)));
        return everyone.length;
    })
    .reduce((v1, v2) => v1 + v2);

console.log(`Part two: Sum of group count is ${count2}`);
