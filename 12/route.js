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
    let posx = 0, posy = 0;
    let face = 0;
    const rot = { 0: 'E', 90: 'S', 180: 'W', 270: 'N' };

    input.forEach(element => {
        let direction = element[0];
        const value = +element.substring(1, element.length);

        // calculate new face
        switch (direction) {
            case 'L':
                // fix JavaScript mod bug    
                face = (((face - value) % 360) + 360) % 360;
                break;
            case 'R':
                face = (face + value) % 360;
                break;
            case 'F':
                direction = rot[face];
                break;
            default:
                break;
        }

        switch (direction) {
            case 'E':
                posx += value;
                break;
            case 'W':
                posx -= value;
                break;
            case 'N':
                posy += value;
                break;
            case 'S':
                posy -= value;
                break;
            default:
                break;
        }
    });

    console.log(`Part One: The distance is ${Math.abs(posx) + Math.abs(posy)}`)
}

/**
 * @param {{ x: number; y: number; }} v
 * @param {number} angle
 */
function rotate(v, angle) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = Math.round((cos * v.x) + (sin * v.y)),
        ny = Math.round((cos * v.y) - (sin * v.x));
    return { x: nx, y: ny };
};

/**
 * @param {string[]} input
 */
function partTwo(input) {
    let wp = { x: 10, y: 1 };
    let pos = { x: 0, y: 0 };

    input.forEach(element => {
        let direction = element[0];
        let value = +element.substring(1, element.length);

        switch (direction) {
            case 'L':
                wp = rotate(wp, -value);
                break;
            case 'R':
                wp = rotate(wp, value);
                break;
            case 'F':
                pos.x += wp.x * value;
                pos.y += wp.y * value;
                break;
            case 'E':
                wp.x += value;
                break;
            case 'W':
                wp.x -= value;
                break;
            case 'N':
                wp.y += value;
                break;
            case 'S':
                wp.y -= value;
                break;
            default:
                break;
        }
    });

    console.log(`Part Two: The distance is ${Math.abs(pos.x) + Math.abs(pos.y)}`)
}

partOne([...data]);
partTwo([...data]);
