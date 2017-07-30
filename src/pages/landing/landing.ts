import { Component } from '@angular/core';
import { Platform, NavController, NavParams, MenuController } from 'ionic-angular';
import { Home } from '../home/home';
import { AdminHome } from '../admin-home/admin-home';
import { AsDbservice } from '../../providers/as-dbservice';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class Landing {

  adminHome:any = AdminHome;
  matchDetails : any;
  liveDetails = "Welcome Admin!!!";
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
    this.navCtrl.push(AdminHome,{data:data})
  }
}