import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/home'); // Redirect to home page
    } catch (err) {
      if (err === 'Email not verified') {
        this.toastService.presentToast(
          'Please verify your email before logging in.'
        );
      } else {
        this.toastService.presentToast('Invalid login credentials');
      }
      console.log(err);
    }
  }
}
