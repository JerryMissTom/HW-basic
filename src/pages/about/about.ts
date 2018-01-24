import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private version;
  constructor(
    public navCtrl: NavController,
  ) {
    // this.app.getVersionNumber().then(num => {
    //   this.version = this.version + num;
    // });
  }

  private toUserPage() {
    this.navCtrl.push('UserInfoPage');
  }

}
