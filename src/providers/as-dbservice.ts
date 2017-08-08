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
                this.schoolDb.executeSql('CREATE TABLE IF NOT EXISTS eventsTbl (startDate VARCHAR, title VARCHAR, endDate VARCHAR, descrip VARCHAR, updatedOn INTEGER)', {}).then((data) => {
                    // this.deleteHomework();
                    this.getEvents();
                }, (error) => {
                });
                this.schoolDb.executeSql('CREATE TABLE IF NOT EXISTS newsTbl (startDate VARCHAR, newsTitle VARCHAR, descrip VARCHAR, updatedOn INTEGER)', {}).then((data) => {
                    // this.deleteHomework();
                    this.getNews();
                }, (error) => {
                });
                this.schoolDb.executeSql('CREATE TABLE IF NOT EXISTS feedTbl (dateSelect VARCHAR, pname VARCHAR, sname VARCHAR, class VARCHAR, descrip VARCHAR, updatedOn INTEGER)', {}).then((data) => {
                    // this.deleteHomework();
                    this.getNews();
                }, (error) => {
                });
            }, (error) => {

            });
        });
    }

    getHomeworkDate() {
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

    deleteHomeworkByID(data) 
    {
        return new Promise((resolve, reject) => 
        {
            this.schoolDb.executeSql( "DELETE FROM homeworkTbl where rowid = '"+data+"'", []).then((data) => 
            {
                let deleteResult="Deleted Successfully";                
                resolve(deleteResult);
            }, (error) => {
                reject(error);                 
            });
        });
    }

    getEventsDate() {
        return new Promise((resolve, reject) => {
            this.schoolDb.openDatabase({ name: "schoolDb", location: "default" }).then(() => {
                this.schoolDb.executeSql("SELECT rowid,* FROM eventsTbl ORDER BY updatedOn DESC ", []).then((data) => {
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

    getEvents() {
        return new Promise((resolve, reject) => { 
                this.schoolDb.executeSql("SELECT rowid,* FROM eventsTbl ORDER BY updatedOn DESC", []).then((data) => {
                    let messageDetails = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ startDate: data.rows.item(i).startDate, title: data.rows.item(i).title, endDate: data.rows.item(i).endDate, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                    resolve(messageDetails);
                }, (error) => {
                    reject(error);
                });
        });
    }

    addEvents(data) {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => {
            this.schoolDb.executeSql("INSERT INTO eventsTbl (startDate, title, endDate, descrip, updatedOn) VALUES ('" + data.startDate + "','" + data.eventTitle + "','" + data.endDate + "','" + data.descrip + "','" + this.dateTime + "')", []).then((data) => {
                let messageDetails = [];
                this.schoolDb.executeSql("SELECT rowid,* FROM eventsTbl ORDER BY updatedOn DESC", []).then((data) => {
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ startDate: data.rows.item(i).startDate, title: data.rows.item(i).title, endDate: data.rows.item(i).endDate, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                });
                resolve(messageDetails);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateEvents(data) 
    {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => 
        {
            this.schoolDb.executeSql( "UPDATE eventsTbl SET startDate = '"+data.startDate+"', title = '"+data.eventTitle+"', endDate = '"+data.endDate+"', descrip = '"+data.descrip+"', updatedOn = '"+this.dateTime+"' where rowid = '"+data.rowid+"'", []).then((data) => 
            {
                let presetResult="Updated Successfully";
                
                resolve(presetResult);
            }, (error) => {
                reject(error);
                 
            });
        });
    }

    deleteEventsByID(data) 
    {
        return new Promise((resolve, reject) => 
        {
            this.schoolDb.executeSql( "DELETE FROM eventsTbl where rowid = '"+data+"'", []).then((data) => 
            {
                let deleteResult="Deleted Successfully";                
                resolve(deleteResult);
            }, (error) => {
                reject(error);                 
            });
        });
    }

    
    getNews() {
        return new Promise((resolve, reject) => { 
                this.schoolDb.executeSql("SELECT rowid,* FROM newsTbl ORDER BY updatedOn DESC", []).then((data) => {
                    let messageDetails = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ startDate: data.rows.item(i).startDate, newsTitle: data.rows.item(i).newsTitle, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                    resolve(messageDetails);
                }, (error) => {
                    reject(error);
                });
        });
    }

    addNews(data) {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => {
            this.schoolDb.executeSql("INSERT INTO newsTbl (startDate, newsTitle, descrip, updatedOn) VALUES ('" + data.dateSelect + "','" + data.newsTitle + "','" + data.descrip + "','" + this.dateTime + "')", []).then((data) => {
                let messageDetails = [];
                this.schoolDb.executeSql("SELECT rowid,* FROM newsTbl ORDER BY updatedOn DESC", []).then((data) => {
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ startDate: data.rows.item(i).startDate, newsTitle: data.rows.item(i).newsTitle, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                });
                resolve(messageDetails);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateNews(data) 
    {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => 
        {
            this.schoolDb.executeSql( "UPDATE newsTbl SET startDate = '"+data.dateSelect+"', newsTitle = '"+data.newsTitle+"', descrip = '"+data.descrip+"', updatedOn = '"+this.dateTime+"' where rowid = '"+data.rowid+"'", []).then((data) => 
            {
                let presetResult="Updated Successfully";
                
                resolve(presetResult);
            }, (error) => {
                reject(error);
                 
            });
        });
    }

    deleteNewsByID(data) 
    {
        return new Promise((resolve, reject) => 
        {
            this.schoolDb.executeSql( "DELETE FROM newsTbl where rowid = '"+data+"'", []).then((data) => 
            {
                let deleteResult="Deleted Successfully";                
                resolve(deleteResult);
            }, (error) => {
                reject(error);                 
            });
        });
    }

    getFeedback() {
        return new Promise((resolve, reject) => { 
                this.schoolDb.executeSql("SELECT rowid,* FROM feedTbl ORDER BY updatedOn DESC", []).then((data) => {
                    let messageDetails = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ dateSelect: data.rows.item(i).dateSelect, pname: data.rows.item(i).pname, sname: data.rows.item(i).sname, class: data.rows.item(i).class, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                    resolve(messageDetails);
                }, (error) => {
                    reject(error);
                });
        });
    }

    addFeedback(data) {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        return new Promise((resolve, reject) => {
            this.schoolDb.executeSql("INSERT INTO feedTbl (dateSelect, pname, sname, class, descrip, updatedOn) VALUES ('" + data.dateSelect + "','" + data.pname + "','" + data.sname + "','" + data.class + "','" + data.descrip + "','" + this.dateTime + "')", []).then((data) => {
                let messageDetails = [];
                this.schoolDb.executeSql("SELECT rowid,* FROM feedTbl ORDER BY updatedOn DESC", []).then((data) => {
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            messageDetails.push({ dateSelect: data.rows.item(i).dateSelect, pname: data.rows.item(i).pname, sname: data.rows.item(i).sname, class: data.rows.item(i).class, descrip: data.rows.item(i).descrip, rowid: data.rows.item(i).rowid });
                        }
                    }
                });
                resolve(messageDetails);
            }, (error) => {
                reject(error);
            });
        });
    }
    deleteFeedbackByID(data) 
    {
        return new Promise((resolve, reject) => 
        {
            this.schoolDb.executeSql( "DELETE FROM feedTbl where rowid = '"+data+"'", []).then((data) => 
            {
                let deleteResult="Deleted Successfully";                
                resolve(deleteResult);
            }, (error) => {
                reject(error);                 
            });
        });
    }
}