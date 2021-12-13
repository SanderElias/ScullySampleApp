import { JSDOM } from 'jsdom';
const marked = require('marked');
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = window;
export function getHeadings(content) {
    const lines = content.split('\n') || [];
    const headerLines = lines.filter((line) => line.startsWith('#')) || [];
    return headerLines
        .map((line) => {
        const outer = document.createElement('div');
        outer.innerHTML = marked(line.trim());
        const elm = outer.firstChild;
        try {
            // extract Id
            const id = elm['id'];
            const desc = elm.textContent;
            return [id, desc];
        }
        catch (e) {
            console.log('oops', e);
            return ['', ''];
        }
    });
}
//# sourceMappingURL=getHeader.js.map