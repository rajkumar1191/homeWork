import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Login } from '../login/login';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MatchService } from '../home/home.service';
import { Storage } from '@ionic/storage';

// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
/**
 * Generated class for the MyService page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
 
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInLeftSideSlow', [
      state('in', style({
        transform: 'translate3d(0,-400px,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,-400px,0)'}),
        style({transform: 'translate3d(0,0px,0)'}),
        style({transform: 'translate3d(0,0,0)'}),
        animate('2000ms ease-in-out')
      ])
    ]),
     trigger('flyInRightSideSlow', [
      state('in', style({
        transform: 'translate3d(-100px,0px,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(-100px,0,0)'}),
        style({transform: 'translate3d(0px,0,0)'}),
        style({transform: 'translate3d(0,500px,0)'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class Landing {
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  formState1: any = "in";
  error: any;
  // constructor(public navCtrl: NavController, public navParams: NavParams, public splashScreen: SplashScreen, public matchService: MatchService,  public loadingCtrl: LoadingController, public storage: Storage, private streamingMedia: StreamingMedia, private youtube: YoutubeVideoPlayer) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public splashScreen: SplashScreen, public matchService: MatchService,  public loadingCtrl: LoadingController, public storage: Storage) {
    setTimeout(() => {
      // this.viewCtrl.dismiss();
       this.getLandingPage()
    }, 5000);
  }

  matchDetailsResponse: any;
  errorMessage:any;
  loading = null;
  // init(){
  //       this.loading = this.loadingCtrl.create({
  //           content: 'Loading'
  //       });
  // }
  myHttpSubscription = null;
  ngOnDestroy()
  {
        if(this.myHttpSubscription != null)
        {
            // this.loading.dismiss();
            this.myHttpSubscription.unsubscribe();
        }
  }

  ionViewDidLoad() {
        this.splashScreen.hide();
        // let options: StreamingVideoOptions = {
        //   successCallback: () => { console.log('Video played') },
        //   errorCallback: (e) => { console.log('Error streaming') },
        //   orientation: 'landscape'
        // };
        // this.youtube.openVideo('1UIhKZCPMYM');
        // this.streamingMedia.playVideo('https://youtu.be/hK0EUoVjn64', options);


      //   this.myHttpSubscription = this.matchService.getMatchDetails().subscribe(matchDetailsResponse =>
      // {
      //     this.matchDetailsResponse = matchDetailsResponse.BadmintonApp.matchesResponse; 
      //     console.log( this.matchDetailsResponse );
      //     if(this.matchDetailsResponse.length>=1)
      //     {
      //         this.storage.ready().then(() => {
      //               let updatedMatchDetails;
      //               this.storage.get('matchDetails').then((matchDetails) => {

      //                   updatedMatchDetails =  matchDetails != null ? matchDetails :[];

      //                   if(updatedMatchDetails.length >= 1){
      //                        updatedMatchDetails.push(matchDetails);
      //                   }
      //                   this.storage.set('matchDetails', updatedMatchDetails);
      //               });
      //           });
      //     }
        
      // },
      // error => {
      //     this.errorMessage = <any>error;
      //     this.error = "Internal error, please try after sometime";
      //     // this.loading.dismiss();
      //     // this.doAlert();

      // });
  }
    
  getLandingPage(){
    this.navCtrl.setRoot(Login,{matchDetails:this.matchDetailsResponse});
  }
}
