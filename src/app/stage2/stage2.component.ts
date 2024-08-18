import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-stage2',
  standalone: true,
  imports: [],
  templateUrl: './stage2.component.html',
  styleUrl: './stage2.component.scss'
})
export class Stage2Component implements AfterViewInit {

  phrase = 'test';

  constructor(private _router: Router, private _firestore: FirestoreService) {}

  ngAfterViewInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.href);
    const phrase = urlParams.get('phrase');
    console.log('Phrase:', phrase);
    if (phrase && phrase === this.phrase) {
      // Set stage to 3
      this.nextStage();
    }
  }

  async nextStage() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    this._firestore.setStage(3);
    this._router.navigate(['/stage-3']);
  }
}
