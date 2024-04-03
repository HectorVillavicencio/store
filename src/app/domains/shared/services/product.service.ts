import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { set } from 'date-fns';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient)

  constructor() { }

  getproduct(category_id?: string){
    const url = new URL('https://api.escuelajs.co/api/v1/products')
    if(category_id){
      url.searchParams.set('categoryId', category_id)
    }
    return this.http.get<Product[]>(url.toString()).pipe(
      //return this.http.get<Product[]>(url.toString());
      map(products => products.filter(product => product.images.length > 2))
    );
  }

  getOne(id: string){
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);

  }
}