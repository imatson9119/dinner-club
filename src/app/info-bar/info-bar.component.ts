import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-bar',
  standalone: true,
  imports: [],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.scss'
})
export class InfoBarComponent {

  @Input() stage: number = 0;

  // Deadline in CST: September 10, 2024
  deadline = this.getCSTDate('2024-09-10T00:00:00Z');
  timeRemaining = this.timeLeft();

  constructor() {
    setInterval(() => {
      this.timeRemaining = this.timeLeft()
  }, 1);
  }

  getCSTDate(dateString: string): Date {
    const date = new Date(dateString);
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
    const cstOffset = -6 * 60 * 60000; // CST is UTC-6
    return new Date(utcTime + cstOffset);
  }

  timeLeft() {
    return Math.round((this.deadline.getTime() - Date.now())/1000);
  }
}
