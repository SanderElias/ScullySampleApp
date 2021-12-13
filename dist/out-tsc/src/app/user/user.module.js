import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
let UserModule = class UserModule {
};
UserModule = __decorate([
    NgModule({
        declarations: [
            UserComponent
        ],
        imports: [
            CommonModule,
            UserRoutingModule
        ]
    })
], UserModule);
export { UserModule };
//# sourceMappingURL=user.module.js.map