import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async resetPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.presentToast('Password reset email sent!', 'success');
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      this.presentToast('Error sending password reset email.', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }
}
