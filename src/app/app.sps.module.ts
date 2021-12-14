import { enableProdMode, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyPlatformServerModule } from '@scullyio/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


/**
 * the platform server should be running in production mode.
 */
enableProdMode();


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppModule,
    ScullyPlatformServerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppSPSModule implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => console.log('done'), 500)
  }
}