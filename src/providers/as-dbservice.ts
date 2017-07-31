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
                this.schoolDb.executeSql('CREATE TABLE IF NOT EXISTS homeworkTbl (startDate VARCHAR, subject VARCHAR, endDate VARCHAR, class VARCHAR, descrip VARCHAR, updatedOn INTEGER)', {}).then((data) => {
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
                this.schoolDb.executeSql("SELECT rowid,* FROM homeworkTbl ORDER BY updatedOn DESC ", []).then((data) => {
                    let messageID = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageID.push(data.rows.item(i).startDate);
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
                this.schoolDb.executeSql("SELECT rowid,* FROM homeworkTbl ORDER BY updatedOn DESC", []).then((data) => {
                    let messageDetails = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ startDate: data.rows.item(i).startDate, subject: data.rows.item(i).subject, endDate: data.rows.item(i).endDate, class: data.rows.item(i).class, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                    resolve(messageDetails);
                }, (error) => {
                    reject(error);
                });
        });
    }

    addHomework(data) {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => {
            this.schoolDb.executeSql("INSERT INTO homeworkTbl (startDate, subject, endDate, class, descrip, updatedOn) VALUES ('" + data.dateSelect + "','" + data.subjectName + "','" + data.endDateSelect + "','" + data.className + "','" + data.descrip + "','" + this.dateTime + "')", []).then((data) => {
                let messageDetails = [];
                this.schoolDb.executeSql("SELECT rowid,* FROM homeworkTbl ORDER BY updatedOn DESC", []).then((data) => {
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ startDate: data.rows.item(i).startDate, subject: data.rows.item(i).subject, endDate: data.rows.item(i).endDate, class: data.rows.item(i).class, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                });
                resolve(messageDetails);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateHomework(data) 
    {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => 
        {
            this.schoolDb.executeSql( "UPDATE homeworkTbl SET startDate = '"+data.dateSelect+"', subject = '"+data.subjectName+"', endDate = '"+data.endDateSelect+"', class = '"+data.className+"', descrip = '"+data.descrip+"', updatedOn = '"+this.dateTime+"' where rowid = '"+data.rowid+"'", []).then((data) => 
            {
                let presetResult="Updated Successfully";
                
                resolve(presetResult);
            }, (error) => {
                reject(error);
                 
            });
        });
    }

    deleteHomework() {
        this.schoolDb.openDatabase({ name: "schoolDb", location: "default" }).then(() => {
            this.schoolDb.executeSql("DELETE FROM homeworkTbl", {}).then((data) => {
            }, (error) => {
            });
        }, (error) => {
        });
    }
}
