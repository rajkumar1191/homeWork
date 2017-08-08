import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AsDbservice } from '../../providers/as-dbservice';
import { ModalController } from 'ionic-angular';

declare var navigator: any;
declare var Connection: any;

@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html',
})
export class ModalPage {
    feedbacForm: FormGroup;
    backdrop = true;
    data:any;
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
    homeworkForm: FormGroup;
    eventsForm: FormGroup;
    newsForm: FormGroup;
    todaysDate ='';
    editData:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController, private platform: Platform, public toastCtrl: ToastController, public formBuilder: FormBuilder, public asDbservice: AsDbservice, public modalCtrl: ModalController, public viewCtrl: ViewController) {
        this.data = navParams.get('data');
        this.editData = navParams.data.editArrayData;
        console.log(this.editData);
        //  this.menuCtrl.enable(false);
        this.date = new Date().toISOString();
        let dateParts = this.date.split("T");
        console.log(dateParts[0])
        this.todaysDate = dateParts[0];
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
            this.homeworkForm.get("dateSelect").setValue(this.editData.startDate, { onlySelf: true, emitEvent: false });
            this.homeworkForm.get("endDateSelect").setValue(this.editData.endDate, { onlySelf: true, emitEvent: false });
            this.homeworkForm.get("className").setValue(this.editData.class, { onlySelf: true, emitEvent: false });
            this.homeworkForm.get("subjectName").setValue(this.editData.subject, { onlySelf: true, emitEvent: false });
            this.homeworkForm.get("descrip").setValue(this.editData.descrip, { onlySelf: true, emitEvent: false });
            this.homeworkForm.get("rowid").setValue(this.editData.rowid, { onlySelf: true, emitEvent: false });
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
            this.eventsForm.get("startDate").setValue(this.editData.startDate, { onlySelf: true, emitEvent: false });
            this.eventsForm.get("endDate").setValue(this.editData.endDate, { onlySelf: true, emitEvent: false });
            this.eventsForm.get("eventTitle").setValue(this.editData.title, { onlySelf: true, emitEvent: false });
            this.eventsForm.get("descrip").setValue(this.editData.descrip, { onlySelf: true, emitEvent: false });
            this.eventsForm.get("rowid").setValue(this.editData.rowid, { onlySelf: true, emitEvent: false });
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
            this.newsForm.get("dateSelect").setValue(this.editData.startDate, { onlySelf: true, emitEvent: false });
            this.newsForm.get("newsTitle").setValue(this.editData.newsTitle, { onlySelf: true, emitEvent: false });
            this.newsForm.get("descrip").setValue(this.editData.descrip, { onlySelf: true, emitEvent: false });
            this.newsForm.get("rowid").setValue(this.editData.rowid, { onlySelf: true, emitEvent: false });
        }
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
    submitFeedback() {
        let feedbackInsertData = {};
        feedbackInsertData['dateSelect'] = this.feedbacForm.controls['dateSelect'].value;
        feedbackInsertData['feedTitle'] = this.feedbacForm.controls['feedTitle'].value;
        feedbackInsertData['descrip'] = this.feedbacForm.controls['descrip'].value;

    }
    ionViewDidLoad() {
        this.asDbservice.getHomework().then((messageDetails) => {
           this.homeworkArray = [];            
           this.homeworkArray.push(messageDetails);
           console.log(this.homeworkArray);
        }, (error) => {
           console.log(error);            
        });
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
    submitHomework() {
        let homeworkUpdateData = {};
        homeworkUpdateData['dateSelect'] = this.homeworkForm.controls['dateSelect'].value;
        homeworkUpdateData['endDateSelect'] = this.homeworkForm.controls['endDateSelect'].value;
        homeworkUpdateData['className'] = this.homeworkForm.controls['className'].value;
        homeworkUpdateData['subjectName'] = this.homeworkForm.controls['subjectName'].value;
        homeworkUpdateData['descrip'] = this.homeworkForm.controls['descrip'].value;
        homeworkUpdateData['rowid'] = this.homeworkForm.controls['rowid'].value;

        this.asDbservice.updateHomework(homeworkUpdateData).then((messageDetails) => {
           console.log(messageDetails);
            let toast = this.toastCtrl.create({
                    message: 'Updated Successfully',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
           this.viewCtrl.dismiss();                
        }, (error) => {
           console.log(error);            
        });
    }
    submitEvent() {
        let EventUpdateData = {};
        EventUpdateData['startDate'] = this.eventsForm.controls['startDate'].value;
        EventUpdateData['endDate'] = this.eventsForm.controls['endDate'].value;
        EventUpdateData['eventTitle'] = this.eventsForm.controls['eventTitle'].value;
        EventUpdateData['descrip'] = this.eventsForm.controls['descrip'].value;
        EventUpdateData['rowid'] = this.eventsForm.controls['rowid'].value;

        this.asDbservice.updateEvents(EventUpdateData).then((messageDetails) => {
           console.log(messageDetails);
            let toast = this.toastCtrl.create({
                    message: 'Updated Successfully',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
           this.viewCtrl.dismiss();                
        }, (error) => {
           console.log(error);            
        });
    }

    submitNews() {
        let newsUpdateData = {};
        newsUpdateData['dateSelect'] = this.newsForm.controls['dateSelect'].value;
        newsUpdateData['newsTitle'] = this.newsForm.controls['newsTitle'].value;
        newsUpdateData['descrip'] = this.newsForm.controls['descrip'].value;
        newsUpdateData['rowid'] = this.newsForm.controls['rowid'].value;

        this.asDbservice.updateNews(newsUpdateData).then((messageDetails) => {
           console.log(messageDetails);
           let toast = this.toastCtrl.create({
                message: 'Added Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            this.viewCtrl.dismiss();       
        }, (error) => {
           console.log(error);            
        });
    }
    
    viewWillEnter(){
        this.asDbservice.getHomework().then((messageDetails) => {
            this.homeworkArray = [];
           this.homeworkArray.push(messageDetails);
           console.log(this.homeworkArray);
        }, (error) => {
           console.log(error);            
        });
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
