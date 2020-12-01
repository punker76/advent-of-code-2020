import fs = require('fs');

let data: number[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .split('\n')
        .map(l => +l);

console.log(`Data has been read ${data.length}`);

data.forEach((first, idx) => {
    let second = data.filter((v, i) => i > idx).find(v => first + v === 2020);
    if (second) {
        console.log(`${first} + ${second} is 2020, so the product is ${first * second}`);
        return;
    }
});

data.forEach((first, idx1) => {
    data.filter((v, i) => i > idx1).forEach((second, idx2) => {
        let third = data.filter((v, i) => i > idx2).find(v => first + second + v === 2020);
        if (third) {
            console.log(`${first} + ${second} + ${third} is 2020, so the product is ${first * second * third}`);
            return;
        }
    });
});
