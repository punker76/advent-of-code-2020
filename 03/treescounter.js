import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .split('\n')
        .map(l => [...l.replace('\r', '')]);

console.log(`Data has been read ${data.length}`);

function counttrees() {
    let trees = 0;
    let col = 3;

    for (let row = 1; row < data.length; row++) {
        const rowData = data[row];

        if (rowData[col] === '#') {
            trees++;
        }

        col += 3;
        if (col >= rowData.length) {
            col -= rowData.length;
        }
    }

    console.log(`Found ${trees} trees.`);
}

counttrees();
