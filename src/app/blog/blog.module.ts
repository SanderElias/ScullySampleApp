import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';
import { Blog404Component } from './blog404/blog404.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [BlogComponent, SelectComponent, Blog404Component],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule],
})
export class BlogModule {}
