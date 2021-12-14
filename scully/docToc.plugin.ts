import { registerPlugin } from '@scullyio/scully';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { getHeadings } from './getHeader';






export const docToc = Symbol('docToc');
registerPlugin('postProcessByDom', docToc, async (dom, route) => {
  if (!route?.templateFile) { return dom as unknown as JSDOM; }
  const headingIds = getHeadings(readFileSync(route.templateFile, 'utf-8').toString());
  if (headingIds.length < 3 ) { return dom as unknown as JSDOM; }
  const toc = `<ul>${headingIds.map(createLi).join('')}</ul>`;
  const heads = headingIds.map((h) => h[1]);
  const last = heads.pop();
  const desc = `Scully documentation page containing ${heads.join(',')} and ${last}`;
  const {
    window: { document },
  } = dom!;
  const { window } = dom!;
  const tocDiv = document.createElement('div');
  tocDiv.id = 'toc-doc';
  tocDiv.innerHTML = toc;
  const meta = document.createElement('meta');
  meta.name = 'description';
  meta.content = desc;
  document.head.appendChild(meta);
  const scullyContentParent = document.querySelector('scully-content')?.parentElement!;
  if (scullyContentParent && tocDiv) {
    const firstChild = findComment(window, scullyContentParent, 'scullyContent-begin').nextSibling;
    scullyContentParent.insertBefore(tocDiv, firstChild);
  }
  // document.querySelector('scully-content')!.parentNode!.appendChild(tocDiv);
  return dom as unknown as JSDOM;
  function createLi([id, desc]: [string, string]) {
    return `
    <li><a href="#${id}">${desc}</a></li>`;
  }
});
function findComment(window: any, rootElem: HTMLElement, comment: string) {
  const document = window.document;
  const NodeFilter = window.NodeFilter;
  var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone);
  var curNode;
  while (curNode = iterator.nextNode()) {
    // console.log(curNode.nodeValue);
    if (curNode?.nodeValue?.indexOf(comment) !== -1) {
      return curNode;
    }
  }
  return undefined as unknown as HTMLElement;

  function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
  }
}
