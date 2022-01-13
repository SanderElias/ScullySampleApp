import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { User } from './user.interface';

export type SortFields = 'name' | 'id' | 'email';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  filter = new BehaviorSubject<string>('')
  sortProp = new BehaviorSubject<SortFields>('name')
  users$ = combineLatest({
    users: this.http.get<User[]>('http://localhost:8200/users'),
    sortBy: this.sortProp,
  }).pipe(
    map(({ users, sortBy }) => users.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)),
  );

  filteredUsers$ = combineLatest({
    users: this.tss.useScullyTransferState('usUsers',
      this.users$.pipe(map(users => users.map(({ name, id, email }) => ({ name, id, email }))))
    ),
    filter: this.filter,
    prop: this.sortProp,
  }).pipe(
    map(({ users, filter, prop }) =>
      users.filter(user => filter ? ('' + user[prop]).toLowerCase().includes(filter.toLowerCase()) : true)
    ),
    map(users => users.slice(0, 25))
  )

  constructor(
    private http: HttpClient,
    private tss: TransferStateService
  ) { }

  setFilterTo(filter: string) {
    this.filter.next(filter)
  }

  setSortTo(sortProp: SortFields) {
    // console.log({ sortProp })
    this.sortProp.next(sortProp)
  }
}
