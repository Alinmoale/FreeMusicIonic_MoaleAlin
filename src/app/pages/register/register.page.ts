import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.toastService.presentToast('Please fill out the form correctly');
      return;
    }

    if (this.password?.value !== this.confirmPassword?.value) {
      this.toastService.presentToast('Passwords do not match');
      return;
    }

    try {
      await this.authService.register(this.email?.value, this.password?.value);
      this.toastService.presentToast(
        'Registration successful. Please check your email for verification.'
      );
      this.router.navigateByUrl('/login'); // Redirect to login page after registration
    } catch (err) {
      this.toastService.presentToast('Registration failed: ' + err);
      console.log(err);
    }
  }
}
