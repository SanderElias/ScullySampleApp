import { readdirSync, readFileSync } from 'fs';
import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath, URL } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(join(__dirname, "../data/")).map(name => ({ name: name.replace('.csv', ''), fullPath: join(__dirname, '../data/', name) }));
const memCache = new Map();
for (const file of files) {
    memCache.set(file.name, loadData(file.fullPath));
}
console.table([...memCache.entries()].map(([endpoint, value]) => ({ endpoint, rows: value.length })));
console.log('loaded all, ready to serve');
createServer(function (request, response) {
    const url = new URL(request.url ?? '', 'http://localhost:8001');
    const [_dummy, category, id] = url.pathname?.split('/') || [];
    const { unique, field } = Array.from(url.searchParams.entries()).reduce((a, [key, value]) => ({ ...a, [key]: value }), {});
    const file = files.find(({ name }) => name === category)?.fullPath;
    if (file) {
        if (!memCache.has(category)) {
            memCache.set(category, loadData(file));
        }
        const dataset = memCache.get(category);
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': request.headers.origin || '*',
        });
        if (!id) {
            return response.end(JSON.stringify(dataset?.reduce((result, row) => {
                if (field) {
                    result.push(row[field]);
                }
                else if (unique) {
                    const fieldData = row[unique];
                    if (!result.includes(fieldData)) {
                        result.push(fieldData);
                    }
                }
                else {
                    result.push(row);
                }
                return result;
            }, [])));
        }
        const result = dataset?.find((row) => row.id === +id);
        if (result) {
            return response.end(JSON.stringify(result));
        }
        response.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': request.headers.origin || '*',
        });
        return response.end(JSON.stringify({ error: `no data found for id ${id}` }));
    }
    handle404(response, request);
}).listen(8201);
function handle404(response, request) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`<h1>not found ${request.url}</h1>
   available endpoints:<br><ul>
  ${files.map(({ name }) => `<li><a href="/${name}">${name}</a></li>`).join('')}
  </ul>`);
}
function loadData(file) {
    const [header, ...data] = readFileSync(file, 'utf8').split('\r\n');
    const fieldNames = header.split(',');
    const dataSet = data.map(row => handleLine(row).reduce((a, field, i) => ({ ...a, [fieldNames[i]]: cast(field) }), {}));
    return dataSet;
}
function cast(field) {
    if (isNumeric(field)) {
        return +field;
    }
    if (isTrue(field)) {
        return true;
    }
    if (isFalse(field)) {
        return false;
    }
    return field;
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
    return (result);
}
function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}
function isTrue(str) {
    return typeof str === 'string' && str.toLowerCase() === 'true';
}
function isFalse(str) {
    return typeof str === 'string' && str.toLowerCase() === 'false';
}
