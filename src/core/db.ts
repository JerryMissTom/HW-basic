
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

@Injectable()
export class DBService {

    myDataBase: SQLiteObject;

    constructor(
        private sqlite: SQLite
    ) { }


    //初始化或打开数据库，建立表
    initDB() {
        this.sqlite.create({
            name: 'basic.db',
            location: 'default'
        }).then((database: SQLiteObject) => {
            // 创建客户信息表
            let sqlStr = ' create table if not exists contact ' +
                '(' +
                'id INTEGER PRIMARY KEY autoincrement, ' +
                'name text, ' + // 姓名
                'phone text, ' + //号码
                'index text, ' + // 检索字母,即 a-z,#
                ')';

            database.executeSql(sqlStr, {}).then(() => {
                console.log('创建表成功');

            }).catch(() => {
                console.log('创建表失败');
            });

            this.myDataBase = database;
        }).catch(() => {
            console.log('打开数据库失败');
        });
    }
}
