import { Component, Input, OnInit } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { ReplaySubject, switchMap } from 'rxjs';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'related-prods',
  template: `
  <h2>Related Products</h2>
  <main>
    <a *ngFor="let p of products$|async" [routerLink]="['/products',p.id]">
      <img [src]="p.thumb" alt="">
</a>
  </main>

  `,
  styles: [`
  :host {
    display: grid;    
    grid-template-rows: 4rem 1fr;
    background-color: #ffffff05;
    overflow-y: scroll;
  }
  img {
      width: 32px;
      height: 32px;
      margin: .25rem;
    }

  `]
})
export class RelatedComponent implements OnInit {
  cat = new ReplaySubject<string>(1)
  @Input() set subcategory(x: string) {
    this.cat.next(x)
  }
  products$ = this.tss.useScullyTransferState ('related', this.cat.pipe(
    switchMap(x => this.prod.getProductsBySubcategory(x))
  ))


  constructor(private prod: ProductsService, private tss:TransferStateService) { }

  ngOnInit(): void {
  }

}
