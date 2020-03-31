import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UserSettingsService } from 'src/app/services/user-settings.service';
import { SDAuthService } from 'src/app/services/sdauth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private userSettings: UserSettingsService,
    private sds: SDAuthService
  ) {}

  navigateTo(page: string) {
    this.navCtrl.navigateForward(page);
  }

  doLogout() {
    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Logging you out :)',
      translucent: true
    }).then((loading) => {
      loading.present();
      this.sds.logoutFromAll().subscribe(
        {
          next: (data) => {
            if (data === 200) {
              this.userSettings.clearStorage();
              this.navCtrl.navigateRoot('/login', { replaceUrl: true });
            } else {
              this.toastCtrl.create({
                message: '',
                duration: 3000,
                position: 'top',
                color: 'danger'
              }).then((toast) => toast.present());
            }
          }
        }
      );
      loading.dismiss();
    });
  }

}
