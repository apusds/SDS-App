import { Component } from '@angular/core';
import { SDAuthService } from 'src/app/services/sdauth.service';
import { catchError } from 'rxjs/operators';
import { UserSettingsService } from 'src/app/services/user-settings.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  username = '';
  password = '';
  isAuthenticating = false;
  isValidCred: true | false = true;
  isLoggedIn: true | false = false;

  constructor(
    private sds: SDAuthService,
    private toastCtrl: ToastController,
    private userSettings: UserSettingsService
  ) { }

  onLogin() {
    this.isAuthenticating = true;
    this.sds.adminAuthenticate(this.username, this.password)
      .subscribe(
        {
          next: (data: { status: number, role: string, message?: string, token?: string, email?: string }) => {
            if (data.status !== 200) {
              this.isValidCred = false;
            } else {
              console.log(data);
              this.isValidCred = true;
              this.isLoggedIn = true;
              this.userSettings.setToken(data.token);
              this.userSettings.setEmail(data.email);
              this.userSettings.setRole(data.role);
            }
          },
          error: (err) => {
            console.log(err);
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
