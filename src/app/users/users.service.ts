import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  filter = new BehaviorSubject<string>('')
  sortProp = new BehaviorSubject<keyof User>('name')
  users$ = combineLatest({
    users: this.http.get<User[]>('http://localhost:8200/users'),
    sortBy: this.sortProp,
  }).pipe(
    map(({ users, sortBy }) => users.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)),
  );

  filteredUsers$ = combineLatest({
    users: this.users$,
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
  ) { }

  setFilterTo(filter: string) {
    this.filter.next(filter)
  }

  setSortTo(sortProp: keyof User) {
    console.log({ sortProp })
    this.sortProp.next(sortProp)
  }
}
