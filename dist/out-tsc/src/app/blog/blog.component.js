import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let BlogComponent = class BlogComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
    }
    ngOnInit() { }
};
BlogComponent = __decorate([
    Component({
        selector: 'app-blog',
        templateUrl: './blog.component.html',
        styleUrls: ['./blog.component.css'],
        preserveWhitespaces: true,
        encapsulation: ViewEncapsulation.Emulated
    })
], BlogComponent);
export { BlogComponent };
//# sourceMappingURL=blog.component.js.map