import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'brand', loadChildren: () => import('./brands/brands.component').then(m => m.BrandsComponentModule) },
  { path: ':id', loadChildren: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponentModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
