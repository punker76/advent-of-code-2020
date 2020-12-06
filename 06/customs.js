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
        let p = [...v[0]];
        for (let i = 1; i < v.length; i++) {
            p = p.filter(value => [...v[i]].includes(value));
        }
        return new Set(p).size;
    })
    .reduce((v1, v2) => v1 + v2);

console.log(`Part two: Sum of group count is ${count2}`);
