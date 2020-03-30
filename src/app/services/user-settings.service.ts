import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private token: BehaviorSubject<string>;

  constructor(
    private storage: Storage
  ) {
    this.token = new BehaviorSubject('');
  }

  clearStorage() {
    return this.storage.clear();
  }

  getUserSettingsFromStorage() {
    this.storage.get('token').then(value => {
        value
          ? this.setToken(value)
          : this.setToken('');
    });
  }

  getToken() {
    return this.token.asObservable();
  }

  setToken(val: string) {
    this.storage.set('token', val);
    this.token.next(val);
  }
}
