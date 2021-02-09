import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildQuizComponent } from './build-quiz.component';

describe('BuildQuizComponent', () => {
  let component: BuildQuizComponent;
  let fixture: ComponentFixture<BuildQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
