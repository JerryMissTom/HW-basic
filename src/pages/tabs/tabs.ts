import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Events, Tabs } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;
  mb: any;

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = AboutPage;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer,
    private keyboard: Keyboard,
    private event: Events) {
  }

  ionViewDidLoad() {
    let tabs = this.queryElement(this.elementRef.nativeElement, '.tabbar');
    this.event.subscribe('hideTabs', () => {
      console.log('hideTabs');
      this.renderer.setElementStyle(tabs, 'display', 'none');
      let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
      let content = this.queryElement(SelectTab, '.scroll-content');
      this.mb = content.style['margin-bottom'];
      this.renderer.setElementStyle(content, 'margin-bottom', '0')
    });

    this.event.subscribe('showTabs', () => {
      console.log('showTabs');
      this.renderer.setElementStyle(tabs, 'display', '');
      let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
      let content = this.queryElement(SelectTab, '.scroll-content');
      this.renderer.setElementStyle(content, 'margin-bottom', this.mb)
    });
  }

  queryElement(elem: HTMLElement, q: string): HTMLElement {
    return <HTMLElement>elem.querySelector(q);
  }

  ionViewWillUnload() {
    this.event.unsubscribe('hideTabs');
    this.event.unsubscribe('showTabs');
  }
}
