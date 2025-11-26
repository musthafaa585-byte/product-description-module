import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  productInfo: any;

  constructor(private router: Router) {}
  ngOnInit() {
    this.productInfo = history.state.productinfo;
    if (this.productInfo) {     // if the user directly enters the signin page using url, productInfo will be null and this block will not run
      localStorage.setItem('productinfos', JSON.stringify(this.productInfo));
    }
  }
  

  signinform = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    Password: new FormControl('', [Validators.required]),
  });
  signinsubmit() {
    if (this.productInfo) {
      // ✅ forward productinfo to address page
      this.router.navigate(['/addresspage'], { state: { productinfo: this.productInfo } });
    } else {
      // if user came without product, just go normally
      this.router.navigate(['/addresspage']);
    }
  }
   
  gotoregistration()  {
       this.router.navigate(['/registration'])
  }

  get email() {
    return this.signinform.get('Email');
  }

  get password() {
    return this.signinform.get('Password');
  }
}
