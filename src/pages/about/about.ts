import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private version;
  constructor(
    public navCtrl: NavController,
    private appVersion: AppVersion
  ) {
    this.version = '';
  }

  ionViewDidLoad() {
    this.appVersion.getVersionNumber().then(num => {
      this.version = this.version + num;
    });
  }

  private toUserPage() {
    this.navCtrl.push('UserInfoPage');
  }

}
