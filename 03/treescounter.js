import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .split('\n')
        .map(l => [...l.replace('\r', '')]);

console.log(`Data has been read ${data.length}`);

/**
 * @param {number} right
 * @param {number} down
 */
function counttrees(right, down) {
    let trees = 0;
    let col = right;

    for (let row = down; row < data.length; row += down) {
        const rowData = data[row];

        if (rowData[col] === '#') {
            trees++;
        }

        col += right;
        if (col >= rowData.length) {
            col -= rowData.length;
        }
    }

    console.log(`Slope Right ${right}, down ${down} : Found ${trees} trees.`);

    return trees;
}

const magicNumber =
    counttrees(1, 1)
    * counttrees(3, 1)
    * counttrees(5, 1)
    * counttrees(7, 1)
    * counttrees(1, 2);

console.log(`All trees multiplied: ${magicNumber}`);
