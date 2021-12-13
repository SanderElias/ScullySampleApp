import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { SelectComponent } from './select/select.component';
const routes = [
    {
        path: '', component: SelectComponent, children: [
            {
                path: ':slug',
                component: BlogComponent,
            },
            {
                path: '**',
                component: BlogComponent,
            }
        ]
    }
];
let BlogRoutingModule = class BlogRoutingModule {
};
BlogRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], BlogRoutingModule);
export { BlogRoutingModule };
//# sourceMappingURL=blog-routing.module.js.map