import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private navCtrl: NavController
  ) { }

  navigateTo(page: string) {
    this.navCtrl.navigateForward('/login/' + page);
  }
}
