import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CartComponent } from './product/cart.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { YourOrdersComponent } from './your-orders/your-orders.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  {path: 'productss/:id', component: ProductDetailComponent  },
  {path: 'signin' , component: SignInComponent},
  {path: 'cart' , component: CartComponent},
  {path: 'addresspage', component: AddressDetailsComponent},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'orders', component: YourOrdersComponent},
  {path: 'success', component: SuccessComponent}

  
];
