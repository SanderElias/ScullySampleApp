import { enableSPS, HandledRoute, registerPlugin, routeSplit, ScullyConfig } from '@scullyio/scully';
import { readFileSync } from 'fs';
import { cpus } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import "@scullyio/scully-plugin-puppeteer"
const __dirname = dirname(fileURLToPath(import.meta.url));

enableSPS();



// const cp = fork(join(__dirname, "./server/server.mjs"), [], { stdio: [0, 1, 2, 'ipc'] });
registerPlugin('router', 'loadFromFile', async (route, config) => {
  if (!route) {
    return [];
  }
  const data = JSON.parse(readFileSync(join(__dirname, './src/assets/house.json'), 'utf-8')).map((row: any) => row.id as number).slice(0, 2500);
  const { params, createPath } = routeSplit(route);
  return data.map((id: number) => ({ route: createPath(`${id}`) } as HandledRoute));
});


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-sample-app",
  outDir: './dist/static',
  spsModulePath: './src/app/app.sps.module.ts',
  /** netlify likes to haev some spare room */
  maxRenderThreads: cpus().length - 2,
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
      type: 'loadFromFile',
      id: {
        url: 'http://localhost:8201/house?field=id',
        /** limit to the first 25 users to save time */
        resultsHandler: (raw: number[]) => raw.slice(0, 1500).map(id => ({ id })),
        property: 'id',
      },
    }
  }
};


registerPlugin('beforeAll', 'netlifyPrepare', async () => {
  // stopProgress()
  // logOk('compile server')
  // await new Promise(r => {
  //   const tsConf = join(__dirname, './server/tsconfig.server.json')
  //   exec(`npx tsc -p ${tsConf}`, () => {
  //     logOk('Server is compiled')
  //     r(undefined)
  //   })
  // })
  // // logOk('start up data server')
  // const cp = fork(join(__dirname, "./server/server.mjs"), [], { stdio: [0, 1, 2, 'ipc'] });  
  // // give the server 5 seconds to start
  // await new Promise(r => setTimeout(() => r(undefined), 5 * 1000))  
  // startProgress()
  // logOk('data server started')

}, -100)