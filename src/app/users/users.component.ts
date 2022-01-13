import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SortFields, UsersService } from './users.service';

@Component({
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
export class UsersComponent {

  constructor(private users: UsersService, private router: Router) { }

  onInput(event: any) {
    this.router.navigate(['/users', 'search']);
    this.users.setFilterTo(event.target.value);
  }

  sort(key: SortFields) {
    this.users.setSortTo(key);
  }

}
