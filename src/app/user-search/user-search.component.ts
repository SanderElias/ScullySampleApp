import { Component, OnInit } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { UsersService } from '../users/users.service';

@Component({
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
export class UserSearchComponent implements OnInit {
  users$ = this.tss.useScullyTransferState('userSearch', this.users.filteredUsers$)

  constructor(
    private users: UsersService,
    private tss: TransferStateService
  ) { }

  ngOnInit(): void {
  }

}
