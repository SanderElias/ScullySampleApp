import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UsersComponent = class UsersComponent {
    constructor(users, router) {
        this.users = users;
        this.router = router;
    }
    onInput(event) {
        this.router.navigate(['/users', 'search']);
        this.users.setFilterTo(event.target.value);
    }
    sort(key) {
        this.users.setSortTo(key);
    }
};
UsersComponent = __decorate([
    Component({
        selector: 'app-users',
        template: `
    <input type='text' (input)='onInput($event)'>
    <label><input name='sort' type='radio' (change)='sort("name")' > Name</label>
    <label><input name='sort' type='radio' (change)='sort("id")' > Id</label>
    <label><input name='sort' type='radio' (change)='sort("email")' > Email</label>
    <router-outlet></router-outlet>
    <style>
      input[type=text] {
        display: inline-block;
      }
      label {
        margin-left: ;
      }
    </style>
  `,
    })
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map