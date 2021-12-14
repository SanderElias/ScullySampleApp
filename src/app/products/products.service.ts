import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';

// const server = 'http://[2001:41f0:198:0:3034:f593:acdc:acdc]:8201'
const server = 'http://localhost:8201'
const endpoint = 'house'
@Injectable({
  providedIn: 'root'
})
export class ProductsServerService {
  productIds$ = this.http.get<Product['id'][]>(`${server}/${endpoint}?field=id`).pipe(
    shareReplay({ refCount: false, bufferSize: 1 })
  );
  products$ = this.http.get<Product[]>(`${server}/${endpoint}`).pipe(
    shareReplay({ refCount: false, bufferSize: 1 })
  );
  subCategories$ = this.http.get<Product[]>(`${server}/${endpoint}?unique=subcategory`)

  constructor(private http: HttpClient) {

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

  getProduct(id: number | string) {
    return this.http.get<Product[]>(`${server}/${endpoint}/${id}`)
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
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loc = '/assets/house.json'
  products$ = this.http.get<Product[]>(`${this.loc}`).pipe(
    map(pl => pl.filter(isProduct)),
    shareReplay({ refCount: false, bufferSize: 1 })
  );
  productIds$ = this.products$.pipe(
    map(pl => pl.map(row => row.id)),
    shareReplay({ refCount: false, bufferSize: 1 })
  );
  subCategories$ = this.products$.pipe(
    map(pl => Array.from(pl.reduce((s, pl) => s.add(pl.subcategory), new Set<string>())))
  )

  constructor(private http: HttpClient) {

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

  getProduct(id: number | string) {
    return this.products$.pipe(map(pl => pl.find(row => row.id === +id)))
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
  return !isNaN(+p.id) ;
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