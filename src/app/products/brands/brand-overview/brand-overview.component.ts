import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferStateService } from '@scullyio/ng-lib';
import { combineLatest, pluck, switchMap } from 'rxjs';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-brand-overview',
  template: `
  <ng-container *ngIf="vm$ |async as vm">
    <h1>{{vm.id}}</h1>
    <main>
      <a *ngFor="let p of vm.products" [routerLink]="['/products',p.id]">
        <img [src]="p.thumb" alt="">
      </a>
    </main>
  </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }
    img {
      width: 64px;
      height: 64px;
      margin: .25rem;
    }
  `]
})
export class BrandOverviewComponent {
  brandId$ = this.route.params.pipe(pluck('name'))
  brands$ = this.tss.useScullyTransferState('brandpage', this.brandId$.pipe(
    switchMap(id => this.prods.getProductsByBrand(id))
  ))


  vm$ = combineLatest({
    id: this.brandId$,
    products: this.brands$
  });

  constructor(private route: ActivatedRoute, private prods: ProductsService, private tss: TransferStateService) { }

}
