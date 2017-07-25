import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Platform, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MatchService } from '../home/home.service';

declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-match-fixtures',
  templateUrl: 'match-fixtures.html',
})
export class MatchFixtures {
  backdrop = true;
  data:any ='';
  shownGroup = null;
  matchDetails:any;
  matchFixtureDetails:any;
  matchDateDetails:any;
  matchData:any;
  item:any;
  error: any;
  groupF = false;
  date:any;
  selectedDate = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public matchService: MatchService, public menuCtrl: MenuController, public loadingCtrl:LoadingController, public toastCtrl: ToastController, private platform: Platform) {
            this.data = navParams.data;
            // this.menuCtrl.enable(true);
            this.checkNetwork();
            this.date = new Date().toISOString();
            var dateParts = this.date.split("T");
            var dateParts1 = dateParts[0].split("-");
            this.selectedDate = dateParts1[2]+'/'+dateParts1[1]+'/'+dateParts1[0].slice(-2);
  }
  
  matchDetailsResponse: any;
  errorMessage:any;
  myHttpSubscription = null;
  matchDateDetails1:any;
  loading = this.loadingCtrl.create({
        content: 'Loading'
    });
    init(){
        this.loading = this.loadingCtrl.create({
            content: 'Loading'
        });
    }
  ngOnDestroy()
  {
        if(this.myHttpSubscription != null)
        {
            this.loading.dismiss();
            this.myHttpSubscription.unsubscribe();
        }
  }        
  checkNetwork() {
    // this.platform.ready().then(() => {
    //     var networkState = navigator.connection.type;
    //     var states = {};
    //     states[Connection.UNKNOWN]  = 'Unknown connection';
    //     states[Connection.ETHERNET] = 'Ethernet connection';
    //     states[Connection.WIFI]     = 'WiFi connection';
    //     states[Connection.CELL_2G]  = 'Cell 2G connection';
    //     states[Connection.CELL_3G]  = 'Cell 3G connection';
    //     states[Connection.CELL_4G]  = 'Cell 4G connection';
    //     states[Connection.CELL]     = 'Cell generic connection';
    //     states[Connection.NONE]     = 'No network connection';
    //     if(networkState == 'none')
    //     {
    //         let toast = this.toastCtrl.create({
    //         message: 'Please check your Network Settings',
    //         duration: 3000,
    //         position: 'bottom'
    //         });
    //         toast.present();
    //     }
    // });
}
  ionViewDidLoad() {
    this.loading.present();
            this.storage.get('matchDetailsResponse').then((matchDetailsResponse) => {
              this.matchDateDetails =  matchDetailsResponse;
              this.loading.dismiss();
                if(this.matchDateDetails.length > 0)
                {
                    this.matchDateDetails = this.matchDateDetails;
                }
                else
                {
                    this.matchDateDetails = this.matchService.matchDateDetails;
                }

          }),
        error => {
          this.errorMessage = <any>error;
          this.error = "Internal error, please try after sometime";
          this.loading.dismiss();
      };
          
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
