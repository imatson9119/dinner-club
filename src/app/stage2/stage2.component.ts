import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { InfoBarComponent } from '../info-bar/info-bar.component';
import { MatRipple, MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-stage2',
  standalone: true,
  imports: [InfoBarComponent, MatRippleModule],
  templateUrl: './stage2.component.html',
  styleUrl: './stage2.component.scss'
})
export class Stage2Component implements AfterViewInit {

  @ViewChild(MatRipple) ripple: MatRipple | undefined;
  
  phrase = 'test';

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
    this._firestore.setStage(3);
    this._router.navigate(['/stage-3']);
  }
}
