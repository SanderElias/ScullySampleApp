import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-brands',
  template: `
  <h1>Available Brands</h1>
  <a [routerLink]="['/products']">Back to Products</a>
  <a class="brand" *ngFor="let brand of brands$|async" [routerLink]="['.',brand]">
    <ng-container *ngIf="brand?.startsWith('http') else textVersion">
      <img [src]="brand" alt="{{brand}}" />
    </ng-container>
    <ng-template #textVersion>
      {{brand}}
    </ng-template>
  </a>

  `,
  styles: [`
  .brand {    
    display: inline-block;
    /* border: 1px solid #ccc; */
    width: 100px;
    margin: 4px
  }
  .brand img {
    width: 32px;
    height:auto;
  }
  
  `]
})
export class BrandsComponent implements OnInit {
  brands$ = this.prod.getBrands();

  constructor(private prod: ProductsService) { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [BrandsComponent],
  imports: [RouterModule.forChild([{ path: '', component: BrandsComponent }]), CommonModule],
  exports: [BrandsComponent]
})
export class BrandsComponentModule {
}
