import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizHistoricComponent } from './quiz-historic.component';

describe('QuizHistoricComponent', () => {
  let component: QuizHistoricComponent;
  let fixture: ComponentFixture<QuizHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
