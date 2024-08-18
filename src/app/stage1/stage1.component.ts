import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-stage1',
  standalone: true,
  imports: [],
  templateUrl: './stage1.component.html',
  styleUrl: './stage1.component.scss'
})
export class Stage1Component {

  order: string = '0123456';
  curOrder: string = '';
  
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

  nextStage() {
    console.log('Next stage');
    this._firestore.setStage(2);
    this._router.navigate(['/stage-2']);
  }
}
