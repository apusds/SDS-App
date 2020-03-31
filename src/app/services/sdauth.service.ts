import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserSettingsService } from './user-settings.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SDAuthService {

  constructor(
    private api: ApiService,
    private storage: Storage,
    private userSettings: UserSettingsService
  ) { }

  validateSession(): Promise<number> {
    let token: string;
    let email: string;

    this.userSettings.getToken().subscribe(r => token = r);
    this.userSettings.getEmail().subscribe(r => email = r);

    return this.api.post<{ status: number }>('/validate', {
      body: {
        token,
        email
      }
    }).pipe(
      map(data => data.status)
    ).toPromise();
  }

  adminAuthenticate(username: string, password: string) {
    return this.api.post<any>('/admin', {
      body: {
        username: username.trim(),
        password: password.trim()
      }
    });
  }
}
