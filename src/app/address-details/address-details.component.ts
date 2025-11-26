
  import { NgIf } from '@angular/common';
  import { Component } from '@angular/core';
  import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { ProductService } from '../service/product.service';
  import { OrderService } from '../order.service.ts/order.service';
  declare const Stripe: any;
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-address-details',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './address-details.component.html',
    styleUrl: './address-details.component.css'
  })
  export class AddressDetailsComponent {
    myproduct: any;
    itemsAmount = 0;
    deliveryCharge = 200;
    totalAmount = 0;
    constructor(private router: Router, private http: HttpClient, private productService: ProductService, private orderService: OrderService) {}
    ngOnInit() {
      const stateProduct = history.state.productinfo ?? this.router.getCurrentNavigation()?.extras.state?.['productinfo'];
      if (stateProduct) {
        this.myproduct = stateProduct;
        localStorage.setItem('productinfos', JSON.stringify(stateProduct)); 
      } else {
      
         
          const saved = localStorage.getItem('productinfos');
          if (saved) {
            this.myproduct = JSON.parse(saved);
          }
        
      }

      console.log("✅ Product at Address Details:", this.myproduct);

      if (this.myproduct) {
        this.itemsAmount = this.myproduct.price;
        this.totalAmount = this.itemsAmount + this.deliveryCharge;
      }
    }
    contactform = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        pincode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{6}$/),
        ]),
      }),
    });
    
      
        // Try getting product from navigation
        
    
      
    onSubmit() {
      
      if (!this.myproduct) {
        alert("No product found for checkout!");
        return;
      }
      console.log("📦 Sending product to backend:", this.myproduct);
      const stripes = Stripe(
        'pk_test_51RsTnWRq6qRnN1aY2DCRhVqbiples4JnIp9Qpr12lumRdkl27mXEYvWrTPvB23DWN0IIZ6RNerrzKIJJYIMwzjkn00bKMxeFFu');
      
      console.log("Sending product to backend:", this.myproduct);
      
      this.http
        .post<{ id: string }>('http://localhost:4242/create-checkout-session', {
          product: this.myproduct
        })
      
        .subscribe({
          next: (data) => {
            console.log("Stripe session created:", data);
            stripes.redirectToCheckout({ sessionId: data.id }); //  This line redirects the user to a hosted Stripe checkout page like: https://checkout.stripe.com/pay/cs_test_a1b2c3d4...  // Here, you're calling Stripe.js and telling it: Take this user to the Stripe checkout page for the session with this ID.
          },
          error: (err) => {
            console.error('Error creating checkout session:', err);
            alert('Something went wrong during checkout');
          },
        });
    }

    get firstname() {
      return this.contactform.get('firstName');
    }

    get lastname() {
      return this.contactform.get('lastName');
    }
    get email() {
      return this.contactform.get('email');
    }
    get phone() {
      return this.contactform.get('phoneNumber');
    }

    get city() {
      return this.contactform.get('address')?.get('city');
    }

    get street() {
      return this.contactform.get('address')?.get('street');
    }

    get pincode() {
      return this.contactform.get('address')?.get('pincode');
    }
    checkoutimage(title: string) {
      switch (title) {
        case 'Dell-Laptop':
          return 'assets/laptop.jpg';
        case 'smart watch':
          return 'assets/smartwatch.jpg';
        case 'tablets':
          return 'assets/tablet.jpg';
        case 'scale':
          return 'assets/scale.jpg';
        case 'erasers':
          return 'assets/eraser.jpeg';
        case 'parker pens':
          return 'assets/parker.webp';
        case 'T-Shirt':
          return 'assets/T-shirt.jpg';
        case 'shirts':
          return 'assets/shirt.webp';
        case 'pants':
          return 'assets/pants.jpg';
        default:
          return '';
      }
    }
    gotoaddresspage() {
      this.router.navigate(['/addresspage'])
    }

  }
