import { ScullyConfig, enableSPS } from '@scullyio/scully';
// import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import { docToc } from './scully/docToc.plugin';
// import "@scullyio/scully-plugin-puppeteer"

enableSPS();

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-sample-app",
  outDir: './dist/static',
  spsModulePath: './src/app/app.sps.module.ts',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
    '/users/:id': {
      type: 'json',
      id: {
        url: 'http://localhost:8200/users',
        /** limit to the first 25 users to save time */
        resultsHandler: (raw: any[]) => raw.filter((row) => row.id < 25),
        property: 'id',
      },
    }
  }
};
