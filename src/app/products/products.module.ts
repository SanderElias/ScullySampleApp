import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightDirectiveModule } from '../highlight.directive';
import { ProductRowComponent } from './product-row/product-row.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';



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
