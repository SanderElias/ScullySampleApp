import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransferStateService } from '@scullyio/ng-lib';
import { ProductsService } from '../products.service';
import { BrandOverviewComponent } from './brand-overview/brand-overview.component';

@Component({
  selector: 'app-brands',
  template: `
  <h1>Available Brands</h1>
  <a *ngFor="let brand of brands$|async" [routerLink]="['.',brand.name]">
    <span>{{brand.name}}</span>
    <span>{{brand.count}}</span>
    <span>products</span>
  </a>
  `,
  styles: [`
  a {    
    display: grid;   
    float: left; 
    /* border: 1px solid #ccc; */
    background-color: #ffffff05;
    width: 100px;
    height: 100px;
    margin: 4px;
    decoration: none;
    grid-template-rows: 1.5em 1fr 1.5em;
    text-align: center;
    text-decoration: none;
    justify-items: center;
    align-items: center;
    color: #eee;
  }
  span:nth-child(2) {
    display: block;    
    font-size: 3em;
    color:#fff;
  }
  .brand img {
    width: 32px;
    height:auto;
  }
  
  `]
})
export class BrandsComponent implements OnInit {
  brands$ = this.tss.useScullyTransferState('brand', this.prod.getBrands());

  constructor(private prod: ProductsService, private tss: TransferStateService) { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [BrandsComponent, BrandOverviewComponent],
  imports: [RouterModule.forChild([
    { path: '', component: BrandsComponent, pathMatch: 'full' },
    { path: ':name', component: BrandOverviewComponent }
  ]), CommonModule],
  exports: [BrandsComponent]
})
export class BrandsComponentModule {
}
