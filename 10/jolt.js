import { readFileSync } from "fs";

const data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(n => +n)
        .sort((n1, n2) => n1 - n2);

/**
 * @param {number[]} input
 */
function partOne(input) {
    const jolts = { 1: 0, 2: 0, 3: 0 };
    const adapters = [0, ...input, input.pop() + 3];

    for (let index = 1; index < adapters.length; index++) {
        const diff = adapters[index] - adapters[index - 1];
        jolts[diff]++;
    }

    console.log(`There are ${jolts[1]} differences of 1 jolt and ${jolts[3]} differences of 3 jolts, multiplied: ${jolts[1] * jolts[3]}`);
}

/**
 * @param {number[]} input
 */
function partTwo(input) {
    const adapters = [0, ...input, input.pop() + 3];
    const diffs = [];

    for (let index = 1; index < adapters.length; index++) {
        const diff = adapters[index] - adapters[index - 1];
        diffs.push(diff);
    }

    const ones = diffs.join('').split('3').map(o => o.length).filter(l => l >= 2).reverse();

    /* 2 1 => 2 perms
        1 2
        1
    */
    /* 3 1 => 4 perms
        1	2	3
        1	2	
        1		3
        1		
    */
    /* 4 1 => 7 perms
        1	2	3	4
        1		3	4
        1	2		4
        1			4
        1	2	3	
        1	2		
        1			
    */

    let total = 1;

    ones.forEach(element => {
        if (element === 4) {
            total = 7 * total;
        }
        else if (element === 3) {
            total = 4 * total;
        }
        else if (element === 2) {
            total = 2 * total;
        }
    });

    console.log(`Total number of distinct ways ${total}`);
}

partOne([...data]);
partTwo([...data]);
