import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSearchComponent } from './user-search.component';
const routes = [{ path: '', component: UserSearchComponent }];
let UserSearchRoutingModule = class UserSearchRoutingModule {
};
UserSearchRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], UserSearchRoutingModule);
export { UserSearchRoutingModule };
//# sourceMappingURL=user-search-routing.module.js.map