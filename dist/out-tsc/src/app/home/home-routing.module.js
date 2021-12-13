import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
const routes = [{ path: '', component: HomeComponent }];
let HomeRoutingModule = class HomeRoutingModule {
};
HomeRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], HomeRoutingModule);
export { HomeRoutingModule };
//# sourceMappingURL=home-routing.module.js.map