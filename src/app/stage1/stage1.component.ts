import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { MatRipple, MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-stage1',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './stage1.component.html',
  styleUrl: './stage1.component.scss'
})
export class Stage1Component {

  order: string = '01234567';
  curOrder: string = '';

  @ViewChild(MatRipple) ripple: MatRipple | undefined;
  
  constructor(public _router: Router, public _firestore: FirestoreService) {}
  
  clicked(button: number) {
    if (this.curOrder.length >= this.order.length) {
      this.curOrder = this.curOrder.substring(1) + button;
    } else {
      this.curOrder += button;
    }

    if (this.curOrder == this.order) {
      this.nextStage();
    }
    console.log('Current order:', this.curOrder);
  }

  async nextStage() {
    this.ripple?.launch({centered: true});
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._firestore.setStage(2);
    this._router.navigate(['/stage-2']);
  }
}
