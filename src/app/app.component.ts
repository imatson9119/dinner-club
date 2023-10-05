import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dinner-club';
  timeRemaining = new Date().getTime() 
  dropDate = new Date(2023,9,21,0,0,0).getTime()
  // dropDate = new Date(2023,9,5,17,55,0).getTime()
  
    constructor() {
        setInterval(() => {
          let now = new Date().getTime();
          this.timeRemaining = this.dropDate - now
        }, 1);
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
}
