import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { Login } from '../pages/login/login';
import { Landing } from '../pages/landing/landing';
import { Keyboard } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = Login;
  pages: Array<{title: string, component: any}>;
      y: any;
    h: any;
    offsetY: any;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
     if (!this.platform.is('ios') && !this.platform.is('ipad') && !this.platform.is('iphone')) {
        window.addEventListener('native.keyboardshow', this.keyboardShowHandler);
        window.addEventListener('native.keyboardhide', this.keyboardHideHandler);
        window.addEventListener('touchstart', this.tapCoordinates);
      }
    // set our app's pages
  }
   tapCoordinates(e) {
      
      this.y = e.touches[0].clientY;
      this.h = window.innerHeight;
      this.offsetY = (this.h - this.y);

    }

    keyboardShowHandler(e) {
      
      let kH = e.keyboardHeight;
      let bodyMove = <HTMLElement>document.querySelector("ion-app"), bodyMoveStyle = bodyMove.style;
      if (this.offsetY < kH + 40) {
        bodyMoveStyle.bottom = (kH - this.offsetY + 40) + "px";
        bodyMoveStyle.top = "initial";
      }

    }

    keyboardHideHandler() {
      
      let removeStyles = <HTMLElement>document.querySelector("ion-app");
      removeStyles.removeAttribute("style");

    }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
  }
}
