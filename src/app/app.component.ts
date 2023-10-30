import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dinner-club';
  timeRemaining = 0;
  now = new Date().getTime()
  drops = [
    new Date(2023,9,7,19,5,0).getTime(),
    new Date(2023,9,8,8,0,0).getTime(),
    new Date(2023,9,9,8,0,0).getTime(),
    new Date(2023,9,10,8,0,0).getTime(),
    new Date(2023,9,21,8,0,0).getTime(),
    new Date(2023,9,21,18,5,0).getTime(),
  ]
  drop_timer_texts = [
    "Date / Time Revealed In:",
    "Description Revealed In:",
    "Hosts Revealed In",
    "Price / RSVP Revealed In:",
    "Location Revealed In:",
    "Event Starts In:"
  ]


  
    constructor(public _authService: AuthService) {
        setInterval(() => {
            this.now = new Date().getTime()
            this.timeRemaining = this.getTimeToNextDrop()
        }, 1);
    }

    dropped(i){
      if(i > this.drops.length || i < 0){
        return false;
      }
      return this.drops[i] - new Date().getTime() < 1000
    } 

    getDropNumber(){
      for(let i = 0; i < this.drops.length; i++){
        let timeRemaining = this.drops[i] - new Date().getTime()
        if(timeRemaining >= 1000){
          return i;
        }
      }
      return -1;
    }

    getTimeToNextDrop() {
      for(let i = 0; i < this.drops.length; i++){
        let timeRemaining = this.drops[i] - new Date().getTime()
        if(timeRemaining >= 1000){
          return timeRemaining;
        }
      }
      return -1;
    }

    getDateString(distance){
      let build = ""
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if(days === 1){
        build += days + " day, "
      } else if(days >= 1) {
        build += days + " days, "
      }
      if(hours === 1){
        build += hours + " hour, "
      } else if(hours >= 1  || !(days >= 0)) {
        build += hours + " hours, "
      }
      if(minutes === 1){
        build += minutes + " minute and "
      } else if(minutes >= 1 || !(hours >= 0 && days >= 0)) {
        build += minutes + " minutes and "
      }
      if(seconds === 1){
        build += seconds + " second "
      } else {
        build += seconds + " seconds "
      }
      return build
    }

    randomInt(high,low) {
      return Math.floor(Math.random() * (high-low) + low)
    }

    getRandomSentence(){
      let words = ["what", "underground", "HUGE", "cancel", "Subscribe", "toy", "I", "thinking", "dinner"]
      let build = ""
      let nWords = this.randomInt(5,10)
      for(let i = 0; i < nWords; i++){
        build += words[this.randomInt(0,words.length-1)] + " "
      }
      return build;
    }
}
