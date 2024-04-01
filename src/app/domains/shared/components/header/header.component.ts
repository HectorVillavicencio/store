import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../../shared/models/product.model"
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { IStaticMethods } from 'preline/preline';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  categories = signal<Category[]>([]);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string


  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }

  ngOnInit(){
    this.getCategories();
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {
      }
    }) 
   }
  

}