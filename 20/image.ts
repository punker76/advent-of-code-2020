import fs = require('fs');

interface Tile {
    id: number;
    borders: Set<string>;
    matched_Borders: Set<string>;
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
                borders: new Set<string>(),
                matched_Borders: new Set<string>()
            }

            tile.borders.add(img[0].join(''));
            tile.borders.add(img.map(v => v[tmp[0].length - 1]).join(''));
            tile.borders.add(img[img.length - 1].join(''));
            tile.borders.add(img.map(v => v[0]).join(''));

            tile.borders.add([...img[0]].reverse().join(''));
            tile.borders.add(img.map(v => v[tmp[0].length - 1]).reverse().join(''));
            tile.borders.add([...img[img.length - 1]].reverse().join(''));
            tile.borders.add(img.map(v => v[0]).reverse().join(''));

            return tile;
        });

const matchedBorder = (tile1: Tile, tile2: Tile): string => {
    for (const b1 of tile1.borders.keys()) {
        if (tile2.borders.has(b1)) {
            return b1;
        }
    }
    return null;
}

const partOne = (tiles: Tile[]) => {
    const corners = new Set<Tile>();

    for (let k = 0; k < tiles.length; k++) {
        const t1 = tiles[k];
        for (let i = k + 1; i < tiles.length; i++) {
            const t2 = tiles[i];
            const border = matchedBorder(t1, t2);
            if (border) {
                t1.matched_Borders.add(border);
                t2.matched_Borders.add(border);
            }
        }
    }

    const result = tiles.filter(t => t.matched_Borders.size === 2).reduce((acc, t) => acc * t.id, 1);
    console.log(`Part One: ${result}`);
}

partOne(data);
