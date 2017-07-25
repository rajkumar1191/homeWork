import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Home } from '../home/home';
import { Landing } from '../landing/landing';
import { LiveDataService } from './live.service';
import {ApplicationRef} from '@angular/core';
import { CodePush } from '@ionic-native/code-push';

declare const codePush: CodePush;
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  home:any = Home;
  matchDetails : any;
  liveDetails = "Live stream will appear here";
  matchData:any;
  item:any;
  error: any;
  splitMode = false;
  matchDetailsResponse: any;
  errorMessage:any;
  loading = null;
  myHttpSubscription = null;
  team1 = "";
  team2 = "";
  score1 = "";
  score2 = "";
  public tap: number = 0;
  isUpdateAvailable:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public liveDataService: LiveDataService, private platform: Platform) {
        this.matchDetails = navParams.get('matchDetails');
        this.menuCtrl.enable(true);
        this.platform.ready().then(() => {
            codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
            const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
            codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
        });
  }
  
  ngOnDestroy()
  {
        if(this.myHttpSubscription != null)
        {
            // this.loading.dismiss();
            this.myHttpSubscription.unsubscribe();
        }
  }        
  ionViewDidLoad() {
    this.myHttpSubscription = setInterval(() => {
        this.myHttpSubscription = this.liveDataService.getMatchDetails().subscribe(matchDetailsResponse =>
            {
              
                let liveDetailsResponse = matchDetailsResponse.text; 
                var liveDetails = (liveDetailsResponse).split("~");
                
                if(liveDetails[1]){
                  this.splitMode = true;
                  this.team1 = liveDetails[0];
                  this.score1 = liveDetails[1];                  
                  this.team2 = liveDetails[2];
                  this.score2 = liveDetails[3];
                  console.log("split is there")
                }
                else
                {
                  this.liveDetails = liveDetailsResponse;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.error = "Internal error, please try after sometime";
            }); 
      }, 10000);
    
  }
  // tapEvent(e) {
  //   this.tap++
  //   if(this.tap == 5)
  //   {
  //     this.navCtrl.push(Landing);
  //   }
  // }
  loginFunction(m)
  {
    let data='';
    if(m =='m')
    {
      data='Mens';
    }
    else if(m =='w')
    {
      data='Womens';
    }
    else{
      data='Mixed';
    }
    console.log(data);
    this.navCtrl.push(Home,{matchDetails:this.matchDetails, data:data})
  }
}
