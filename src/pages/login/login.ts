import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {


  constructor(private navCtrl: NavController) {

  }

  toHome() {
    console.log('11');
    
    this.navCtrl.setRoot(TabsPage);
  }
}
