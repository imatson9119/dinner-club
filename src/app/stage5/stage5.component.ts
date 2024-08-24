import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { InfoBarComponent } from '../info-bar/info-bar.component';
import { MatRipple, MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-stage5',
  standalone: true,
  imports: [InfoBarComponent, MatRippleModule],
  templateUrl: './stage5.component.html',
  styleUrl: './stage5.component.scss'
})
export class Stage5Component implements AfterViewInit {

  @ViewChild(MatRipple) ripple: MatRipple | undefined;
  
  phrase = 'wow-you-are-really-good-at-this';

  constructor(private _router: Router, private _firestore: FirestoreService) {}

  ngAfterViewInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const phrase = urlParams.get('phrase');
    if (phrase && phrase === this.phrase) {
      this.nextStage();
    }
  }

  async nextStage() {
    this.ripple?.launch({centered: true});
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._firestore.setStage(6);
    this._router.navigate(['/stage-6']);
  }
}
