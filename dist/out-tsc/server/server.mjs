import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(join(__dirname, "./data/")).map(name => ({ name: name.replace('.csv', ''), file: join(__dirname, './data/', name) }));
console.table(files);
function loadData(file = './data/house.csv') {
    const [header, ...data] = readFileSync(join(__dirname, file), 'utf8').split('\r\n');
    const fieldNames = header.split(',');
    const dataSet = data.map(row => handleLine(row).map((field, i) => ({ [fieldNames[i]]: field })));
    return dataSet;
}
function handleLine(line) {
    const rawData = line.split(',');
    const result = [];
    let reconstruct = '';
    let rejoining = false;
    for (const part of rawData) {
        // console.log(part)
        if (!rejoining && !part.startsWith('"')) {
            result.push(part);
            continue;
        }
        if (part.startsWith('"')) {
            rejoining = true;
            reconstruct = part;
            continue;
        }
        reconstruct += `, ${part}`;
        if (part.endsWith('"')) {
            rejoining = false;
            result.push(reconstruct);
            reconstruct = '';
            continue;
        }
    }
    return result;
}
//# sourceMappingURL=server.mjs.map