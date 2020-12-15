const solvePuzzle = (input: number[], count: number) => {
    const startInput = [...input];
    const map = new Map<number, number>();
    input.slice(0, input.length - 1).forEach(n => {
        map.set(n, input.indexOf(n));
    });

    for (let turn = input.length; turn < count; turn++) {
        let nextNumber = input[turn - 1];

        const secondSpoken: number = map.get(nextNumber);
        if (secondSpoken !== undefined) {
            map.set(nextNumber, turn - 1);
            nextNumber = turn - 1 - secondSpoken;
        }
        else {
            map.set(nextNumber, turn - 1);
            nextNumber = 0;
        }

        input.push(nextNumber);
    }

    console.log(`Given the starting numbers ${startInput}, the ${count}th number spoken is ${input[input.length - 1]}`);
}

console.log('>>> Part One <<<');
solvePuzzle([0, 3, 6], 2020);
solvePuzzle([1, 3, 2], 2020);
solvePuzzle([2, 1, 3], 2020);
solvePuzzle([1, 2, 3], 2020);
solvePuzzle([2, 3, 1], 2020);
solvePuzzle([3, 2, 1], 2020);
solvePuzzle([3, 1, 2], 2020);
solvePuzzle([2, 0, 1, 9, 5, 19], 2020);

console.log('>>> Part Two <<<');
solvePuzzle([0, 3, 6], 30000000);
solvePuzzle([1, 3, 2], 30000000);
solvePuzzle([2, 1, 3], 30000000);
solvePuzzle([1, 2, 3], 30000000);
solvePuzzle([2, 3, 1], 30000000);
solvePuzzle([3, 2, 1], 30000000);
solvePuzzle([3, 1, 2], 30000000);
solvePuzzle([2, 0, 1, 9, 5, 19], 30000000);
