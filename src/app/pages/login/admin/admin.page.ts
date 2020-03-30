import { Component } from '@angular/core';
import { SDAuthService } from 'src/app/services/sdauth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  username = '';
  password = '';
  isAuthenticating = false;

  constructor(
    private sds: SDAuthService
  ) { }

  onLogin() {
    this.isAuthenticating = true;
    this.sds.adminAuthenticate(this.username, this.password)
      .subscribe(
        {
          next: (data: { status: number, message?: string, token?: string }) => {
            if (data.status !== 200) {
              console.log(data);
            } else {
              console.log(data);
            }
          },
          error: (err) => {
            console.log('ee', err);
          },
          complete: () => {
            this.isAuthenticating = false;
          }
        }
      );
  }

}
