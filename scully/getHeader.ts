import { JSDOM } from 'jsdom';
const marked = require('marked');

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = window;
export function getHeadings(content: string): [string, string][] {

  const lines: string[] = content.split('\n') || [];
  const headerLines: string[] = lines.filter((line) => line.startsWith('#')) || [];
  return headerLines
    .map((line) => {
      const outer = document.createElement('div');
      outer.innerHTML = marked(line.trim());
      const elm = outer.firstChild as HTMLElement;
      try {
        // extract Id
        const id = elm['id'] as string;
        const desc = elm!.textContent;
        return [id, desc];
      } catch (e) {
        console.log('oops', e);
        return ['', ''];
      }
    }) as [string, string][];
}
