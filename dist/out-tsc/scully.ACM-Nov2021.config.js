import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import { docToc } from './scully/docToc.plugin';
export const config = {
    projectRoot: "./src",
    projectName: "ACM-Nov2021",
    outDir: './dist/static',
    routes: {
        '/blog/:slug': {
            type: 'contentFolder',
            postRenderers: [docToc, docLink],
            slug: {
                folder: "./blog"
            }
        },
        '/users/:id': {
            type: 'json',
            id: {
                url: 'http://localhost:8200/users',
                /** limit to the first 25 users to save time */
                resultsHandler: (raw) => raw.filter((row) => row.id < 25),
                property: 'id',
            },
        }
    }
};
//# sourceMappingURL=scully.ACM-Nov2021.config.js.map