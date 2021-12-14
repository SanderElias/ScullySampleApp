import { ScullyConfig, enableSPS, registerPlugin, logOk, stopProgress, startProgress } from '@scullyio/scully';
import { folder } from '@scullyio/scully/src/lib/utils/cli-options';
import { exec, fork } from 'child_process';
import { cpus } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import { docToc } from './scully/docToc.plugin';
// import "@scullyio/scully-plugin-puppeteer"
const __dirname = dirname(fileURLToPath(import.meta.url));

enableSPS();



// const cp = fork(join(__dirname, "./server/server.mjs"), [], { stdio: [0, 1, 2, 'ipc'] });



export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-sample-app",
  outDir: './dist/static',
  spsModulePath: './src/app/app.sps.module.ts',
  maxRenderThreads: cpus().length * 2,
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
    },
    '/products/:id': {
      type: 'json',
      id: {
        url: 'http://localhost:8201/house?field=id',
        /** limit to the first 25 users to save time */
        resultsHandler: (raw: number[]) => raw.slice(0, 500).map(id => ({ id })),
        property: 'id',
      },
    }
  }
};


registerPlugin('beforeAll', 'netlifyPrepare', async () => {
  stopProgress()
  logOk('compile server')
  await new Promise(r => {
    const tsConf = join(__dirname, './server/tsconfig.server.json')
    exec(`npx tsc -p ${tsConf}`, () => {
      logOk('Server is compiled')
      r(undefined)
    })
  })
  logOk('start up data server')
  const cp = fork(join(__dirname, "./server/server.mjs"), [], { stdio: [0, 1, 2, 'ipc'] });  
  await new Promise(r => setTimeout(() => r(undefined), 1500))  
  startProgress()

  logOk('data server started')

}, -100)