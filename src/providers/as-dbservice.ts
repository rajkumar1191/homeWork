import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const DB_NAME: string = 'schoolDb';
const DB_LOCATION: string = 'default';


@Injectable()
export class AsDbservice {

    public schoolDb: any;
    data: any;
    dateTime: any;
    collectPresetName: any;
    collectPresetByName: any;


    constructor(public http: Http, public platform: Platform) {
        this.platform = platform;
        this.schoolDb = new SQLite();
        this.schoolDb.openDatabase({
            name: DB_NAME,
            location: DB_LOCATION
        }).then(() => { //console.log("opened");
        }, (error) => {

        });
    }

    public initializeDataService() {
        this.platform.ready().then(() => {
            this.schoolDb.openDatabase({ name: "schoolDb", location: "default" }).then(() => {
                this.schoolDb.executeSql('CREATE TABLE IF NOT EXISTS homework (effectiveDate VARCHAR, subject VARCHAR, staff VARCHAR, class VARCHAR, descrip VARCHAR, updatedOn INTEGER)', {}).then((data) => {
                    // this.deleteHomework();
                    this.getHomework();
                }, (error) => {
                });
            }, (error) => {

            });
        });
    }

    getHomeworkID() {
        return new Promise((resolve, reject) => {
            this.schoolDb.openDatabase({ name: "schoolDb", location: "default" }).then(() => {
                this.schoolDb.executeSql("SELECT rowid,* FROM homework ORDER BY updatedOn DESC ", []).then((data) => {
                    let messageID = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageID.push(data.rows.item(i).effectiveDate);
                        }
                    }
                    resolve(messageID);
                }, (error) => {
                    reject(error);
                });
            }, (error) => {

            });
        });
    }

    getHomework() {
        return new Promise((resolve, reject) => {
            this.schoolDb.openDatabase({ name: "schoolDb", location: "default" }).then(() => {
                this.schoolDb.executeSql("SELECT rowid,* FROM homework ORDER BY updatedOn DESC LIMIT 10", []).then((data) => {
                    let messageDetails = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            //console.log(date);
                            messageDetails.push({ effectiveDate: data.rows.item(i).effectiveDate, subject: data.rows.item(i).subject, staff: data.rows.item(i).staff, class: data.rows.item(i).class, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                    resolve(messageDetails);
                }, (error) => {
                    reject(error);
                });
            }, (error) => {

            });
        });
    }

    addHomework(data) {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => {
            this.schoolDb.executeSql("INSERT INTO homework (effectiveDate, subject, staff, class, descrip, updatedOn) VALUES ('" + data.dateSelect + "','" + data.className + "','" + data.staffName + "','" + data.subjectName + "','" + data.descrip + "','" + this.dateTime + "')", []).then((data) => {
                let messageDetails = [];
                this.schoolDb.executeSql("SELECT rowid,* FROM homework ORDER BY updatedOn DESC LIMIT 10", []).then((data) => {
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ effectiveDate: data.rows.item(i).effectiveDate, subject: data.rows.item(i).subject, staff: data.rows.item(i).staff, class: data.rows.item(i).class, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                });
                resolve(messageDetails);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateHomework(data) {
        return new Promise((resolve, reject) => {
            this.schoolDb.openDatabase({ name: "schoolDb", location: "default" }).then(() => {
                this.schoolDb.executeSql("UPDATE homework SET status = 'READ'  where rowid = '" + data + "'", []).then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            }, (error) => {

            });
        });

    }

    deleteHomework() {
        this.schoolDb.openDatabase({ name: "schoolDb", location: "default" }).then(() => {
            this.schoolDb.executeSql("DELETE FROM homework", {}).then((data) => {
            }, (error) => {
            });
        }, (error) => {
        });
    }
}
