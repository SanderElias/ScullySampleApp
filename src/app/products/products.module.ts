import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { HighlightDirectiveModule } from '../highlight.directive';
import { ProductRowComponent } from './product-row/product-row.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductRowComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HighlightDirectiveModule
  ]
})
export class ProductsModule { }
