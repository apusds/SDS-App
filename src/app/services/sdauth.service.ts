import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { refCount, publishLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SDAuthService {

  constructor(
    private api: ApiService
  ) { }

  isAuthenticated(): boolean {
    return false;
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
