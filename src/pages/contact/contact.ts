import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController, Events, Content, ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Keyboard } from '@ionic-native/keyboard';
import { Util } from '../../core/utils';
import { DBService } from '../../core/db';
import { contacts, mockContacts } from './mock-data';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild(Content) content: Content;
  private version: string;
  private searchWord: string;
  private textEmitter: Subject<string> = new Subject();
  private eventBus: Observable<any>;
  private observer: Observer<any>;
  private hideSubscription: Subscription;
  private showSubscription: Subscription;
  private loading: any;
  private contacts;
  private letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];


  constructor(
    private keyboard: Keyboard,
    private event: Events,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private elementRef: ElementRef,
    private util: Util,
    private db: DBService,
    private toastCtrl: ToastController
  ) {
    this.version = this.util.getNavigator();
    this.searchWord = '';
    this.loading = null;
    // 真机上调试时将其注释掉
    this.contacts = contacts;
    // 真机上调试，把下面的注释去掉
    // this.initData();
    // this.getDataFromDB();
    this.eventBus = new Observable(observer =>
      this.observer = observer).debounceTime(500);
    this.eventBus.subscribe(text => {
      if (text) {
        this.getDataFromDB(text);
      }
    });
  }

  private initData() {
    let sqls = [];
    for (let item of mockContacts) {
      let childItem = [];
      let firstStr = 'replace into contact' +
        '(name,' +
        'phone,' +
        'index) ' +
        'values (?,?,?)';
      childItem.push(firstStr);
      let second = [
        item.name, item.phone, item.index,
      ];
      childItem.push(second);
      sqls.push(childItem);
    }

    return this.db.myDataBase.sqlBatch(sqls).then(() => {
      console.log('批量插入成功');
    }).catch(() => {
      console.log('批量插入失败');
    });
  }

  ionViewDidEnter() {
    // 注册监听输入法的打开和关闭，然后发射此事件，在Tab.st中执行Tab的打开和关闭
    this.hideSubscription = this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    this.showSubscription = this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));
  }

  private scrollTo(letter) {

    this.toastCtrl.create({
      message: letter,
      duration: 1000,
      position: 'middle'
    }).present();

    if (letter === '#') {
      letter = '\\#';
    }
    //获取第一个标签的位置
    let topLocation = 0;
    for (let item in this.letters) {
      let itemDom = this.elementRef.nativeElement.querySelector('div#' + this.letters[item]);
      if (itemDom) {
        topLocation = itemDom.getBoundingClientRect().top;
        break;
      }
    }

    let ele = this.elementRef.nativeElement.querySelector('div#' + letter);
    if (ele) {
      let s = this.elementRef.nativeElement.querySelector('div#' + letter).getBoundingClientRect();
      this.content.scrollTo(0, s.top - topLocation, 300); // 这个是重点，Y轴移动相对第一个标签的位置
    }
  }

  private getDataFromDB(text?: string) {

    if (text) {
      let sql = "select * from contact where name like '%" + text + "%'" + " or phone like '%" + text + "%'" + " order by index";
      console.log(sql);
      this.db.myDataBase.executeSql(sql, {}).then(data => {
        console.log('获取数据成功');
        this.contacts = this.setContracts(data);
      }).catch(erroe => {
        console.log('获取数据失败');
      });
    } else {
      let sql = "select * from contact order by index";
      console.log(sql);
      this.db.myDataBase.executeSql(sql, {}).then(data => {
        console.log('获取数据成功');
        this.contacts = this.setContracts(data);
      }).catch(erroe => {
        console.log('获取数据失败');
      });
    }
  }

  private onInput(event) {
    this.observer.next(event.target.value.trim());
  }

  private onClear(event) {
    this.keyboard.close();
    this.searchWord = '';
    this.presentLoading();
    this.getDataFromDB();
    this.dismissLoading();
  }

  private setContracts(data) {

    const length = data.rows.length;
    let showList = [];  // 最后的数组
    let specialList = []; // 属于#的客户
    let rows = data.rows;

    for (let i = 0; i < length; i++) {

      //把属于特殊字符的先提取出来
      if (rows.item(i).index.trim() === '#') {
        let specialItem = {
          name: rows.item(i).name,
          phone: rows.item(i).phone,
          type: 1, //1 表示是数据
          firstLetter: rows.item(i).name.charAt(0),
          index: rows.item(i).index
        }
        specialList.push(specialItem);
        continue;
      }

      // 前后两个数据的Index不同时，在中间插上索引
      if (i === 0 || rows.item(i).index.trim() !== rows.item(i - 1).index.trim()) {
        let item = {
          type: 0, //0 表示是索引
          index: rows.item(i).index.toUpperCase()
        }
        showList.push(item);
      }

      let dataItem = {
        name: rows.item(i).name,
        phone: rows.item(i).phone,
        type: 1, //1 表示是数据
        firstLetter: rows.item(i).name.charAt(0),
        index: rows.item(i).index
      }
      showList.push(dataItem);
    }

    //把属于#的加上索引，并放置在数组最后
    if (specialList.length > 0) {
      let item = {
        type: 0, //0 表示是索引
        index: '#'
      }
      showList.push(item);
      return showList.concat(specialList);
    } else {
      return showList;
    }
  }

  private presentLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: '请稍候'
      });
      this.loading.present();
    }
  }

  private dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  ionViewWillLeave() {
    // 接触监听事件
    this.keyboard.close();
    if (this.hideSubscription) {
      this.hideSubscription.unsubscribe();
      this.hideSubscription = null;
    }
    if (this.showSubscription) {
      this.showSubscription.unsubscribe();
      this.showSubscription = null;
    }
    this.dismissLoading();
  }

}
