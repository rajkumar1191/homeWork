import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { AdminHome } from '../pages/admin-home/admin-home';
import {  HttpModule } from '@angular/http';
import { IonicNativePlugin } from '@ionic-native/core';
import { AddHomework } from '../pages/add-homework/add-homework';
import { Landing } from '../pages/landing/landing';
import { ListHomework } from '../pages/list-homework/list-homework';
import { ModalPage } from '../pages/modal/modal';
import { MatchService } from '../pages/home/home.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AsDbservice } from '../providers/as-dbservice';

@NgModule({
  declarations: [
    MyApp,
    Home,
    AdminHome,
    Login,
    AddHomework,
    Landing,
    ListHomework,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement: 'bottom',
        platforms:  {
          android:  {
            tabsPlacement:  'top'
          },
          ios:  {
            tabsPlacement:  'top'
          },
          windows:  {
            tabsPlacement:  'top'
          }
        }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    AdminHome,
    Login,
    AddHomework,
    Landing,
    ListHomework,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MatchService,
    IonicNativePlugin,
    AsDbservice,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
