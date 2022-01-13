import { enableSPS, HandledRoute, registerPlugin, routeSplit, ScullyConfig } from '@scullyio/scully';
import { readFileSync } from 'fs';
import { cpus } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import "@scullyio/scully-plugin-puppeteer"
const __dirname = dirname(fileURLToPath(import.meta.url));

enableSPS();


/** 
 * normally, you will get the data from en server endpoint
 * but in this example we use the data from the file system
 */
const dataset = JSON.parse(readFileSync(join(__dirname, './src/assets/house.json'), 'utf-8'))

/** 
 * minimal plugin to maker routes fer every product in the dataset
 */
registerPlugin('router', 'getProductRoutes', async (route, config) => {
  if (!route) return [];
  const data = dataset.map((row: any) => row.id as number) //.slice(0, 500);
  const { params, createPath } = routeSplit(route);
  return data
    // .slice(0, 50)
    .map((id: number) => ({ route: createPath(`${id}`) } as HandledRoute));
});

/** 
 * minimal plugin to extract available brands from the dataset
 */
registerPlugin('router', 'getBrandRoutes', async (route, config) => {
  if (!route) return [];
  const data: Set<string> = dataset.reduce((r: Set<string>, row: any) => r.add(row.brand), new Set<string>());
  const { params, createPath } = routeSplit(route);
  return Array.from(data.values())
    // .slice(0, 50)
    .map(id => ({ route: createPath(`${id}`) } as HandledRoute));
});


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-sample-app",
  outDir: './dist/static',
  spsModulePath: './src/app/app.sps.module.ts',
  /** netlify likes to haev some spare room */
  maxRenderThreads: cpus().length * 3,
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
    /** this route uses the scully-build in test data server to get users. */
    '/users/:id': {
      type: 'json',
      id: {
        url: 'http://localhost:8200/users',
        /** limit to the first 25 users to save time */
        // resultsHandler: (raw: any[]) => raw.filter((row) => row.id < 25),
        property: 'id',
      },
    },
    /** uses the plugin defined above to get products */
    '/products/:id': {
      type: 'getProductRoutes',
    },
    /** uses the plugin defined above to get brands */
    '/brand/:name': {
      type: 'getBrandRoutes',
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