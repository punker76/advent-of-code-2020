import { readFileSync } from "fs";

let data =
    readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

/**
 * @param {string[]} input
 */
function partOne(input) {
    const depart = +input[0];
    const busIDs = input[1].split(',').filter(x => x !== 'x').map(Number);
    const earliestBus = busIDs
        .map(b => { return { ID: b, start: (Math.ceil(depart / b) * b) } })
        .sort((a, b) => a.start - b.start)
        .shift();
    console.log(`Part One: The earlist bus is ${earliestBus.ID}, multiplied with ${earliestBus.start - depart} waiting minutes: ${earliestBus.ID * (earliestBus.start - depart)}`)
}

partOne([...data]);
