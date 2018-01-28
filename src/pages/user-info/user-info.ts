import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';
import { LoginComponent } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App) {
  }


  loginOut() {
    this.app.getRootNavs()[0].setRoot(LoginComponent);
  }
}
