  import { Component, OnInit } from '@angular/core';
  import { Router, ActivatedRoute } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import { ProductService } from '../service/product.service';
  import { OrderService } from '../order.service.ts/order.service';

  @Component({
    selector: 'app-success',
    standalone: true,
    templateUrl: './success.component.html',
    styleUrl: './success.component.css'
  })
  export class SuccessComponent implements OnInit {
    constructor(
      private productService: ProductService,
      private router: Router,
      private route: ActivatedRoute,
      private orderService: OrderService,
      private http: HttpClient
    ) {}

    ngOnInit() {
      const sessionId = this.route.snapshot.queryParamMap.get("session_id");
      if (!sessionId) return;
    
      this.http.get(`http://localhost:4242/checkout-session/${sessionId}`)
        .subscribe((session: any) => {
          const productId = session.metadata.productId; 
          console.log("🎯 productId from Stripe metadata:", productId);
    
          // 1️⃣ Try from cart first
          let product = this.productService
            .getCartItems()
            .find((p: any) => Number(p.id) === Number(productId));
    
          if (product) {
            this.saveOrder(product, productId);
          } else {
            // 2️⃣ If not found in cart → fetch from backend
            this.productService.getProductById(Number(productId)).subscribe((prod: any) => {
              if (prod) {
                this.saveOrder(prod, productId);
              }
            });
          }
        });
    }
    
    private saveOrder(product: any, productId: number) {
      const exists = this.orderService.getOrders()
        .some((o: any) => Number(o.id) === Number(product.id));
    
      if (!exists) {
        this.orderService.addOrder({
          ...product,
          total: product.price + 200,
          date: new Date()
        });
      }
    
      // remove only if it came from cart purchase
      this.productService.removeProductById(Number(productId));
    }
    
    
    goToOrders() {
      
      this.router.navigate(['/orders']);
    }
    goHome() {
      this.router.navigate(['/']);
    }
  }
    
