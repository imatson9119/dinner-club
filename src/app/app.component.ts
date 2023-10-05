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
  
    constructor() {
        setInterval(() => {
          let now = new Date().getTime();
          this.timeRemaining = this.dropDate - now
        }, 1);
    }

    getDateString(distance){
      let build = ""
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      build += days
      build = days == 1 ? build + " days " : build + " day "
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      build += hours
      build = hours == 1 ? build + " hours " : build + " hour "
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      build += minutes
      build = minutes == 1 ? build + " minutes " : build + " minute "
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      build += seconds
      build = seconds == 1 ? build + " seconds" : build + " second"
      return build
    }
}
