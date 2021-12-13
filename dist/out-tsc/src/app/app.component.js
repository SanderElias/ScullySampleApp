import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'ACM-Nov2021';
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        template: `
    <header><nav>
      <a routerLinkActive='active' routerLink="/home">Home</a>
      <a routerLinkActive='active' routerLink="/about">About</a>
      <a routerLinkActive='active' routerLink="/users/search">Users</a>
      <a routerLinkActive='active' routerLink="/blog">Blog</a>
    </nav></header>
    <main>
      <router-outlet></router-outlet>
    </main>
    
  `,
        styles: [``]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map