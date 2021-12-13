import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
let SelectComponent = class SelectComponent {
    constructor(srs) {
        this.srs = srs;
        this.blogs$ = this.srs.available$.pipe(map(routes => routes.filter(route => route.route.startsWith('/blog/'))));
        /** will be undefined when there is no blog matching the url */
        this.current$ = this.srs.getCurrent();
        this.vm$ = combineLatest({
            list: this.blogs$,
            current: this.current$
        });
    }
};
SelectComponent = __decorate([
    Component({
        selector: 'app-select',
        template: `
  <ng-container *ngIf="vm$|async as vm">
    <nav>      
      <a [title]="item.description" [class.active]="vm.current===item" *ngFor="let item of vm.list" [routerLink]="item.route">{{item.title}}</a>
    </nav>
    <main>
      <app-blog404 *ngIf="vm.current===undefined"></app-blog404>
      <router-outlet [style.display]="vm.current!==undefined?'none':'inherit'"></router-outlet>
    </main>
  </ng-container>
  <style>
    :host {
      display:grid;
      grid-template-columns: 15rem 1fr;
    }
    main {
      height: calc(100vh - 50px);
      overflow-y: auto;
    }
    nav>a {
      display: block;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #afafaf;
    }
    nav>a.active {
      color: white;
      font-size: 1.05em;
      padding-left: .4rem;
    }
  </style>
`
    })
], SelectComponent);
export { SelectComponent };
//# sourceMappingURL=select.component.js.map