import '@angular/platform-server/init';
import { DOCUMENT } from '@angular/common';
import { enableProdMode, NgModule, NgZone, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { IdleMonitorService, ScullyLibModule } from '@scullyio/ng-lib';
import { ScullyPlatformServerModule } from '@scullyio/platform-server';
import { logError, logWarn } from '@scullyio/scully';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { debounceTime } from 'rxjs';


declare var Zone: any;

/**
 * the platform server should be running in production mode.
 */
enableProdMode();

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppModule,
    ScullyPlatformServerModule,
    ScullyLibModule.forRoot({ manualIdle: false })
  ],
  providers: [
    { provide: BEFORE_APP_SERIALIZED, multi: true, useFactory: scullyReadyEventFiredFactory, deps: [DOCUMENT, NgZone] },

  ],
  bootstrap: [AppComponent],
})
export default class AppSPSModule  {
  constructor(idle: IdleMonitorService) {
    idle.init();
    // setTimeout(() => idle.fireManualMyAppReadyEvent(), 1500)
  }


}


export function scullyReadyEventFiredFactory(doc: Document, ngZone: NgZone): () => Promise<void> {
  return () =>
    new Promise((resolve, _reject) => {
      let fired = false;
      ngZone.runOutsideAngular(() => {
        const monitor = () => {
          // console.log((<any>ngZone)._zoneDelegate._taskCounts)
          if (ngZone.hasPendingMacrotasks) {
            // logWarn(`pending tasks.`);
            return setTimeout(monitor, 25);
          }
          if (!fired) {
            return setTimeout(monitor, 25);
          }
          return setTimeout(() => resolve(), 5);
        }
        monitor();
        doc.addEventListener('AngularReady', () => {
          fired = true;
        })
      });
    });
}