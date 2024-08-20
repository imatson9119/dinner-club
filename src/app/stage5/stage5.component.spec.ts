import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage5Component } from './stage5.component';

describe('Stage5Component', () => {
  let component: Stage5Component;
  let fixture: ComponentFixture<Stage5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stage5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
