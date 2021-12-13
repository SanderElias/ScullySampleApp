import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
let UsersService = class UsersService {
    constructor(http) {
        this.http = http;
        this.filter = new BehaviorSubject('');
        this.sortProp = new BehaviorSubject('name');
        this.users$ = combineLatest({
            users: this.http.get('http://localhost:8200/users'),
            sortBy: this.sortProp,
        }).pipe(map(({ users, sortBy }) => users.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)));
        this.filteredUsers$ = combineLatest({
            users: this.users$,
            filter: this.filter,
            prop: this.sortProp,
        }).pipe(map(({ users, filter, prop }) => users.filter(user => filter ? ('' + user[prop]).toLowerCase().includes(filter.toLowerCase()) : true)), map(users => users.slice(0, 25)));
    }
    setFilterTo(filter) {
        this.filter.next(filter);
    }
    setSortTo(sortProp) {
        console.log({ sortProp });
        this.sortProp.next(sortProp);
    }
};
UsersService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map