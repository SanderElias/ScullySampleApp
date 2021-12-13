import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
let AboutModule = class AboutModule {
};
AboutModule = __decorate([
    NgModule({
        declarations: [
            AboutComponent
        ],
        imports: [
            CommonModule,
            AboutRoutingModule
        ]
    })
], AboutModule);
export { AboutModule };
//# sourceMappingURL=about.module.js.map