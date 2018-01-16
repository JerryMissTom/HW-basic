import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';

@Injectable()
export class Util {

    constructor(private platform: Platform) {
    }

    // 获取平台类型
    getNavigator(): string {

        if (this.platform.is('android')) {
            return 'android';
        }

        if (this.platform.is('ios')) {
            return 'ios';
        }

        return 'android';
    }

}