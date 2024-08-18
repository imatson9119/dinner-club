import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Stage0Component } from "./stage0/stage0.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Stage0Component,
],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"dinner-club-e5e7b","appId":"1:976047089094:web:391242c61e5f5f5cd0fec7","storageBucket":"dinner-club-e5e7b.appspot.com","apiKey":"AIzaSyBFWZ3-jkkxK71vreXiweAZq75Yv-sOSg0","authDomain":"dinner-club-e5e7b.firebaseapp.com","messagingSenderId":"976047089094","measurementId":"G-88W0PH962Z"})),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
