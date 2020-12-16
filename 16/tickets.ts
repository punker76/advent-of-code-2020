import fs = require('fs');

const fieldPattern = /^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/;

const data: string[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter(l => l);

interface Field {
    name: string;
    range1: number[];
    range2: number[];
}

interface TicketNumber {
    found: boolean;
    n: number;
}

const dataFields: string[] = [];
let dataTicket: string;
const dataNearbyTickets: string[] = [];

const parseData = (input: string[]) => {
    let current = dataFields;
    let line = 0;
    while (line < input.length) {
        if (input[line].startsWith('your ticket')) {
            line++;
            dataTicket = input[line];
        } else if (input[line].startsWith('nearby tickets')) {
            current = dataNearbyTickets;
        } else {
            current.push(input[line]);
        }
        line++;
    }
};

const allInRange = (field: Field, fieldIdx: number, correctTickets: TicketNumber[][]): boolean => {
    let allNumbersInRange = true;
    for (let ticketIdx = 0; ticketIdx < correctTickets.length; ticketIdx++) {
        const ticketFieldNumber = correctTickets[ticketIdx][fieldIdx];

        const inRange = (field.range1.indexOf(ticketFieldNumber.n) >= 0) || (field.range2.indexOf(ticketFieldNumber.n) >= 0);
        allNumbersInRange = allNumbersInRange && inRange;
    }
    return allNumbersInRange;
}

const partTwo = (fields: Field[], ticket: TicketNumber[], correctTickets: TicketNumber[][]) => {
    const usedFields = new Set<Field>();
    const transformedFields = new Map<number, Field>();

    while (usedFields.size < fields.length) {
        for (const field of fields) {
            // loop only over all unused fields
            if (usedFields.has(field)) {
                continue;
            }

            let matched = false;
            let matchedFieldIdx = 0;
            for (let fieldIdx = 0; fieldIdx < fields.length; fieldIdx++) {
                // loop over all indices, except the already transformed ones
                if (transformedFields.has(fieldIdx)) {
                    continue;
                }

                if (allInRange(field, fieldIdx, correctTickets)) {
                    if (matched) {
                        matched = false;
                        break;
                    }
                    matched = true;
                    matchedFieldIdx = fieldIdx;
                }
            }

            // only exactly one matched fields
            if (matched) {
                transformedFields.set(matchedFieldIdx, field);
                usedFields.add(field);
            }
        }
    }

    const result = ticket
        .filter((f, i) => transformedFields.get(i).name.indexOf('departure') >= 0)
        .map(v => v.n)
        .reduce((a, b) => a * b);

    console.log(`Part Two: ${result}`);
}

const partOne = (fields: Field[], ticket: TicketNumber[], nearbyTickets: TicketNumber[][]) => {
    const correctTickets: TicketNumber[][] = [];
    let errorRate = 0;
    nearbyTickets.forEach(ticket => {
        ticket.forEach(numbers => {
            fields.forEach(field => {

                if ((field.range1.indexOf(numbers.n) >= 0) || (field.range2.indexOf(numbers.n) >= 0)) {
                    numbers.found = true;
                }

            });
        });

        const wrongTicketNumber = ticket.find(n => !n.found);
        if (wrongTicketNumber) {
            errorRate += wrongTicketNumber.n;
        }
        else {
            correctTickets.push(ticket);
        }
    });

    console.log(`Part One: The ticket scanning error rate is ${errorRate}`);

    correctTickets.unshift(ticket);
    partTwo(fields, ticket, correctTickets);
};

parseData([...data]);
partOne(
    dataFields.map((f, i) => {
        const tmp = fieldPattern.exec(f);
        let field: Field = {
            name: tmp[1],
            range1: Array(+tmp[3] - +tmp[2] + 1).fill(+tmp[2]).map((v, i) => v + i),
            range2: Array(+tmp[5] - +tmp[4] + 1).fill(+tmp[4]).map((v, i) => v + i)
        };
        return field;
    })
    , dataTicket.split(',').map(f => { return { found: false, n: +f } })
    , dataNearbyTickets.map(t => t.split(',').map(n => { return { found: false, n: +n } })));
