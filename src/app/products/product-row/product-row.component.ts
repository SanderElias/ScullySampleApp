import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransferStateService } from '@scullyio/ng-lib';
import { filter, firstValueFrom, map, Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { isProduct, Product, ProductsService } from '../products.service';

@Component({
  selector: 'tr [productId]',
  template: `
          <!-- <td>{{prod.id}}</td> -->
          <td>{{prod.subcategory}}</td>
          <td [highlight]="search">{{prod.name}}</td>
  `,
  styles: [`
  :host {
    display: table-row; 
    cursor: pointer;   
  }
  
  :host:hover {
    background-color: #f5f5f5;
    color: #111;
  }
  
  `]
})
export class ProductRowComponent implements OnDestroy {
  prodId$ = new ReplaySubject<number>(1);
  @HostListener('click') async onClick() {
    const id = await firstValueFrom(this.prodId$);
    this.router.navigate(['/products', id]);
  }
  @Input() search = '';
  @Input() set productId(x: number) {
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
        map(({ id, subcategory, name }) => ({ id, subcategory, name })),
      )
    ) as Observable<Partial<Product>>),
    tap(x => this.prod = x)
  ).subscribe()



  constructor(private prd: ProductsService, private tss: TransferStateService, private router: Router) { }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
