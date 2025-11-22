import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  
  showPassword = false;
  showconfirmPassword = false;
  
  
  contactForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),

      lastName: new FormControl('', [Validators.required]),

      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmpassword')?.value;
     
  // If confirm password is empty, don't return mismatch error yet
    if (!confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatches: true };
  }

  get firstname() {
    return this.contactForm.get('firstName');
  }

  get lastname() {
    return this.contactForm.get('lastName');
  }
  get Email() {
    return this.contactForm.get('email');
  }

  get Password() {
    return this.contactForm.get('password');
  }
  get Cpassword() {
    return this.contactForm.get('confirmpassword');
  }

  get countries() {
    return this.contactForm.get('country');
  }
  
  constructor(private router: Router) {}  
  Gotosignin() {
    this.router.navigate(['/signin']);
    alert('your registration was successfull');
  }
  togglePassword() {    
    this.showPassword = !this.showPassword;
  }
  togglesPassword() {
    this.showconfirmPassword = !this.showconfirmPassword;
  }
 
}
