import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { ProductService } from '../service/product.service';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls:['./cart.component.css']
    
})  
export class CartComponent {
  public cartItem: any[] = [];
  selectAll = false;
  selectedCount = 0;
  constructor(private productService: ProductService, private router: Router) 
  {
    this.cartItem = productService.getCartItems();
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.loadCart(); // ✅ refresh cart whenever user navigates
    });
    
  }

  toggleAll() {
    this.cartItem.forEach(item => item.selected = this.selectAll);
    this.updateSelectionCount();
  }
  updateSelectionCount() {
    this.selectedCount = this.cartItem.filter(i => i.selected).length;
  }
  
  getImageUrls(title: string) {
    switch(title) {
        case 'Dell-Laptop': return 'assets/laptop.jpg';
        case 'smart watch': return 'assets/smartwatch.jpg';
        case 'tablets' : return 'assets/tablet.jpg';
        case 'scale' : return 'assets/scale.jpg';
        case 'erasers' : return 'assets/eraser.jpeg';
        case 'parker pens' : return 'assets/parker.webp';
        case 'T-Shirt' : return 'assets/T-shirt.jpg';
        case 'shirts' : return 'assets/shirt.webp';
        case 'pants' : return 'assets/pants.jpg';
        default: return '';
    }
  }
  removeFromCart(index: number) {
    this.productService.removeFromCart(index);
    this.loadCart();
  }
  goToProductdetail(id: number) 
  {
    const product = this.cartItem.find(item => item.id === id);
    this.router.navigate(['/productss', id]);
  }
  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.cartItem = this.productService.getCartItems();
    this.updateSelectionCount();
  }
  checkoutProduct(product: any) {
    this.router.navigate(['/signin'], { state: { productinfo: product } });
  }


}