import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private router: Router,
    private userSettings: UserSettingsService
  ) {}

  ngOnInit() {
    this.userSettings.getRole().subscribe((role: string) => {
      if (role === 'admin') {
        this.router.navigate(['tabs', 'dashboard', 'admin'], { replaceUrl: true });
      } else {
        this.router.navigate(['tabs', 'dashboard', 'member'], { replaceUrl: true });
      }
    });
  }

  ionViewWillEnter() {
    this.userSettings.getTheme().subscribe((val) => {
      document.body.classList.toggle('dark', val === 'dark' ? true : false);
    });
  }

}
