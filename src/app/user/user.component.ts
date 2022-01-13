import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferStateService } from '@scullyio/ng-lib';
import { combineLatest, map, pluck } from 'rxjs';
import { UsersService } from '../users/users.service';

@Component({
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
export class UserComponent {
  user$ = this.tss.useScullyTransferState('userComponent',
    combineLatest({
      users: this.users.users$,
      id: this.route.params.pipe(pluck('id'))
    }).pipe(
      // tap(user => console.log(user)),
      map(({ users, id }) => users.find(user => user.id === +id)),
    )
  )

  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private tss: TransferStateService
  ) { }



}
