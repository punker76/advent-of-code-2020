import fs = require('fs');

const data: string[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n\n');

const solveValue = (value: string, rules: { [x: string]: string; }, solvedRules: { [x: string]: string; }): string => {
    if (value in solvedRules) {
        return solvedRules[value];
    }

    let result = '';
    if (value.indexOf('|') >= 0) {
        const tmp = value.split(' | ');
        result = `(${solveValue(tmp[0], rules, solvedRules)}|${solveValue(tmp[1], rules, solvedRules)})`;
    }
    else if (/^\D$/.test(value)) {
        result = value;
    }
    else {
        const tmp = value.split(' ');
        result = tmp.map(v => solveValue(rules[v], rules, solvedRules)).join('');
    }

    solvedRules[value] = result;
    return result;
}

const partOne = (rules: string[], messages: string[]) => {
    const solvedRules = {};
    const rulesMap = {};
    for (const rule of rules) {
        const tmp = rule.split(':').map(x => x.trim());
        rulesMap[tmp[0]] = tmp[1];
    }
    const firstRule = rulesMap[0];
    solveValue(firstRule, rulesMap, solvedRules);
    const pattern = solvedRules[firstRule];
    const regex = new RegExp(`^${pattern}$`);
    const count = messages.filter(m => regex.test(m)).length;
    console.log(`Part One: ${count} messages completely match rule 0`);
}

partOne(data[0].replace(/"/g, '').split('\n'), data[1].split('\n'));
