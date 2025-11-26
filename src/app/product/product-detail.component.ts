import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent
{
   productssss: any;
   cart:any[] =[];

  private route = inject(ActivatedRoute);
  

  constructor(private productService: ProductService, private router: Router)
  {
    
    const is = Number(this.route.snapshot.paramMap.get('id'));
    

    this.productService.getProductById(is).subscribe((data: any) => {
      this.productssss = data;
    });
    
  }
  
  getImageUrl(title: string) {
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
  //json-server --watch db.json --port 3000

  addToCART(product:any) {
    if (!product.id) {
      console.error("❌ Product has no id, cannot add to cart:", product);
      return;
    }
    this.cart.push({ ...product, id: Number(product.id) }); // force numeric id
  
    this.productService.addToCart(product);
    alert(`${product.title} added to cart`);
    this.router.navigate(['/cart'])
  }

  gotosignin() {
    this.router.navigate(['/signin'], {state : {productinfo : this.productssss}});
  }
}