import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';

@Injectable()
export class HttpService {

    private environmentUrl = '';

    constructor(
        private http: Http
    ) { }

    // post 方法
    public post(requestUrl, requestJson) {
        return this.httpRequestPost(requestUrl, requestJson)
            .map(response => response.json())
            .catch(this.handlerError)
    }
    
    // get 方法
    public get(param: string) {
        const header: any = new Headers({ 'Content-type': 'application/json' });
        const options: any = new RequestOptions({ headers: header });
        return this.http.get(this.environmentUrl + param, options)
            .timeout(10000).map(response => response.json()).catch(this.handlerError);
    }

    private httpRequestPost(requestUrl, requestJson) {
        const body: string = JSON.stringify(requestJson);
        const header: any = new Headers({ 'Content-type': 'application/json' });
        const options: any = new RequestOptions({ headers: header });
        return this.http.post(this.environmentUrl + requestUrl, body, options)
            .timeout(10000)
    }

    private handlerError(error: Response | any) {
        const body = error.json() || {};
        return Observable.throw(body);
    }
}