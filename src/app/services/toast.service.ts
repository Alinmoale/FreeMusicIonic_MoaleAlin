import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    toast.present();
  }

  async presentToastWithOptions(
    header: string,
    message: string,
    duration: number = 2000
  ) {
    const toast = await this.toastController.create({
      header,
      message,
      duration,
      position: 'bottom',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}
