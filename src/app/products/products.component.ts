import { Component, OnInit } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, merge, Observable, ReplaySubject, startWith, switchMap, take } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  template: `
    <ng-container *ngIf="vm$| async as vm">
      <p>
        Products available: {{vm.prodCount}}
        divided in {{vm.catCount}} subcategories
      </p>
      <div>
        <label>Catergory</label>
        <input list="subcats" (change)="updateSelected($event)">
        <label>search</label>
        <input type="text" (input)="updateSearch($event)">
      </div>
      <datalist id='subcats'>
        <option *ngFor="let cat of vm.subCats">{{cat}}</option>
      </datalist>
      <table *ngIf="vm.products.length else notFound" >
        <tr *ngFor="let prod of vm.products" [productId]="prod" [search]="vm.search">
        </tr>
      </table>
      <ng-template #notFound>
        <P>Sorry, no products match your search</P>
      </ng-template>
    </ng-container>
  `,
  styles: [`
  div {
    display:grid;
    grid-template-columns: 5rem 25rem 3rem 25rem;
    gap: 1rem;  
    height: 4rem;  
    align-items: center;
  }

  `]
})
export class ProductsComponent {
  subcatSelected$ = new BehaviorSubject('');
  searchFor$ = new ReplaySubject<string>(1);
  subCategories$ = this.tss.useScullyTransferState('subcat', this.prods.subCategories$);
  deb = <T>(obs: Observable<T>, name?: string) => obs.pipe(
    debounceTime(200),
    distinctUntilChanged(),
  )
  debStart = <T>(obs: Observable<T>, name?: string) => obs.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    startWith('')
  )

  products$ = merge(
    /** get the first 20 without waiting for user input */
    this.tss.useScullyTransferState('prodIds', this.prods.productIds$.pipe(take(1))),
    combineLatest({
      name: this.deb(this.searchFor$),
      subcategory: this.deb(this.subcatSelected$),
    }).pipe(
      switchMap(filter => this.prods.getIdsByFilter(filter)),
    )
  );

  vm$ = combineLatest({
    search: this.debStart(this.searchFor$),
    subCats: this.subCategories$,
    prodCount: this.products$.pipe(map(r => r.length), take(1)),
    catCount: this.subCategories$.pipe(map(l => l.length), take(1)),
    products: this.products$.pipe(map(rows => rows.slice(0, 20)))
  })

  constructor(private prods: ProductsService, private tss: TransferStateService) { }


  updateSelected(ev: Event) {
    const target = ev.target as HTMLInputElement
    this.subcatSelected$.next(target.value)
  }
  updateSearch(ev: Event) {
    const target = ev.target as HTMLInputElement
    this.searchFor$.next(target.value)
  }

}
