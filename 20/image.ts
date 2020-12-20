import fs = require('fs');

interface Tile {
    id: number;
    borders: string[][];
}

const data: Tile[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n\n')
        .map(t => {
            const tmp = t.split('\n');
            const id = +tmp.shift().replace('Tile ', '').replace(':', '');
            const img = tmp.map(x => [...x]);
            const tile = {
                id: id,
                borders: [
                    img[0],
                    img.map(v => v[tmp[0].length - 1]),
                    img[img.length - 1],
                    img.map(v => v[0])
                ]
            };
            return tile;
        });

const partOne = (tiles: Tile[]) => {
    const result = 0;
    console.log(`Part One: ${result}`);
}

partOne(data);
