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

const partTwo = (rules: string[], messages: string[]) => {
    const solvedRules = {};
    const rulesMap = {};
    for (const rule of rules) {
        const tmp = rule.split(':').map(x => x.trim());
        rulesMap[tmp[0]] = tmp[1];
    }
    // rulesMap['8'] = '42 | 42 8';
    // rulesMap['11'] = '42 32 | 42 11 31';
    const firstRule = rulesMap[0];
    solveValue(firstRule, rulesMap, solvedRules);
    const rule42 = solveValue(rulesMap['42'], rulesMap, solvedRules);
    const rule31 = solveValue(rulesMap['31'], rulesMap, solvedRules);
    const regex = new RegExp(`^(?<g42>${rule42}+)(?<g31>${rule31}+)$`);
    const regexRule42 = new RegExp(rule42, 'g');
    const regexRule31 = new RegExp(rule31, 'g');
    const count = messages.filter(m => {
        const matches = regex.exec(m);
        if (matches) {
            const m42 = matches.groups.g42.match(regexRule42).length;
            const m31 = matches.groups.g31.match(regexRule31).length;
            return m42 > m31;
        }
        return false;
    }).length;
    console.log(`Part Two: ${count} messages completely match rule 0`);
}

partOne(data[0].replace(/"/g, '').split('\n'), data[1].split('\n'));
partTwo(data[0].replace(/"/g, '').split('\n'), data[1].split('\n'));
