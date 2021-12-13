import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products$ = this.http.get<Product[]>('http://localhost:8201/house').pipe(
    shareReplay({ refCount: false, bufferSize: 1 })
  );
  subCategories$ = this.products$.pipe(
    map(pl => Array.from(pl.reduce((s, pl) => s.add(pl.subcategory), new Set<string>())))
  )

  constructor(private http: HttpClient) { }

  getProduct(id: string) {
    return this.products$.pipe(
      map(pl => pl.find(row => row.id === +id))
    )
  }


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