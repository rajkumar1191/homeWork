import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AsDbservice } from '../../providers/as-dbservice';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { CalendarModalPage } from '../calendar-modal/calendar-modal';

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
    todaysDate = '';
    homeworkStartArray = [];
    selectedCalss = 'I';
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController, private platform: Platform, public toastCtrl: ToastController, public formBuilder: FormBuilder, public asDbservice: AsDbservice, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.data = navParams.data;
        //  this.menuCtrl.enable(false);
        this.date = new Date().toISOString();
        let dateParts = this.date.split("T");
        console.log(dateParts[0])
        // this.todaysDate = dateParts[0];
        this.viewWillEnter();        
        var dateParts1 = dateParts[0].split("-");
        this.selectedDate = dateParts1[2] + '/' + dateParts1[1] + '/' + dateParts1[0].slice(-2);
        this.feedbacForm = new FormGroup(
            {
                rowid: new FormControl(),
                dateSelect: new FormControl(dateParts[0]),
                pname: new FormControl(),
                sname: new FormControl(),
                class: new FormControl(),
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
    eventsStartArray = [];
    ngOnDestroy() {

    }
    openCalendar(){
        let modal = this.modalCtrl.create(CalendarModalPage);
            modal.present();
            modal.onDidDismiss(data=>{
                this.date = data;
                this.todaysDate = data;
                var dateParts1 = data.split("-");
                this.selectedDate = dateParts1[2] + '/' + dateParts1[1] + '/' + dateParts1[0].slice(-2);
                this.ionViewDidLoad();
                //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
            console.log("Data =>", data) //This will log the form entered by user in add modal.
        })
    }
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
             this.viewWillEnter();   
        refresher.complete();
        }, 2000);
    }
    submitFeedback() {
        let feedbackInsertData = {};
        feedbackInsertData['dateSelect'] = this.feedbacForm.controls['dateSelect'].value;
        feedbackInsertData['pname'] = this.feedbacForm.controls['pname'].value;
        feedbackInsertData['sname'] = this.feedbacForm.controls['sname'].value;
        feedbackInsertData['class'] = this.feedbacForm.controls['class'].value;
        feedbackInsertData['descrip'] = this.feedbacForm.controls['descrip'].value;

        this.asDbservice.addFeedback(feedbackInsertData).then((messageDetails) => {
           console.log(messageDetails);
           let toast = this.toastCtrl.create({
                message: 'Send Successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }, (error) => {
           console.log(error);            
        });
       
    }
    ionViewDidLoad() {
        this.asDbservice.getHomework().then((messageDetails) => {
            this.homeworkArray = [];
            this.homeworkArray.push(messageDetails);
            console.log(this.homeworkArray);
        }, (error) => {
            console.log(error);
        });
        this.asDbservice.getEvents().then((messageDetails) => {
            this.eventsArray = [];
            this.eventsArray.push(messageDetails);
            console.log(this.eventsArray);
        }, (error) => {
            console.log(error);
        });
        this.asDbservice.getNews().then((messageDetails) => {
            this.newsArray = [];
            this.newsArray.push(messageDetails);
            console.log(this.newsArray);
        }, (error) => {
            console.log(error);
        });
        
        this.asDbservice.getFeedback().then((messageDetails) => {
            this.feedbackArray = [];
            this.feedbackArray.push(messageDetails);
            console.log(this.feedbackArray);
        }, (error) => {
            console.log(error);
        });
    }
    viewWillEnter() {
        this.asDbservice.getHomework().then((messageDetails) => {
            this.homeworkArray = [];
            this.homeworkArray.push(messageDetails);
            console.log(this.homeworkArray);
        }, (error) => {
            console.log(error);
        });
        this.asDbservice.getHomeworkDate().then((messageID) => {
            this.homeworkStartArray = [];
            this.homeworkStartArray.push(messageID);
            console.log(this.homeworkStartArray);
        }, (error) => {
            console.log(error);
        });
        this.asDbservice.getNews().then((messageDetails) => {
            this.newsArray = [];
            this.newsArray.push(messageDetails);
            console.log(this.newsArray);
        }, (error) => {
            console.log(error);
        });
        this.asDbservice.getEvents().then((messageDetails) => {
            this.eventsArray = [];
            this.eventsArray.push(messageDetails);
            console.log(this.eventsArray);
        }, (error) => {
            console.log(error);
        });
        this.asDbservice.getEventsDate().then((messageID) => {
            this.eventsStartArray = [];
            this.eventsStartArray.push(messageID);
            console.log(this.eventsStartArray);
        }, (error) => {
            console.log(error);
        });
        this.asDbservice.getFeedback().then((messageDetails) => {
            this.feedbackArray = [];
            this.feedbackArray.push(messageDetails);
            console.log(this.feedbackArray);
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
    editHomeworkData(data, data1) {
        let arrayData = this.homeworkArray[0][data];
        console.log(arrayData);
        let modal = this.modalCtrl.create(ModalPage, { data: this.data, editArrayData: arrayData });
        modal.present();
        console.log(data);
    }
    deleteHomeWorkData(data, data1) {
        
        let homeWorkId = data1;
        let confirm = this.alertCtrl.create({
            title: '',
            message: 'Are you sure you want to delete',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log("cancelled");
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        this.asDbservice.deleteHomeworkByID(homeWorkId).then((result) => {
                            let toast = this.toastCtrl.create({
                                message: 'Deleted Successfully',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            this.viewWillEnter();
                        }, (error) => {
                            console.log("ERROR: ", error);
                        });
                    }
                }
            ]
        });
        confirm.present();
    }
    editEventsData(data, data1) {
        let arrayData = this.eventsArray[0][data];
        console.log(arrayData);
        let modal = this.modalCtrl.create(ModalPage, { data: this.data, editArrayData: arrayData });
        modal.present();
        console.log(data);
    }
    deleteEventsData(data, data1) {
        
        let eventId = data1;
        let confirm = this.alertCtrl.create({
            title: '',
            message: 'Are you sure you want to delete',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log("cancelled");
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        this.asDbservice.deleteEventsByID(eventId).then((result) => {
                            let toast = this.toastCtrl.create({
                                message: 'Deleted Successfully',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            this.viewWillEnter();
                        }, (error) => {
                            console.log("ERROR: ", error);
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

    editNewsData(data, data1) {
        let arrayData = this.newsArray[0][data];
        console.log(arrayData);
        let modal = this.modalCtrl.create(ModalPage, { data: this.data, editArrayData: arrayData });
        modal.present();
        console.log(data);
    }
    deleteNewsData(data, data1) {
        
        let eventId = data1;
        let confirm = this.alertCtrl.create({
            title: '',
            message: 'Are you sure you want to delete',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log("cancelled");
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        this.asDbservice.deleteNewsByID(eventId).then((result) => {
                            let toast = this.toastCtrl.create({
                                message: 'Deleted Successfully',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            this.viewWillEnter();
                        }, (error) => {
                            console.log("ERROR: ", error);
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

    deleteFeedData(data, data1) {
        
        let deleteId = data1;
        let confirm = this.alertCtrl.create({
            title: '',
            message: 'Are you sure you want to delete',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log("cancelled");
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        this.asDbservice.deleteFeedbackByID(deleteId).then((result) => {
                            let toast = this.toastCtrl.create({
                                message: 'Deleted Successfully',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            this.viewWillEnter();
                        }, (error) => {
                            console.log("ERROR: ", error);
                        });
                    }
                }
            ]
        });
        confirm.present();
    }
    popUp(data)
    {
        let arrayData = this.eventsArray[0][data];
        let alert = this.alertCtrl.create({
            title: 'Start Date - '+arrayData.startDate+' End Date - '+arrayData.endDate,
            subTitle: 'Event Title - '+arrayData.title,
            message: 'Event Description - '+arrayData.descrip,
            buttons: ['OK']
        });
        alert.present();
    }
    newsPopUp(data)
    {
        let arrayData = this.newsArray[0][data];
        let alert = this.alertCtrl.create({
            title: 'Start Date - '+arrayData.startDate,
            subTitle: 'News Title - '+arrayData.newsTitle,
            message: 'News Description - '+arrayData.descrip,
            buttons: ['OK']
        });
        alert.present();
    }
}
