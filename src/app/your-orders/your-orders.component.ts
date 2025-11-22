import { Component } from '@angular/core';
import { OrderService
  
 } from '../order.service.ts/order.service';
 import { OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-your-orders',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './your-orders.component.html',
  styleUrl: './your-orders.component.css'
})
export class YourOrdersComponent implements OnInit  {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}


  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

  cancelOrder(index: number) {
    if (confirm("Are you sure you want to cancel this order?")) {
      this.orderService.removeOrder(index); // ✅ delegate removal to service
      this.orders = this.orderService.getOrders(); // refresh UI after update
    }
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
}
