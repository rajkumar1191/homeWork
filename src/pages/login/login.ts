import { Component } from '@angular/core';
import { Platform, NavController, NavParams, MenuController } from 'ionic-angular';
import { Home } from '../home/home';
import { AsDbservice } from '../../providers/as-dbservice';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private platform: Platform, public asDbservice: AsDbservice) {
        this.menuCtrl.enable(true);
        this.asDbservice.initializeDataService();
  }
  
  ngOnDestroy()
  {

  }        
  ionViewDidLoad() {
  }
  // tapEvent(e) {
  //   this.tap++
  //   if(this.tap == 5)
  //   {
  //     this.navCtrl.push(Landing);
  //   }
  // }
  pageNav(m)
  {
    let data='';
    if(m =='h')
    {
      data='Home Work';
    }
    else if(m =='e')
    {
      data='Events';
    }
    else if(m =='n')
    {
      data='News';
    }
    else{
      data='Feedback';
    }
    console.log(data);
    this.navCtrl.push(Home,{data:data})
  }
}
