import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuizComponent } from './dialog-quiz.component';

describe('DialogQuizComponent', () => {
  let component: DialogQuizComponent;
  let fixture: ComponentFixture<DialogQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
