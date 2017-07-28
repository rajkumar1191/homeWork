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
    presetForm: FormGroup;
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
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController, private platform: Platform, public toastCtrl: ToastController, public formBuilder: FormBuilder) {
        this.data = navParams.data;
        //  this.menuCtrl.enable(false);
        this.checkNetwork();
        this.date = new Date().toISOString();
        var dateParts = this.date.split("T");
        var dateParts1 = dateParts[0].split("-");
        this.selectedDate = dateParts1[2] + '/' + dateParts1[1] + '/' + dateParts1[0].slice(-2);
        this.presetForm = new FormGroup(
            {
                rowid: new FormControl(),
                irfp: new FormControl(),
                loanType: new FormControl('Fixed'),
                buyDown: new FormControl(false),
                propState: new FormControl(),
                propType: new FormControl(),
                nonTradeCredit: new FormControl(false),
                noOfUnits: new FormControl(),
                lenderMP: new FormControl(),
                underWriting: new FormControl('Automated Underwriting System'),
                auSystem: new FormControl('DesktopUnderwriter'),
                auResponse: new FormControl('ApproveEligible'),
                presetName: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(30)])
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

    checkNetwork() {
        this.platform.ready().then(() => {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            if (networkState == 'none') {
                let toast = this.toastCtrl.create({
                    message: 'Please check your Network Settings',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
    }
    ionViewDidLoad() {
        // this.storage.get('matchResultDetailsResponse').then((matchResultDetailsResponse) => {
        //     this.matchDateDetails = matchResultDetailsResponse; 

        //     this.loading.dismiss();
        //             this.storage.ready().then(() => {
        //                 let updatedMatches;
        //                 this.storage.get('matchResultDetailsResponse').then((matchResultDetailsResponse) => {
        //                     if(matchResultDetailsResponse != null)
        //                     {
        //                         this.storage.clear().then(() => {
        //                             updatedMatches = this.matchDateDetails ;
        //                             this.storage.set('matchResultDetailsResponse', updatedMatches);
        //                         });
        //                     }
        //                 });
        //             });
        //             this.storage.set('matchResultDetailsResponse', this.matchDateDetails);
        //     if(this.matchDateDetails.length > 0)
        //     {
        //         this.matchDateDetails = this.matchDateDetails;

        //     }
        //     else
        //     {
        //         this.matchDateDetails = this.matchResultService.matchDateDetails;

        //     }
        // }),
        // error => {
        //       this.errorMessage = <any>error;
        //       this.error = "Internal error, please try after sometime";
        //       this.loading.dismiss();
        //   };


        // this.storage.get('matchResultDetailsResponse').then((matchResultDetailsResponse) => {
        //     this.matchDateDetails =  matchResultDetailsResponse;
        //     this.loading.dismiss();
        //     if((this.matchDateDetails.BadmintonApp != undefined) || (this.matchDateDetails.BadmintonApp != null))
        //       {
        //         this.matchDateDetails = this.matchResultService.matchDateDetails;
        //       }
        //       else if(this.matchDateDetails.length > 0)
        //       {
        //           this.matchDateDetails = this.matchDateDetails;
        //       }
        //       else
        //       {
        //             this.matchDateDetails = this.matchResultService.matchDateDetails;
        //       }

        // }),
        // error => {
        //       this.errorMessage = <any>error;
        //       this.error = "Internal error, please try after sometime";
        //       this.loading.dismiss();
        //   };
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
