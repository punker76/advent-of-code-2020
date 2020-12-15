const partOne = (input: number[], count: number) => {
    const startInput = [...input];

    for (let turn = input.length; turn < count; turn++) {
        let nextNumber = input[turn - 1];

        const firstSpoken = input.lastIndexOf(nextNumber);
        if (firstSpoken >= 0) {
            const secondSpoken = input.slice(0, firstSpoken).lastIndexOf(nextNumber);
            if (secondSpoken >= 0) {
                nextNumber = firstSpoken - secondSpoken;
            }
            else {
                nextNumber = 0;
            }
        }

        input.push(nextNumber);
    }

    console.log(`Part One: Given the starting numbers ${startInput}, the ${count}th number spoken is ${input[input.length - 1]}`);
}

partOne([0, 3, 6], 2020);
partOne([1, 3, 2], 2020);
partOne([2, 1, 3], 2020);
partOne([1, 2, 3], 2020);
partOne([2, 3, 1], 2020);
partOne([3, 2, 1], 2020);
partOne([3, 1, 2], 2020);
partOne([2, 0, 1, 9, 5, 19], 2020);
