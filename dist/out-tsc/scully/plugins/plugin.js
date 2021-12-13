import { registerPlugin } from '@scullyio/scully';
export const myPlugin = 'myPlugin';
const myFunctionPlugin = async (html) => {
    return html;
};
const validator = async () => [];
registerPlugin('postProcessByHtml', myPlugin, myFunctionPlugin, validator);
//# sourceMappingURL=plugin.js.map