import fs = require('fs');

const data: string[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter(l => l);

class Cube {
    x: number;
    y: number;
    z: number;
    w: number;
    active: boolean;

    constructor(x: number, y: number, z: number, w: number, active: boolean) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.active = active;
    }

    key(): string {
        return `${this.x} ${this.y} ${this.z} ${this.w}`;
    }
}

const getNeighbors = (cube: Cube): Map<string, Cube> => {
    const cubes = new Map<string, Cube>();
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            for (let z = -1; z < 2; z++) {
                if (!(x === 0 && y === 0 && z === 0)) {
                    const c = new Cube(cube.x + x, cube.y + y, cube.z + z, 0, false);
                    cubes.set(c.key(), c);
                }
            }
        }
    }
    return cubes;
}

const checkForActiveCubes = (cube: Cube, cubes: Map<string, Cube>): number => {
    const neighbors = getNeighbors(cube);
    let activeCubes = 0;
    for (const c of neighbors.values()) {
        if (cubes.has(c.key()) && cubes.get(c.key()).active) {
            activeCubes++;
        }
    }
    return activeCubes;
}

const oneCycle = (cubes: Map<string, Cube>): Map<string, Cube> => {
    const new_cubes = new Map<string, Cube>();
    for (const cube of cubes.values()) {
        const activeCubes = checkForActiveCubes(cube, cubes);
        if (cube.active) {
            new_cubes.set(cube.key(), new Cube(cube.x, cube.y, cube.z, 0, activeCubes === 2 || activeCubes === 3));

            const neighbors = getNeighbors(cube);
            for (const c of neighbors.values()) {
                if (!cubes.has(c.key())) {
                    const active = checkForActiveCubes(c, cubes);
                    if (active === 3) {
                        new_cubes.set(c.key(), new Cube(c.x, c.y, c.z, 0, true));
                    }
                }
            }
        }
        else {
            new_cubes.set(cube.key(), new Cube(cube.x, cube.y, cube.z, 0, activeCubes === 3));
        }
    }
    return new_cubes;
}

const partOne = (input: string[], cycles: number) => {
    let cubes = new Map<string, Cube>();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const c = new Cube(x, y, 0, 0, input[y][x] === '#');
            cubes.set(c.key(), c);
        }
    }

    for (let cycle = 0; cycle < cycles; cycle++) {
        cubes = oneCycle(cubes);
    }

    let activeCubes = 0;
    for (const c of cubes.values()) {
        if (c.active) {
            activeCubes++;
        }
    }

    console.log(`Part One: ${activeCubes} cubes are left in the active state after the ${cycles} cycle.`);
}

const getNeighborsPartTwo = (cube: Cube): Map<string, Cube> => {
    const cubes = new Map<string, Cube>();
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            for (let z = -1; z < 2; z++) {
                for (let w = -1; w < 2; w++) {
                    if (!(x === 0 && y === 0 && z === 0 && w === 0)) {
                        const c = new Cube(cube.x + x, cube.y + y, cube.z + z, cube.w + w, false);
                        cubes.set(c.key(), c);
                    }
                }
            }
        }
    }
    return cubes;
}

const checkForActiveCubesPartTwo = (cube: Cube, cubes: Map<string, Cube>): number => {
    const neighbors = getNeighborsPartTwo(cube);
    let activeCubes = 0;
    for (const c of neighbors.values()) {
        if (cubes.has(c.key()) && cubes.get(c.key()).active) {
            activeCubes++;
        }
    }
    return activeCubes;
}

const oneCyclePartTwo = (cubes: Map<string, Cube>): Map<string, Cube> => {
    const new_cubes = new Map<string, Cube>();
    for (const cube of cubes.values()) {
        const activeCubes = checkForActiveCubesPartTwo(cube, cubes);
        if (cube.active) {
            new_cubes.set(cube.key(), new Cube(cube.x, cube.y, cube.z, cube.w, activeCubes === 2 || activeCubes === 3));

            const neighbors = getNeighborsPartTwo(cube);
            for (const c of neighbors.values()) {
                if (!cubes.has(c.key())) {
                    const active = checkForActiveCubesPartTwo(c, cubes);
                    if (active === 3) {
                        new_cubes.set(c.key(), new Cube(c.x, c.y, c.z, c.w, true));
                    }
                }
            }
        }
        else {
            new_cubes.set(cube.key(), new Cube(cube.x, cube.y, cube.z, cube.w, activeCubes === 3));
        }
    }
    return new_cubes;
}

const partTwo = (input: string[], cycles: number) => {
    let cubes = new Map<string, Cube>();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const c = new Cube(x, y, 0, 0, input[y][x] === '#');
            cubes.set(c.key(), c);
        }
    }

    for (let cycle = 0; cycle < cycles; cycle++) {
        cubes = oneCyclePartTwo(cubes);
    }

    let activeCubes = 0;
    for (const c of cubes.values()) {
        if (c.active) {
            activeCubes++;
        }
    }

    console.log(`Part Two: ${activeCubes} cubes are left in the active state after the ${cycles} cycle.`);
}

partOne(data, 6);
partTwo(data, 6);
