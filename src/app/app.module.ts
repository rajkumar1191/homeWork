import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import {  HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { IonicNativePlugin } from '@ionic-native/core';
import { MatchFixtures } from '../pages/match-fixtures/match-fixtures';
import { Landing } from '../pages/landing/landing';
import { MatchResult } from '../pages/match-result/match-result';
import { MatchService } from '../pages/home/home.service';
import { MatchResultService } from '../pages/match-result/match-result.service';
import { LiveDataService } from '../pages/login/live.service';
import { CodePush } from '@ionic-native/code-push';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Login,
    MatchFixtures,
    Landing,
    MatchResult
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
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
    Login,
    MatchFixtures,
    Landing,
    MatchResult
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MatchService,
    MatchResultService,
    LiveDataService,
    CodePush,
    IonicNativePlugin,
    // StreamingMedia,
    // YoutubeVideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
