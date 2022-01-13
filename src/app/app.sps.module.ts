import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IdleMonitorService, ScullyLibModule } from '@scullyio/ng-lib';
import { ScullyPlatformServerModule } from '@scullyio/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


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
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppSPSModule  {
  constructor(idle: IdleMonitorService) {
    idle.init();
    // setTimeout(() => idle.fireManualMyAppReadyEvent(), 1500)
  }


}

