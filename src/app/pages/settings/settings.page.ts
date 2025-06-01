import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  displayName: string | null = 'user';
  newUsername: string = '';

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.setWelcomeMessage();
  }

  async setWelcomeMessage() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.displayName = user.displayName ? user.displayName : 'user';
    }
  }

  async updateUsername() {
    const user = await this.afAuth.currentUser;
    if (user && this.newUsername.trim() !== '') {
      await user.updateProfile({ displayName: this.newUsername });
      this.displayName = this.newUsername;
      this.toastService.presentToast('Username updated successfully');
    } else {
      this.toastService.presentToast('Please enter a valid username');
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
