import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    NgModule({
        declarations: [
            UsersComponent
        ],
        imports: [
            CommonModule,
            UsersRoutingModule
        ]
    })
], UsersModule);
export { UsersModule };
//# sourceMappingURL=users.module.js.map