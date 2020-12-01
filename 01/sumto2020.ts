const readline = require('readline');
const fs = require('fs');

let data: number[] = [];

const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

reader.on('line', (line: any) => {
    data.push(+line);
});

reader.on("close", () => {
    console.log(`Data has been read ${data.length}`);

    data.forEach((first, idx1) => {
        data.filter((v, i) => i > idx1).forEach((second, idx2) => {
            if (first + second === 2020) {
                console.log(`${first} + ${second} is 2020, so the product is ${first * second}`);
            }

            let third = data.filter((v, i) => i > idx2).find(v => first + second + v === 2020);
            if (third) {
                console.log(`${first} + ${second} + ${third} is 2020, so the product is ${first * second * third}`);
            }
        });
    });

});
