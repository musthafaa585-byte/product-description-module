import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private storageKey = 'myOrders';

  getOrders() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addOrder(order: any) {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  removeOrder(index: number) {
    const orders = this.getOrders();
    orders.splice(index, 1); // ✅ remove only one order by index
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }
}
