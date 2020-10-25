import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
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
      loading.dismiss(); // Disable loadingCtrl after 'click event' on Logout
    });
  }

}
