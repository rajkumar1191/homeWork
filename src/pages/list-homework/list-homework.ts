import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

declare var navigator: any;
declare var Connection: any;

@Component({
    selector: 'page-list-homework',
    templateUrl: 'list-homework.html',
})
export class ListHomework {
    feedbacForm: FormGroup;
    backdrop = true;
    data = [];
    shownGroup = null;
    matchDetails: any;
    matchFixtureDetails: any;
    matchDateDetails: any;
    matchData: any;
    item: any;
    error: any;
    date: any;
    selectedDate = '';
    homeworkArray = [];
    newsArray = [];
    eventsArray = [];
    feedbackArray = [];
    todaysDate ='';
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController, private platform: Platform, public toastCtrl: ToastController, public formBuilder: FormBuilder) {
        this.data = navParams.data;
        //  this.menuCtrl.enable(false);
        this.date = new Date().toISOString();
        let dateParts = this.date.split("T");
        console.log(dateParts[0])
        this.todaysDate = dateParts[0];
        var dateParts1 = dateParts[0].split("-");
        this.selectedDate = dateParts1[2] + '/' + dateParts1[1] + '/' + dateParts1[0].slice(-2);
        this.feedbacForm = new FormGroup(
        {
            rowid: new FormControl(),
            dateSelect: new FormControl(),
            feedTitle: new FormControl(),
            descrip: new FormControl('', [<any>Validators.required])
        });
    }
    loading = this.loadingCtrl.create({
        content: 'Loading'
    });
    init() {
        this.loading = this.loadingCtrl.create({
            content: 'Loading'
        });
    }
    matchDetailsResponse: any;
    errorMessage: any;
    myHttpSubscription = null;
    ngOnDestroy() {
        
    }
    submitNews() {
        let feedbackInsertData = {};
        feedbackInsertData['dateSelect'] = this.feedbacForm.controls['dateSelect'].value;
        feedbackInsertData['feedTitle'] = this.feedbacForm.controls['feedTitle'].value;
        feedbackInsertData['descrip'] = this.feedbacForm.controls['descrip'].value;

        if(this.feedbacForm.controls['dateSelect'].status == 'valid' && this.feedbacForm.controls['feedTitle'].status == 'valid' && this.feedbacForm.controls['descrip'].status == 'valid')
        {
            let toast = this.toastCtrl.create({
                message: 'Send Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
        //this.homeWorkArray.push(homeworkInsertData);
        //console.log(JSON.stringify(this.homeWorkArray));
        
        // this.asDbservice.addHomework(homeworkInsertData).then((messageDetails) => {
        //    console.log(messageDetails);
        //}, (error) => {
        //    console.log(error);            
        // });
    }
    ionViewDidLoad() {
         this.homeworkArray = [
            {"dateSelect":this.selectedDate,"className":"I","staffName":"Naveen","subjectName":"English","descrip":"Write A-Z 2 times"},
            {"dateSelect":this.selectedDate,"className":"I","staffName":"Raj","subjectName":"Science","descrip":"Study for tomorrow test"},
            {"dateSelect":this.selectedDate,"className":"I","staffName":"Surya","subjectName":"Maths","descrip":"Study for tomorrow test"},
            {"dateSelect":this.selectedDate,"className":"II","staffName":"Surya","subjectName":"Social","descrip":"Study for tomorrow test"}
        ];
        this.newsArray = [
            {"dateSelect":this.selectedDate,"newsTitle":"Internal Exam","descrip":"Internal exam starts on 30-08-2017"},
            {"dateSelect":this.selectedDate,"newsTitle":"Remainder","descrip":"Gendle remainder to pay fees"},
            {"dateSelect":this.selectedDate,"newsTitle":"Social","descrip":"Study for tomorrow test"}
        ];
        this.eventsArray = [
            {"startDate":this.selectedDate,"endDate":this.selectedDate,"eventTitle":"Workshop","descrip":"One day work shop for 12th students"},
            {"startDate":this.selectedDate,"endDate":this.selectedDate,"eventTitle":"Tour","descrip":"One day outing for 7th students"},
        ];
        this.feedbackArray = [
            {"dateSelect":this.selectedDate,"title":"Homework","descrip":"Please give less homework"},
            {"dateSelect":this.selectedDate,"title":"Facility","descrip":"Cab not coming at correct time"},
            {"dateSelect":this.selectedDate,"title":"Fees Details","descrip":"Need proper information about fees details"}
        ];
    }
    toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    }
    isGroupShown(group) {
        return this.shownGroup === group;
    }
}
