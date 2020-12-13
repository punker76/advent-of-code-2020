import fs = require('fs');

const data: string[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n');

const partOne = (input: string[]) => {
    const depart = +input[0];
    const busIDs = input[1].split(',').filter(x => x !== 'x').map(Number);
    const earliestBus = busIDs
        .map(b => { return { ID: b, start: (Math.ceil(depart / b) * b) } })
        .sort((a, b) => a.start - b.start)
        .shift();
    console.log(`Part One: The earlist bus is ${earliestBus.ID}, multiplied with ${earliestBus.start - depart} waiting minutes: ${earliestBus.ID * (earliestBus.start - depart)}`)
}

// Part two: https://en.wikipedia.org/wiki/Chinese_remainder_theorem
// It's not from me: // https://stackoverflow.com/a/65275958/920384
// My solution takes years...

const modularMultiplicativeInverse = (a: bigint, modulus: bigint) => {
    // Calculate current value of a mod modulus
    const b = BigInt(a % modulus);

    // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
    for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
        if ((b * hipothesis) % modulus == 1n) return hipothesis;
    }

    // If we do not find it, we return 1
    return 1n;
}

const solveCRT = (remainders: bigint[], modules: bigint[]) => {
    // Multiply all the modulus
    const prod: bigint = modules.reduce((acc: bigint, val) => acc * val, 1n);

    return modules.reduce((sum, mod, index) => {
        // Find the modular multiplicative inverse and calculate the sum
        // SUM ( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus)
        const p = prod / mod;
        return sum + (remainders[index] * modularMultiplicativeInverse(p, mod) * p);
    }, 0n) % prod;
}

const partTwo = (input: string) => {
    const busIDs = input.split(',');
    const busList = busIDs
        .filter(x => x !== 'x')
        .map(b => { return { ID: +b, delay: busIDs.indexOf(b) } });

    // Declare the problem and execute function
    const remainders: bigint[] = busList.map(b => BigInt(b.ID - b.delay));
    const modules: bigint[] = busList.map(b => BigInt(b.ID));
    const timestamp = solveCRT(remainders, modules);

    console.log(`Part Two: The earliest timestamp is ${timestamp} (\'${input}\')`)
}

// My very very slow shit algo
const partTwo_TOO_LONG = (input: string) => {
    const busIDs = input.split(',');
    const busList = busIDs
        .filter(x => x !== 'x')
        .map(b => { return { ID: BigInt(+b), delay: BigInt(busIDs.indexOf(b)) } });
    const first = busList[0];
    const last = busList[busList.length - 1];
    const minutes = BigInt(last.delay);
    let timestamp = BigInt((100000000000000n / first.ID) * first.ID);
    while (true) {

        if ((timestamp % first.ID === 0n) && ((timestamp + minutes) % last.ID === 0n)) {
            console.log(timestamp);
            const allInRange = busList.slice(1, busList.length - 1).every(b => (timestamp + b.delay) % b.ID === 0n);
            if (allInRange) {
                break;
            }
        }

        timestamp++;
    }
    console.log(`Part Two: The earliest timestamp is ${timestamp} (\'${input}\')`)
}

partOne(data);
// partTwo_TOO_LONG(data[1]);
partTwo(data[1]);
partTwo('17,x,13,19');
partTwo('67,7,59,61');
partTwo('67,x,7,59,61');
partTwo('67,7,x,59,61');
partTwo('1789,37,47,1889');
