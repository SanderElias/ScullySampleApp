import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isScullyGenerated, isScullyRunning } from '@scullyio/ng-lib';
import { map, shareReplay, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productIds$ = this.http.get<Product['id'][]>('http://localhost:8201/house?field=id').pipe(
    shareReplay({ refCount: false, bufferSize: 1 })
  );
  products$ = this.http.get<Product[]>('http://localhost:8201/house').pipe(
    shareReplay({ refCount: false, bufferSize: 1 })
  );
  subCategories$ = this.http.get<Product[]>('http://localhost:8201/house?unique=subcategory')

  constructor(private http: HttpClient) {
    // if (!isScullyRunning()) {
    //   /** prefetch products so those are ready for the customer give app a buit of time to settle first */
    //   setTimeout(() => this.products$.pipe(take(1)).subscribe(), 50)
    // }
  }

  getIdsByFilter(filter: Partial<Product>, pageLength = 20) {
    return this.products$.pipe(
      map(pl => {
        const matchRow = createMatcher(filter)
        const found = [] as number[];
        for (const row of pl) {
          if (isProduct(row) && matchRow(row)) {
            found.push(row.id)
          }
          if (found.length === pageLength) {
            break;
          }
        }
        return found;
      }
      ))
  }

  getProduct(id: number|string) {
    return this.http.get<Product[]>(`http://localhost:8201/house/${id}`)
  }

  getBrands() {
    return this.products$.pipe(
      map(pl => Array.from(pl.reduce((s, pl) => s.add(pl.brand), new Set<string>())))
    )
  }

  getProductsByBrand(brand: string) {
    return this.products$.pipe(
      map(pl => pl.filter(row => row.brand === brand))
    )
  }
}

function createMatcher(filter: Partial<Product>) {
  return (row: Product) => {
    return Object.entries(filter).every(matcher);
    function matcher([key, value]: [string, unknown]) {
      const data = row[key as keyof Product];
      if (typeof data === 'string' && value) {
        return data.toLowerCase().includes((value as string).toLowerCase());
      }
      if (typeof data === 'number' || typeof data === 'boolean') {
        return data === value;
      }

      return true;
    }
  };
}

export function isProduct(p: any): p is Product {
  return p.id !== undefined;
}


export interface Product {
  category: string;
  subcategory: string;
  name: string;
  current_price: number;
  raw_price: number;
  currency: string;
  discount: number;
  likes_count: number;
  is_new: boolean;
  brand: string;
  brand_url: string;
  codCountry: string;
  variation_0_color: string;
  variation_1_color: string;
  variation_0_thumbnail: string;
  variation_0_image: string;
  variation_1_thumbnail: string;
  variation_1_image: string;
  image_url: string;
  url: string;
  id: number;
  model: string;
}