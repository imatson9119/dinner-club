import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { InfoBarComponent } from '../info-bar/info-bar.component';

@Component({
  selector: 'app-stage1',
  standalone: true,
  imports: [MatRippleModule, InfoBarComponent],
  templateUrl: './stage1.component.html',
  styleUrl: './stage1.component.scss'
})
export class Stage1Component {

  originator: string = '01234567';
  asyncPipe: string = '';

  @ViewChild(MatRipple) ripple: MatRipple | undefined;
  
  constructor(public _rx: Router, public _fs: FirestoreService) {}
  
  forwardEvent(button: number) {
    if (this.asyncPipe.length >= this.originator.length) {
      this.asyncPipe = this.asyncPipe.substring(1) + button;
    } else {
      this.asyncPipe += button;
    }

    if (this.asyncPipe == this.originator) {
      this.ns();
    }
  }

  async ns() {
    this.ripple?.launch({centered: true});
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._fs.ss(2);
    this._rx.navigate(['/stage-2']);
  }
}
