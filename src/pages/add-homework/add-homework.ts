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
    }

    matchDetailsResponse: any;
    errorMessage: any;
    myHttpSubscription = null;
    matchDateDetails1: any;

    ionViewDidLoad() {

        // this.myHttpSubscription = this.matchService.getMatchDetails().subscribe(matchDetailsResponse =>
        //   {
        //       this.loading.dismiss();          
        //       this.matchDateDetails = matchDetailsResponse; 
        //       this.storage.set('matchDetailsResponse', this.matchDateDetails);
        //       if((this.matchDateDetails.BadmintonApp != undefined) || (this.matchDateDetails.BadmintonApp != null))
        //       {
        //         this.matchDateDetails = this.matchService.matchDateDetails;

        //       }
        //       else if(this.matchDateDetails.length > 0)
        //       {
        //           this.matchDateDetails = this.matchDateDetails;
        //           this.storage.get('matchDetailsResponse').then((val) => {
        //             console.log('Your age is', val);
        //           });
        //       }
        //       else
        //       {
        //           this.matchDateDetails = this.matchService.matchDateDetails;
        //           this.storage.get('matchDetailsResponse').then((val) => {
        //             console.log('Your age is', val);
        //           });
        //       }
        //   },
        //   error => {
        //       this.errorMessage = <any>error;
        //       this.error = "Internal error, please try after sometime";
        //       this.loading.dismiss();

        //   });
    }
    submit() {
        let homeworkInsertData = {};
        homeworkInsertData['dateSelect'] = this.homeworkForm.controls['dateSelect'].value;
        homeworkInsertData['className'] = this.homeworkForm.controls['className'].value;
        homeworkInsertData['staffName'] = this.homeworkForm.controls['staffName'].value;
        homeworkInsertData['subjectName'] = this.homeworkForm.controls['subjectName'].value;
        homeworkInsertData['descrip'] = this.homeworkForm.controls['descrip'].value;
        this.asDbservice.addHomework(homeworkInsertData).then((messageDetails) => {
            console.log(messageDetails);
        }, (error) => {
            console.log(error);            
        });
    }

}
