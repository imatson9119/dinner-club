import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { InfoBarComponent } from "../info-bar/info-bar.component";
import { MatRipple, MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-stage1',
  standalone: true,
  imports: [
    FormsModule,
    InfoBarComponent,
    MatRippleModule
],
  templateUrl: './stage1.component.html',
  styleUrl: './stage1.component.scss'
})
export class Stage1Component {

  code = 'feastingtogether';
  color: string = '#fff';

  @ViewChild(MatRipple) 
  ripple: MatRipple | undefined;
  
  @ViewChild('input')
  input: ElementRef | undefined;

  constructor(public _firestore: FirestoreService, public _router: Router) {}

  ngAfterViewInit() {
    this.focusInput();
  }

  onChange() {
    if (!this.input) {
      return;
    }

    const value = this.input.nativeElement.innerText;

    if(value && this.code == value.toLowerCase().replace(/[^a-z]/g, '')){
      this.nextStage();
    }
  }

  focusInput() {
    this.input?.nativeElement.focus();
  }

  nextStage() {
    this.color = '#6f6';
    this.ripple?.launch({centered: true});
  
    setTimeout(() => {
      this._firestore.setStage(2);
      this._router.navigate(['/stage-2']);
    }, 1000);
  }
}
