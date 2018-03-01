import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EchartsPage } from './echarts';

@NgModule({
  declarations: [
    EchartsPage,
  ],
  imports: [
    IonicPageModule.forChild(EchartsPage),
  ],
})
export class EchartsPageModule {}
