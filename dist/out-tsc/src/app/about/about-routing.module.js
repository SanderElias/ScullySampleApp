import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
const routes = [{ path: '', component: AboutComponent }];
let AboutRoutingModule = class AboutRoutingModule {
};
AboutRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AboutRoutingModule);
export { AboutRoutingModule };
//# sourceMappingURL=about-routing.module.js.map