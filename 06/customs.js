import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .toString()
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

const groups = [''];

data.forEach(element => {
    if (element === '') {
        groups.push('');
    }
    groups[groups.length - 1] += element;
});

var count = groups.map(v => new Set([...v]).size).reduce((v1, v2) => v1 + v2);

console.log(`Sum of group count is ${count}`);
