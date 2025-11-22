import { Component, computed, signal } from '@angular/core'; // component and signal
import { CommonModule } from '@angular/common'; // for *ngFor
import { RouterModule, Router } from '@angular/router'; // for routerLink
import { ProductService } from '../service/product.service'; // service to get product data
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  selectedCategory = signal('All');
  selectedSort = signal('name1');

  constructor(private router: Router) {}

  goToProductDetail(ID: number) {
    this.router.navigate(['/productss', ID]);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
