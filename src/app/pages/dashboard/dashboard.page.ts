import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private navCtrl: NavController
  ) {}

  navigateTo(page: string) {
    this.navCtrl.navigateForward(page);
  }

}
