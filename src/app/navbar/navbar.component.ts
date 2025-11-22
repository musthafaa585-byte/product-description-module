import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartCount = 0;
  showSuggestions = false;
  ourproducts = signal<any[]>([]);   // to hold the products list in a signal
  searchText = signal('');
  cartItem: any[] = [];
  
  products = computed(() => {
     
    let list = this.ourproducts();

    console.log("🧪 Original products:", list);

   
   
   // Filter by search text
   const search = this.searchText().toLowerCase();

   
   if (search) {
     list = list.filter(p => p.title.toLowerCase().includes(search));
     
   }

   return list;
 });

 filteredSuggestions = computed(() => {
   const search = this.searchText().toLowerCase();
   if (!search) return [];
   return this.ourproducts().filter(p => p.title.toLowerCase().includes(search));
 
 });

 
  ngOnInit() {
    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  constructor(private productService: ProductService, private router: Router ) {
    productService.getProducts().subscribe(data => {
      console.log("🛠 Products fetched:", data);
      this.ourproducts.set(data); 
     });
  }
  
  goToCart() {
    window.location.href = '/cart';
  }
  gotoorder() {
    this.router.navigate(['/orders']);
  }
  goHome() {
    this.router.navigate(['/']);
  }
  
  
}  
