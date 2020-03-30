import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { UserSettingsService } from './services/user-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private network: Network,
    private toastCtrl: ToastController,
    private userSettings: UserSettingsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.userSettings.getUserSettingsFromStorage();
      if (this.platform.is('cordova')) {
        if (this.network.type === 'none') {
          this.toastCtrl.create({
            message: 'You are offline. Please go online!',
            duration: 3000,
            position: 'top',
            color: 'danger',
          })
          .then((toast) => toast.present());
        }
      }
    });
  }
}
