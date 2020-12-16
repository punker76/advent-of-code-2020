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

const partOne = (fields: Field[], ticket: number[], nearbyTickets: TicketNumber[][]) => {
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
    });

    console.log(`Part One: The ticket scanning error rate is ${errorRate}`);
};

parseData([...data]);
partOne(
    dataFields.map(f => {
        const tmp = fieldPattern.exec(f);
        let field: Field = {
            name: tmp[1],
            range1: Array(+tmp[3] - +tmp[2] + 1).fill(+tmp[2]).map((v, i) => v + i),
            range2: Array(+tmp[5] - +tmp[4] + 1).fill(+tmp[4]).map((v, i) => v + i)
        };
        return field;
    })
    , dataTicket.split(',').map(f => +f)
    , dataNearbyTickets.map(t => t.split(',').map(n => { return { found: false, n: +n } }).sort((a, b) => a.n - b.n)));
