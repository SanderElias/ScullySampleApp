import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchRoutingModule } from './user-search-routing.module';
import { UserSearchComponent } from './user-search.component';
let UserSearchModule = class UserSearchModule {
};
UserSearchModule = __decorate([
    NgModule({
        declarations: [
            UserSearchComponent
        ],
        imports: [
            CommonModule,
            UserSearchRoutingModule
        ]
    })
], UserSearchModule);
export { UserSearchModule };
//# sourceMappingURL=user-search.module.js.map