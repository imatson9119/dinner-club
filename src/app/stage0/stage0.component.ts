import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { InfoBarComponent } from "../info-bar/info-bar.component";
import { MatRipple, MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-stage0',
  standalone: true,
  imports: [
    FormsModule,
    InfoBarComponent,
    MatRippleModule
],
  templateUrl: './stage0.component.html',
  styleUrl: './stage0.component.scss'
})
export class Stage0Component {

  a = 'u';
  b = 'c';
  c = 'o';
  d = 'r';
  e = 'e';
  f = 'h';
  g = 't';
  h = 'a';
  i = 's';
  x = 'crustacean';
  color: string = '#fff';


  @ViewChild(MatRipple) 
  ripple: MatRipple | undefined;
  
  @ViewChild('input')
  input: ElementRef | undefined;

  constructor(public _firestore: FirestoreService, public _router: Router) {
    this.a = 's';
    this.b = 'o';
    this.c = 'r';
    this.d = 'c';
    this.i = 'u';
    this.x = this.d + this.f + this.i + this.c + this.d + this.f + this.h + this.g + this.g + this.f + this.e + this.d + this.c + this.b + this.a + this.a
  }

  ngOnViewInit() {
    this.focusInput();
  }

  onChange() {  
    console.log(this.x)
    if (!this.input) {
      return;
    }

    const value = this.input.nativeElement.innerText;

    if(value && this.x === value.toLowerCase().replace(/[^a-z]/g, '')){
      this.ns();
    }
  }

  focusInput() {
    this.input?.nativeElement.focus();
  }

  ns() {
    this.color = '#6f6';
    this.ripple?.launch({centered: true});
  
    setTimeout(() => {
      this._firestore.ss(1);
      this._router.navigate(['/stage-1']);
    }, 1000);
  }
}
