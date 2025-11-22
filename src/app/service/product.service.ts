import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  private cartKey = 'myCart';   // ✅ unique key for localStorage
  private cart: any[] = [];     // ✅ single source of truth

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    // Load cart from localStorage when service starts
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartCount.next(this.cart.length);
    }
  }

  addToCart(product: any) {
    this.cart.push(product);
    this.saveCart(); // ✅ save every time
  }

  getCartItems() {
    return this.cart;
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
    this.cartCount.next(this.cart.length);
  }

  removeProductById(id: number) {
    console.log("🗑 Removing product with id:", id);
  console.log("🛒 Current cart before remove:", this.cart); 
  const index = this.cart.findIndex(item => Number(item.id) === Number(id));
    if (index > -1) {
      this.cart.splice(index, 1);
      this.saveCart();
      console.log("✅ Removed. New cart:", this.cart);
    } 

  } 

  getProducts() {
    return this.http.get<any[]>('http://localhost:3000/productdetail');
  }

  getProductById(id: number) {
    return this.http.get<any>(`http://localhost:3000/productdetail/${id}`);
    
  }

}
