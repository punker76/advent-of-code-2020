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
            default:
                break;
        }

        if (direction === 'F') {
            direction = rot[face];
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

partOne([...data]);
