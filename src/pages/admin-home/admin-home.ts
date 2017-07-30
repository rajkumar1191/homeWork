import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { ListHomework } from '../list-homework/list-homework';
import { Landing } from '../landing/landing';
import { AddHomework } from '../add-homework/add-homework';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHome {
  tab2Root = ListHomework;
  tab1Root = AddHomework;
  tab3Root = Landing;
  error: any;
  data:any;
  matchDetails : any;
  errorMessage:any;
  myHttpSubscription = null;
  matchDateDetails1:any;
  matchDateDetails:any;
  visibleBtn = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public loadingCtrl: LoadingController, public storage: Storage) {
      this.matchDetails = navParams.get('matchDetails');
      this.data = navParams.get('data');      
    console.log(this.data);
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
      this.visibleBtn = true;
  }
  navToBack()
  {
      this.navCtrl.pop();
  }
}