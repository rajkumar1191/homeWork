import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MatchService } from '../home/home.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AsDbservice } from '../../providers/as-dbservice';

declare var navigator: any;
declare var Connection: any;

@Component({
    selector: 'page-add-homework',
    templateUrl: 'add-homework.html',
})
export class AddHomework {
    homeworkForm: FormGroup;
    eventsForm: FormGroup;
    newsForm: FormGroup;
    backdrop = true;
    data: any = '';
    shownGroup = null;
    matchDetails: any;
    matchFixtureDetails: any;
    matchDateDetails: any;
    matchData: any;
    item: any;
    error: any;
    groupF = false;
    date: any;
    selectedDate = '';
    dbserviceresult: any;
    homeWorkArray = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private platform: Platform, public formBuilder: FormBuilder, public asDbservice: AsDbservice) {
        this.data = navParams.data;
        // this.menuCtrl.enable(true);
        this.date = new Date().toISOString();
        var dateParts = this.date.split("T");
        var dateParts1 = dateParts[0].split("-");
        this.selectedDate = dateParts1[2] + '/' + dateParts1[1] + '/' + dateParts1[0].slice(-2);
        if(this.data == 'Home Work')
        {
            this.homeworkForm = new FormGroup(
            {
                rowid: new FormControl(),
                dateSelect: new FormControl(dateParts[0]),
                endDateSelect: new FormControl(dateParts[0]),
                className: new FormControl('I'),
                subjectName: new FormControl(),
                descrip: new FormControl('', [<any>Validators.required])
            });
        }
        else if(this.data == 'Events')
        {
            this.eventsForm = new FormGroup(
            {
                rowid: new FormControl(),
                startDate: new FormControl(dateParts[0]),
                endDate: new FormControl(dateParts[0]),
                eventTitle: new FormControl(),
                descrip: new FormControl('', [<any>Validators.required])
            });
        }
        else if(this.data == 'News')
        {
            this.newsForm = new FormGroup(
            {
                rowid: new FormControl(),
                dateSelect: new FormControl(dateParts[0]),
                newsTitle: new FormControl(),
                descrip: new FormControl('', [<any>Validators.required])
            });
        }
    }

    matchDetailsResponse: any;
    errorMessage: any;
    myHttpSubscription = null;
    matchDateDetails1: any;

    ionViewDidLoad() {
        this.homeWorkArray = [
            {"dateSelect":"2017-09-01","className":"I","staffName":"Naveen","subjectName":"English","descrip":"Write A-Z 2 times"},
            {"dateSelect":"2017-08-01","className":"I","staffName":"Raj","subjectName":"Science","descrip":"Study for tomorrow test"},
            {"dateSelect":"2017-08-01","className":"I","staffName":"Surya","subjectName":"Maths","descrip":"Study for tomorrow test"},
            {"dateSelect":"2017-08-01","className":"II","staffName":"Surya","subjectName":"Social","descrip":"Study for tomorrow test"}
        ]
    }
    submit() {
        let homeworkInsertData = {};
        homeworkInsertData['dateSelect'] = this.homeworkForm.controls['dateSelect'].value;
        homeworkInsertData['endDateSelect'] = this.homeworkForm.controls['endDateSelect'].value;
        homeworkInsertData['className'] = this.homeworkForm.controls['className'].value;
        homeworkInsertData['subjectName'] = this.homeworkForm.controls['subjectName'].value;
        homeworkInsertData['descrip'] = this.homeworkForm.controls['descrip'].value;

        this.asDbservice.addHomework(homeworkInsertData).then((messageDetails) => {
           console.log(messageDetails);
           let toast = this.toastCtrl.create({
                message: 'Added Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }, (error) => {
           console.log(error);            
        });
    }
    submitNews() {
        let newsInsertData = {};
        newsInsertData['dateSelect'] = this.newsForm.controls['dateSelect'].value;
        newsInsertData['newsTitle'] = this.newsForm.controls['newsTitle'].value;
        newsInsertData['descrip'] = this.newsForm.controls['descrip'].value;

        this.asDbservice.addNews(newsInsertData).then((messageDetails) => {
           console.log(messageDetails);
           let toast = this.toastCtrl.create({
                message: 'Added Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }, (error) => {
           console.log(error);            
        });
    }
    submitEvent() {
        let eventsInsertData = {};
        eventsInsertData['startDate'] = this.eventsForm.controls['startDate'].value;
        eventsInsertData['endDate'] = this.eventsForm.controls['endDate'].value;
        eventsInsertData['eventTitle'] = this.eventsForm.controls['eventTitle'].value;
        eventsInsertData['descrip'] = this.eventsForm.controls['descrip'].value;

        this.asDbservice.addEvents(eventsInsertData).then((messageDetails) => {
           console.log(messageDetails);
           let toast = this.toastCtrl.create({
                message: 'Added Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }, (error) => {
           console.log(error);            
        });
    }

}
