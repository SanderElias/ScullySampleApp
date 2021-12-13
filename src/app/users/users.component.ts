import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.interface';
import { UsersService } from './users.service';

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
export class UsersComponent  {

  constructor(private users: UsersService, private router: Router) { }

  onInput(event: any) {
    this.router.navigate(['/users', 'search']);
    this.users.setFilterTo(event.target.value);
  }

  sort(key: keyof User) {
     this.users.setSortTo(key);
  }

}
