import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SDAuthService } from '../services/sdauth.service';
import { ToastController } from '@ionic/angular';
import { UserSettingsService } from '../services/user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private sds: SDAuthService,
    private toastCtrl: ToastController,
    private router: Router,
    private userSettings: UserSettingsService
  ) {}

  // tslint:disable-next-line: max-line-length
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UrlTree | boolean> {
    if (await this.sds.validateSession() !== 200) {
      this.userSettings.clearStorage();
      this.toastCtrl.create({
        message: 'Oops! Please login to gain access!',
        position: 'top',
        color: 'danger',
        duration: 3000,
      }).then((toast) => toast.present());

      return route.url.toString() === 'tabs' || route.url.toString() === 'logout'
      ? this.router.createUrlTree(['/login'])
      : this.router.createUrlTree(['/login'], { queryParams: { redirect: state.url }});
    }

    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UrlTree | boolean> {
    return this.canActivate(route, state);
  }
}
