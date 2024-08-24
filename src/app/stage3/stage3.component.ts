import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { InfoBarComponent } from '../info-bar/info-bar.component';
import { MatRipple, MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-stage3',
  standalone: true,
  imports: [InfoBarComponent, MatRippleModule],
  templateUrl: './stage3.component.html',
  styleUrl: './stage3.component.scss'
})
export class Stage3Component implements AfterViewInit {

  @ViewChild(MatRipple) ripple: MatRipple | undefined;
  
  phrase = 'wow-good-job-didnt-think-youd-get-this-far';

  constructor(private _router: Router, private _firestore: FirestoreService) {}

  ngAfterViewInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const phrase = urlParams.get('phrase');
    if (phrase && phrase === this.phrase) {
      // Set stage to 3
      this.nextStage();
    }
  }

  async nextStage() {
    this.ripple?.launch({centered: true});
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._firestore.setStage(4);
    this._router.navigate(['/stage-4']);
  }
}
