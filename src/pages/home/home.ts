import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { MatchFixtures } from '../match-fixtures/match-fixtures';
import { Landing } from '../landing/landing';
import { MatchResult } from '../match-result/match-result';
import { MatchService } from './home.service';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {
  tab1Root = MatchFixtures;
  tab2Root = MatchResult;
  tab3Root = Landing;
  error: any;
  data:any;
  matchDetails : any;
  errorMessage:any;
  myHttpSubscription = null;
  matchDateDetails1:any;
  matchDateDetails:any;
  visibleBtn = false;
  constructor(public matchService: MatchService,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public loadingCtrl: LoadingController, public storage: Storage) {
      this.matchDetails = navParams.get('matchDetails');
      this.data = navParams.get('data');      
    console.log(this.data);
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    // console.log(this.matchDetails);
    this.myHttpSubscription = this.matchService.getMatchDetails().subscribe(matchDetailsResponse =>
      {
          this.matchDateDetails = matchDetailsResponse; 
          this.storage.ready().then(() => {
                    let updatedMatches;
                    this.storage.get('matchDetailsResponse').then((matchDetailsResponse) => {
                        updatedMatches =  matchDetailsResponse != null ? matchDetailsResponse :[];
                        updatedMatches = this.matchDateDetails ;
                        this.storage.set('matchDetailsResponse', updatedMatches);
                    });
                });
          this.storage.set('matchDetailsResponse', this.matchDateDetails);
      },
      error => {
          this.errorMessage = <any>error;
      });
      this.visibleBtn = true;
     
  }
  navToBack()
  {
      this.navCtrl.pop(Login);
  }
}
