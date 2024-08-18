import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stage0',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './stage0.component.html',
  styleUrl: './stage0.component.scss'
})
export class Stage0Component {

  code = 'churchatthecross';

  @ViewChild('input')
  input: ElementRef | undefined;

  ngOnViewInit() {
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
    console.log('Next stage');
  }
}
