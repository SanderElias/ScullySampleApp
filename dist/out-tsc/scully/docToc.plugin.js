import { registerPlugin } from '@scullyio/scully';
import { readFileSync } from 'fs';
import { getHeadings } from './getHeader';
export const docToc = Symbol('docToc');
registerPlugin('postProcessByDom', docToc, async (dom, route) => {
    var _a;
    if (!(route === null || route === void 0 ? void 0 : route.templateFile)) {
        return dom;
    }
    const headingIds = getHeadings(readFileSync(route.templateFile, 'utf-8').toString());
    if (headingIds.length < 3) {
        return dom;
    }
    const toc = `<ul>${headingIds.map(createLi).join('')}</ul>`;
    const heads = headingIds.map((h) => h[1]);
    const last = heads.pop();
    const desc = `Scully documentation page containing ${heads.join(',')} and ${last}`;
    const { window: { document }, } = dom;
    const { window } = dom;
    const tocDiv = document.createElement('div');
    tocDiv.id = 'toc-doc';
    tocDiv.innerHTML = toc;
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = desc;
    document.head.appendChild(meta);
    const scullyContentParent = (_a = document.querySelector('scully-content')) === null || _a === void 0 ? void 0 : _a.parentElement;
    if (scullyContentParent && tocDiv) {
        const firstChild = findComment(window, scullyContentParent, 'scullyContent-begin').nextSibling;
        scullyContentParent.insertBefore(tocDiv, firstChild);
    }
    // document.querySelector('scully-content')!.parentNode!.appendChild(tocDiv);
    return dom;
    function createLi([id, desc]) {
        return `
    <li><a href="#${id}">${desc}</a></li>`;
    }
});
function findComment(window, rootElem, comment) {
    var _a;
    const document = window.document;
    const NodeFilter = window.NodeFilter;
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone);
    var curNode;
    while (curNode = iterator.nextNode()) {
        console.log(curNode.nodeValue);
        if (((_a = curNode === null || curNode === void 0 ? void 0 : curNode.nodeValue) === null || _a === void 0 ? void 0 : _a.indexOf(comment)) !== -1) {
            return curNode;
        }
    }
    return undefined;
    function filterNone() {
        return NodeFilter.FILTER_ACCEPT;
    }
}
//# sourceMappingURL=docToc.plugin.js.map