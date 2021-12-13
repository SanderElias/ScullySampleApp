import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { combineLatest, map, pluck, tap } from 'rxjs';
let UserComponent = class UserComponent {
    constructor(users, route, tss) {
        this.users = users;
        this.route = route;
        this.tss = tss;
        this.user$ = this.tss.useScullyTransferState('userComponent', combineLatest({
            users: this.users.users$,
            id: this.route.params.pipe(pluck('id'))
        }).pipe(tap(user => console.log(user)), map(({ users, id }) => users.find(user => user.id === +id))));
    }
    ngOnInit() {
    }
};
UserComponent = __decorate([
    Component({
        selector: 'app-user',
        template: `
  <h4>User Data</h4>
  <section *ngIf="user$|async as user">
    <label>Id</label>
    <p>{{ user.id }}</p>
    <label>Name</label>
    <p>{{ user.name }}</p>
    <label>email</label>
    <p>{{ user.email }}</p>
    <label>company</label>
    <p>{{ user.company.name }}</p>
  </section>
  <style>
    section {
      display: grid;
      padding: 10px;
      width: fit-content;
      background: rgba(0, 0, 0, 0.1);
      grid-template-columns: 4rem 1fr;
      grid-template-rows: repeat(4, 1rem);
      gap: 4px;
    }

    label {
      text-align: right;
    }
    p {margin: 0;}

    label::after {
      content: ':';
    }
  </style>  
  `
    })
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.component.js.map