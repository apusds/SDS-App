import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  darkTheme = false;

  constructor(
    private userSettings: UserSettingsService
  ) { }

  ngOnInit() {
    this.userSettings.getTheme().subscribe((val) => {
      this.darkTheme = val === 'dark' ? true : false;
    });
  }

  changeTheme() {
    this.userSettings.setTheme(this.darkTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark', this.darkTheme);
  }

}
