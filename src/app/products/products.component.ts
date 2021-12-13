import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Product, ProductsService } from './products.service';

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
      <table *ngIf="vm.products.length else notFound">
        <tr *ngFor="let prod of vm.products">
          <td>{{prod.subcategory}}</td>
          <td [highlight]="vm.search">{{prod.name}}</td>
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
export class ProductsComponent implements OnInit {
  subcatSelected$ = new BehaviorSubject<string>('');
  searchFor$ = new BehaviorSubject<string>('');
  subCategories$ = this.prods.subCategories$;


  vm$ = combineLatest({
    selected: this.subcatSelected$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ),
    subCats: this.subCategories$,
    search: this.searchFor$.pipe(
      map(r => r.toLowerCase()),
      debounceTime(200),
      distinctUntilChanged()
    ),
    prodCount: this.prods.products$.pipe(map(r => r.length)),
    catCount: this.subCategories$.pipe(map(l => l.length)),
    products: this.prods.products$
  }).pipe(
    map(({ products, search, selected, ...rest }) => {
      if (search || selected) {
        const found = [] as Product[];
        let count = 0
        while (found.length < 20 && count < products.length) {
          const prod = products[count]
          try {
            if (prod &&
              (selected === '' || prod.subcategory === selected) &&
              (search === '' || prod.name?.toLowerCase()?.includes(search))
            ) {
              found.push(prod)
            }
          } catch {
            // if somehow the product is malformed, we want to ignore it.
          }
          count += 1;
        }
        products = found
      }


      return { products: products.slice(0, 20), search, ...rest }
    })
  )

  constructor(private prods: ProductsService) { }

  ngOnInit(): void {
  }

  updateSelected(ev: Event) {
    const target = ev.target as HTMLInputElement
    this.subcatSelected$.next(target.value)
  }
  updateSearch(ev: Event) {
    const target = ev.target as HTMLInputElement
    this.searchFor$.next(target.value)
  }

}
