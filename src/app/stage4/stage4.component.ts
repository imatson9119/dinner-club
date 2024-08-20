import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { InfoBarComponent } from "../info-bar/info-bar.component";
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

// Declare webkitSpeechRecognition
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-stage4',
  standalone: true,
  imports: [
    FormsModule,
    InfoBarComponent,
    MatRippleModule,
    CommonModule
],
  templateUrl: './stage4.component.html',
  styleUrl: './stage4.component.scss'
})
export class Stage4Component {

  hasSpeechRecognition = false;
  recognition: any;

  curWords: any = {
    'proven': false,
    'apple': false,
    'spin': false,
    'snake': false,
    'world': false,
    'over': false,
    'recover': false,
    'delete': false
  }
  color: string = '#fff';
  interval: any = undefined;

  @ViewChild(MatRipple) 
  ripple: MatRipple | undefined;
  
  @ViewChild('input')
  input: ElementRef | undefined;

  constructor(public _firestore: FirestoreService, public _router: Router) {
    
  }

  ngAfterViewInit() {
    this.focusInput();

    if ('webkitSpeechRecognition' in window) {
      this.hasSpeechRecognition = true;
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript.toLowerCase();
            for (let word in this.curWords) {
              console.log(transcript);
              if (transcript.includes(word)) {
                this.curWords[word] = true;
              }
            }
          }
        }
        if (Object.values(this.curWords).every((v: any) => v === true)) {
          this.nextStage();
        }
      }
      this.recognition.onspeechend = () => {
        this.recognition.stop();
      };
      this.recognition.start();
      this.interval = setInterval(() => {
        try{
          this.recognition.start();
        } catch(e) {
        }
      }, 1000);
    }
  }

  onChange() {
    if (!this.input) {
      return;
    }

    for (let word in this.curWords) {
      if (this.curWords[word] === true) {
        continue;
      }
      if (!this.input.nativeElement.innerText.includes(word)) {
        return;
      }
    }
    this.nextStage();
  }

  focusInput() {
    this.input?.nativeElement.focus();
  }

  nextStage() {
    clearInterval(this.interval);
    try {
      this.recognition.stop();
    } catch (e) {}
    this.color = '#6f6';
    this.ripple?.launch({centered: true});
  
    setTimeout(() => {
      this._firestore.setStage(5);
      this._router.navigate(['/stage-5']);
    }, 1000);
  }
}
