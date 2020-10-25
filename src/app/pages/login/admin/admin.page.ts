import { Component } from '@angular/core';
import { SDAuthService } from 'src/app/services/sdauth.service';
import { UserSettingsService } from 'src/app/services/user-settings.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  username = '';
  password = '';
  isAuthenticating = false;
  isValidCred = true;
  isLoggedIn = false;

  constructor(
    private sds: SDAuthService,
    private toastCtrl: ToastController,
    private router: Router,
    private userSettings: UserSettingsService
  ) { }

  onLogin() {
    this.isAuthenticating = true;
    this.sds.adminAuthenticate(this.username, this.password)
      .subscribe(
        {
          next: (data: { status: number, role: string, message?: string, token?: string, email?: string }) => {
            if (data.status !== 200) {
              this.isAuthenticating = false;
              this.isValidCred = false;
            } else {
              this.isValidCred = true;
              this.isLoggedIn = true;
              this.isAuthenticating = false;

              this.userSettings.setToken(data.token);
              this.userSettings.setEmail(data.email);
              this.userSettings.setRole(data.role);

              this.router.navigate(['tabs'], { replaceUrl: true });
            }
          },
          error: (err) => {
            console.log(err);
            this.isAuthenticating = false;
            this.toastCtrl.create({
              message: 'It looks like the API Failed to respond in time!',
              duration: 3000,
              position: 'top',
              color: 'danger'
            })
            .then((toast) => toast.present());
          },
          complete: () => {
            this.isAuthenticating = false;
          }
        }
      );
  }

}
