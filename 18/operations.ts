import fs = require('fs');

const data: string[] =
    fs.readFileSync('input.txt', 'utf8')
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter(l => l)
        .map(l => l.replace(/ /g, ''));

let solveExpression = (expression: string): number => {
    const matches = expression.matchAll(/([+|*])?(\d+){1}/g);
    let result: number = +matches.next().value[2];
    for (const m of matches) {
        const op = m[1];
        const op2 = +m[2];
        if (op === '+') {
            result += op2;
        }
        else if (op === '*') {
            result *= op2;
        }
    }
    return result;
}

const solveExpressionPartTwo = (expression: string): number => {
    while (expression.indexOf('+') >= 0) {
        const e = expression.match(/(\d+){1}\+(\d+){1}/g)[0];
        const m = e.split('+');
        const r = +m[0] + +m[1];
        expression = expression.replace(e, r.toString());
    }
    const result = expression.split('*').reduce((acc, v) => acc * +v, 1);
    return result;
}

const evaluateExpression = (expression: string): number => {
    let result = 0;
    const expr: string[] = [];
    expr.push('');

    for (const char of expression) {
        if (char === '(') {
            expr.push('');
        }
        else {
            if (char === ')') {
                expr[expr.length - 2] += solveExpression(expr.pop()).toString();
            } else {
                expr[expr.length - 1] += char;
            }
        }
    }

    result += solveExpression(expr.pop());

    console.log(`- ${expression} becomes ${result}`);

    return result;
}

const partOne = (input: string[]) => {
    let sum = input.reduce((acc, expr) => acc + evaluateExpression(expr), 0);
    console.log(`Part One: The sum of the resulting values are ${sum}`);
}

const partTwo = (input: string[]) => {
    solveExpression = solveExpressionPartTwo;

    let sum = input.reduce((acc, expr) => acc + evaluateExpression(expr), 0);
    console.log(`Part Two: The sum of the resulting values are ${sum}`);
}

partOne(data);
partTwo(data);
