import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerPrintComponent } from './answer-print.component';

describe('AnswerPrintComponent', () => {
  let component: AnswerPrintComponent;
  let fixture: ComponentFixture<AnswerPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
