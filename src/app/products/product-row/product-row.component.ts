import { Component, Input, OnInit } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { filter, map, Observable, pluck, ReplaySubject, subscribeOn, switchMap, tap } from 'rxjs';
import { isProduct, ProductsService, Product } from '../products.service';

@Component({
  selector: 'tr [productId]',
  template: `
          <td><a [routerLink]="['.',prod.id]">👀</a></td>
          <!-- <td>{{prod.id}}</td> -->
          <td>{{prod.subcategory}}</td>
          <td [highlight]="search">{{prod.name}}</td>
  `,
  styles: [
  ]
})
export class ProductRowComponent implements OnInit {
  prodId$ = new ReplaySubject<number>(1);
  @Input() search = '';
  @Input('productId') set productId(x: number) {
    if (typeof x === 'number') {
      this.prodId$.next(x);
    }
  };
  prod = {} as Partial<Product>

  subs = this.prodId$.pipe(
    switchMap(id => this.tss.useScullyTransferState(
      `prdRow${id}`,
      this.prd.getProduct(id).pipe(
        filter(isProduct),
        map(({id,subcategory,name}) => ({id,subcategory,name})),
      )
    ) as Observable<Partial<Product>>),
    tap(x => this.prod = x)
  ).subscribe()



  constructor(private prd: ProductsService, private tss: TransferStateService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
