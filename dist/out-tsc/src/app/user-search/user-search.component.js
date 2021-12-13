import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UserSearchComponent = class UserSearchComponent {
    constructor(users, tss) {
        this.users = users;
        this.tss = tss;
        this.users$ = this.tss.useScullyTransferState('userSearch', this.users.filteredUsers$);
    }
    ngOnInit() {
    }
};
UserSearchComponent = __decorate([
    Component({
        selector: 'app-user-search',
        template: `
  <a *ngFor="let user of users$|async" [routerLink]="['..',user.id]">{{user.id}} - {{user.name}} ({{user.email}})</a>
  `,
        styles: [`
    a {
      display: block;
      margin: 5px;
      color:white;
      text-decoration: none;
    }
  `]
    })
], UserSearchComponent);
export { UserSearchComponent };
//# sourceMappingURL=user-search.component.js.map