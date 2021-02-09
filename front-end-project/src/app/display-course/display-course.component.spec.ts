import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCourseComponent } from './display-course.component';

describe('DisplayCourseComponent', () => {
  let component: DisplayCourseComponent;
  let fixture: ComponentFixture<DisplayCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
