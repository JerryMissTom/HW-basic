import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import echarts from 'echarts';
@IonicPage()
@Component({
  selector: 'page-echarts',
  templateUrl: 'echarts.html',
})
export class EchartsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let myChart = echarts.init(document.getElementById('main'));
    let option = {
      title: {
        text: 'ECharts示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    myChart.setOption(option);
  }

}
