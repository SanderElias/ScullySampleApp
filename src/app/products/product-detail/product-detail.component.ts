import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransferStateService } from '@scullyio/ng-lib';
import { filter, map, Observable, pluck, switchMap } from 'rxjs';
import { isValidProduct, Product, ProductsService } from '../products.service';
import { RelatedComponent } from './related/related.component';
@Component({
  selector: 'app-product-detail',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <related-prods [subcategory]="vm.prod.subcategory"></related-prods>
      <header>
       <a [routerLink]="['/products']">🔙</a>
        <h1>{{vm.prod.name.slice(0,30)}}</h1>              
      </header>
      <img [src]="vm.mainImage" alt="">
      <aside>
        <h4>Catagpry: {{vm.prod.name}}</h4>
        <h4>Catagpry: {{vm.prod.category}}</h4>
        <h4>Type: {{vm.prod.subcategory}}</h4>
        <!-- TODO: make brand page -->
        <a  [routerLink]="['/brand',vm.prod.brand]">{{vm.prod.brand}} </a>
        <button *ngFor="let vr of vm.variations" (click)="vm.mainImage = vr.image ?? vm.mainImage">
          <img [src]="vr.thumb" [alt]="vr.color" [title]="vr.color">
        </button>

      </aside>
    </ng-container>
  `,
  styles: [`
  :host {
    display:grid;
    grid-template-columns: 11rem 20rem 1fr;
    grid-template-rows: 4rem 1fr;
    gap: 1rem;
  }  
  related-prods {
    grid-row: span 2;
  }
  header {
    grid-column: 2 / 4; 
    display: grid;
    grid-template-columns: 60px 1fr;
    align-items: center;
    /* justify-items: center;    */
  }
  header > a {
    text-decoration: none;
    text-align: center;
    font-size: 2rem;    
  }
  img {
    width: 19rem;
    height: 19rem;
  }
  aside > button {
    margin: 1rem 0;
    padding:0;
    width: 64px;
    height: 64px;
    background-color: inherit;
    border: none;
  }
  aside > button > img {
    display:block;
    margin: 1rem 0;
    width: 64px;
    height: 64px;
  }

  `]
})
export class ProductDetailComponent {
  id$ = this.route.parent?.params.pipe(pluck('id')) as Observable<number>;

  product$ = this.tss.useScullyTransferState(`prod`, this.id$.pipe(
    switchMap(id => this.prod.getProduct((id))),
    filter(s => isValidProduct(s))
  )) as Observable<Product>;

  vm$ = this.product$.pipe(
    map(prod => (
      {
        prod,
        mainImage: prod.image_url,
        variations: [{
          image: prod.variation_0_image,
          color: prod.variation_0_color,
          thumb: prod.variation_0_thumbnail,
        },
        {
          image: prod.variation_1_image,
          color: prod.variation_1_color,
          thumb: prod.variation_1_thumbnail,
        }
        ].filter(x => x.color && x.thumb)
      }))
  )

  constructor(private prod: ProductsService, private tss: TransferStateService, private route: ActivatedRoute) { }



}



@NgModule({
  declarations: [ProductDetailComponent, RelatedComponent],
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
