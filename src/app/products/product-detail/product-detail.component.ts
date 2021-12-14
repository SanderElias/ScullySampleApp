import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { TransferStateService } from '@scullyio/ng-lib';
import { filter, map, Observable, pluck, switchMap } from 'rxjs';
import { ProductsService, Product, isProduct } from '../products.service';

@Component({
  selector: 'app-product-detail',
  template: `
    <ng-container *ngIf="product$ | async as prod">
      <header>
        <h1>{{prod.name.slice(0,30)}}</h1>
        <a [routerLink]="['/products']">Back to Products</a>      
      </header>
      <img [src]="prod.image_url" alt="">
      <aside>
        <h4>Catagpry: {{prod.category}}, type: {{prod.subcategory}}</h4>
        <!-- TODO: make brand page -->
        <a target="_blank" [href]="prod.brand_url">{{prod.brand}} </a>
        <img [src]="prod.variation_0_thumbnail" alt="">
        <img [src]="prod.variation_1_thumbnail" alt="">

      </aside>
      <pre>
        {{prod | json}}
      </pre>      
    </ng-container>
  `,
  styles: [`
  :host {
    display:grid;
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 4rem 1fr;
    gap: 1rem;
  }
  header {
    grid-column: 1 / 3;    
  }
  img {
    width: 100%;
    height: auto
  }
  aside > img {
    display:block;
    margin: 1rem 0;
    width: 64px;
    height: auto;
  }

  `]
})
export class ProductDetailComponent implements OnInit {
  id$ = this.route.parent?.params.pipe(pluck('id')) as Observable<number>;

  //TODO: handle case where there is no product.
  product$ = this.tss.useScullyTransferState(`prod`, this.id$.pipe(
    switchMap(id => this.prod.getProduct((id))),
    filter(isProduct)
  ))

  vm$ = this.product$.pipe(
    map()
  )

  constructor(private prod: ProductsService, private tss: TransferStateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}



@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductDetailComponent }
    ])
  ],
  exports: [ProductDetailComponent]
})
export class ProductDetailComponentModule {
}
