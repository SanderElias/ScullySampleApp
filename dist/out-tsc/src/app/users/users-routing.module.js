import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
const routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            { path: 'search', loadChildren: () => import('../user-search/user-search.module').then(m => m.UserSearchModule) },
            { path: ':id', loadChildren: () => import('../user/user.module').then(m => m.UserModule) }
        ]
    }
];
let UsersRoutingModule = class UsersRoutingModule {
};
UsersRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], UsersRoutingModule);
export { UsersRoutingModule };
//# sourceMappingURL=users-routing.module.js.map