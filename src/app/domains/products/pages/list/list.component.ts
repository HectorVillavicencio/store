import { Component, Input, SimpleChange, SimpleChanges, inject, input, signal } from '@angular/core';

import {ProductComponent} from '@products/components/product/product.component'

import { Product } from '@shared/models/product.model';
import {HeaderComponent} from "@shared/components/header/header.component"
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { subscribe } from 'diagnostics_channel';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private ProductService = inject(ProductService);
  
  @Input() category_id?: string


  ngOnInit(){
    this.getProducts();
  
  }

  ngOnChanges(changes: SimpleChanges){
    const category_id = changes['category_id'];
    if (category_id){
      this.getProducts();
    }
  }

 addToCart(product: Product) {
  this.cartService.addToCart(product);
 }

 private getProducts(){
  this.ProductService.getproduct(this.category_id)
  .subscribe({
    next: (products) => {
      this.products.set(products);
    },
    error: () => {
    }
  }) 
 }

}
