import { Injectable } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';

@Injectable()
export class ErrorService {

    constructor(
        private toastCtrl: ToastController
    ) {
    }

    public handleError(errorCode) {
        let errorMessage = this.getErrorMessage(errorCode);
        this.toastCtrl.create({
            message: errorMessage,
            duration: 1300,
            position: 'bottom'
        }).present();
    }

    private getErrorMessage(errorCode: number): string {

        let errorMessage: string;
        switch (errorCode) {
            case 500:
                errorMessage = '服务器开小差了';
                break;
            case 404:
                errorMessage = '未找到该资源';
                break;
            default:
                errorMessage = '服务器错误';

        }
        return errorMessage;
    }

}