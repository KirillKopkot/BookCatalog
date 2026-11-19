function parseNumber(str) {
    let s = String(str).replace(',', '.');
    let n = Number(s);
    return n;
}

function calcPay(hours, rate) {
    return hours * rate;
}

function formatMoney(n) {
    return n.toFixed(2).replace('.', ',');
}

function celsiusToFahrenheit(c) {
    return c * 9 / 5 + 32;
}

function calcOvertimePay(hours, rate) {
    if (hours <= 40) {
        return hours * rate;
    }
    if (hours <= 60) {
        return 40 * rate + (hours - 40) * rate * 1.5;
    }
    return 40 * rate + 20 * rate * 1.5 + (hours - 60) * rate * 2;
}

function sumOdd(limit) {
    let sum = 0;
    let i = 1;
    while (i <= limit) {
        sum += i;
        i += 2;
    }
    return sum;
}

function sumEven(limit) {
    let sum = 0;
    for (var i = 2; i <= limit; i += 2) {
        sum += i;
    }
    return sum;
}

function parseNumberList(str) {
    let parts = String(str).split(',');
    let result = [];
    for (let i = 0; i < parts.length; i++) {
        let n = parseNumber(parts[i]);
        result.push(n);
    }
    return result.length ? result : null;
}

function arrayStats(arr) {
    let max = arr[0];
    let min = arr[0];
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
        sum += arr[i];
    }
    let avg = Math.round(sum / arr.length * 100) / 100;
    return { max: max, min: min, avg: avg };
}

function uniqueWords(lines) {
    let words = [];
    for (let i = 0; i < lines.length; i++) {
        let lineWords = lines[i].split(' ');
        for (let j = 0; j < lineWords.length; j++) {
            let word = lineWords[j];
            if (!words.includes(word)) {
                words.push(word);
            }
        }
    }
    words.sort(function (a, b) {
        return a.localeCompare(b, 'en', { sensitivity: 'base' });
    });
    return words;
}


function formatWordList(words) {
    return words.join(', ');
}

let SHAKESPEARE_LINES = [
    'But soft what light through yonder window breaks',
    'It is the east and Juliet is the sun',
    'Arise fair sun and kill the envious moon',
    'Who is already sick and pale with grief'
];



function byId(id) { return document.getElementById(id); }

function showResult(prefix, label, value, msg) {
    byId(prefix + '-label').textContent = label;
    byId(prefix + '-value').textContent = value;
    byId(prefix + '-msg').textContent = msg;
}

function readNumber(inputId, prefix, fieldName) {
    let n = parseNumber(byId(inputId).value);
    return n;
}

function readHoursAndRate(prefix) {
    let hours = readNumber(prefix + '-hours');
    let rate = readNumber(prefix + '-rate');
    return { hours: hours, rate: rate };
}

function runUsername() {
    let name = byId('t1-name').value.trim();
    showResult('t1', 'Result', 'Username: ' + name);
}

function runWages() {
    let data = readHoursAndRate('t2');
    if (!data) return;
    showResult('t2', 'Payment', 'Payment ' + formatMoney(calcPay(data.hours, data.rate)), data.hours + ' h × ' + data.rate);
}

function runCelsius() {
    var c = readNumber('t3-celsius', 't3', 'temperature');
    if (c === null) return;
    var f = celsiusToFahrenheit(c);
    showResult('t3', 'Fahrenheit', Math.round(f * 100) / 100 + ' °F', c + ' °C');
}

function runOvertime() {
    let data = readHoursAndRate('t4');
    if (!data) return;
    var pay = calcOvertimePay(data.hours, data.rate);
    showResult('t4', 'Payment', formatMoney(pay));
}

function runOdd() {
    showResult('t5', 'Sum of odd 1–100', String(sumOdd(100)));
}

function runEven() {
    showResult('t6', 'Sum of even 1–100', String(sumEven(100)));
}

function runArray() {
    let arr = parseNumberList(byId('t7-array').value);
    let s = arrayStats(arr);
    let text = 'Max: ' + s.max + ', Min: ' + s.min + ', Average: ' + s.avg;
    showResult('t7', 'Array statistics', 'Max ' + s.max + ' / Min ' + s.min, 'Average: ' + s.avg);
}

function runShakespeare() {
    let words = uniqueWords(SHAKESPEARE_LINES);
    showResult('t8', 'Unique words (' + words.length + ')', formatWordList(words), 'Sorted A–Z');
}