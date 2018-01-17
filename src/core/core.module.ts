import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DBService } from './db';
import { Util } from './utils';
import { ErrorService } from './error';
import { HttpService } from './http';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        DBService,
        Util,
        ErrorService,
        HttpService
    ]
})

export class CoreModule { }