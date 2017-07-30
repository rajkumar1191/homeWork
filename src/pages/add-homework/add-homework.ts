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

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public matchService: MatchService, public menuCtrl: MenuController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private platform: Platform, public formBuilder: FormBuilder, public asDbservice: AsDbservice) {
        this.data = navParams.data;
        // this.menuCtrl.enable(true);
        this.date = new Date().toISOString();
        var dateParts = this.date.split("T");
        var dateParts1 = dateParts[0].split("-");
        this.selectedDate = dateParts1[2] + '/' + dateParts1[1] + '/' + dateParts1[0].slice(-2);
        this.homeworkForm = new FormGroup(
            {
                rowid: new FormControl(),
                dateSelect: new FormControl(),
                className: new FormControl('Fixed'),
                staffName: new FormControl(false),
                subjectName: new FormControl(),
                descrip: new FormControl('', [<any>Validators.required])
            });
            this.eventsForm = new FormGroup(
            {
                rowid: new FormControl(),
                startDate: new FormControl(),
                endDate: new FormControl(),
                eventTitle: new FormControl(),
                descrip: new FormControl('', [<any>Validators.required])
            });
            this.newsForm = new FormGroup(
            {
                rowid: new FormControl(),
                dateSelect: new FormControl(),
                newsTitle: new FormControl(),
                descrip: new FormControl('', [<any>Validators.required])
            });
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
        homeworkInsertData['className'] = this.homeworkForm.controls['className'].value;
        homeworkInsertData['staffName'] = this.homeworkForm.controls['staffName'].value;
        homeworkInsertData['subjectName'] = this.homeworkForm.controls['subjectName'].value;
        homeworkInsertData['descrip'] = this.homeworkForm.controls['descrip'].value;



         if(this.homeworkForm.controls['dateSelect'].status == 'valid' && this.homeworkForm.controls['className'].status == 'valid' && this.homeworkForm.controls['staffName'].status == 'valid' && this.homeworkForm.controls['subjectName'].status == 'valid' && this.homeworkForm.controls['descrip'].status == 'valid')
        {
            //this.homeWorkArray.push(homeworkInsertData);
            //console.log(JSON.stringify(this.homeWorkArray));
            let toast = this.toastCtrl.create({
                message: 'Added Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
        // this.asDbservice.addHomework(homeworkInsertData).then((messageDetails) => {
        //    console.log(messageDetails);
        //}, (error) => {
        //    console.log(error);            
        // });
    }
    submitNews() {
        let newsInsertData = {};
        newsInsertData['dateSelect'] = this.newsForm.controls['dateSelect'].value;
        newsInsertData['newsTitle'] = this.newsForm.controls['newsTitle'].value;
        newsInsertData['descrip'] = this.newsForm.controls['descrip'].value;



        if(this.newsForm.controls['dateSelect'].status == 'valid' && this.newsForm.controls['newsTitle'].status == 'valid' && this.newsForm.controls['descrip'].status == 'valid')
        {
            //this.homeWorkArray.push(homeworkInsertData);
            //console.log(JSON.stringify(this.homeWorkArray));
            let toast = this.toastCtrl.create({
                message: 'Added Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
        // this.asDbservice.addHomework(homeworkInsertData).then((messageDetails) => {
        //    console.log(messageDetails);
        //}, (error) => {
        //    console.log(error);            
        // });
    }
    submitEvent() {
        let eventsInsertData = {};
        eventsInsertData['startDate'] = this.eventsForm.controls['startDate'].value;
        eventsInsertData['endDate'] = this.eventsForm.controls['endDate'].value;
        eventsInsertData['eventTitle'] = this.homeworkForm.controls['eventTitle'].value;
        eventsInsertData['descrip'] = this.homeworkForm.controls['descrip'].value;

        if(this.eventsForm.controls['startDate'].status == 'valid' && this.eventsForm.controls['endDate'].status == 'valid' && this.eventsForm.controls['eventTitle'].status == 'valid' && this.eventsForm.controls['descrip'].status == 'valid')
        {
            //this.homeWorkArray.push(homeworkInsertData);
            //console.log(JSON.stringify(this.homeWorkArray));
            let toast = this.toastCtrl.create({
                message: 'Added Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
        // this.asDbservice.addHomework(homeworkInsertData).then((messageDetails) => {
        //    console.log(messageDetails);
        //}, (error) => {
        //    console.log(error);            
        // });
    }

}
