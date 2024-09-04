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
  deadline = new Date('2024-09-11T00:00:00Z');
  timeRemaining = this.timeLeft();

  constructor() {
    setInterval(() => {
      this.timeRemaining = this.timeLeft()
  }, 1);
  }

  timeLeft() {
    return Math.round((this.deadline.getTime() - Date.now())/1000);
  }
}
