import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuCoursePopupComponent } from './cu-course-popup.component';

describe('CuCoursePopupComponent', () => {
  let component: CuCoursePopupComponent;
  let fixture: ComponentFixture<CuCoursePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuCoursePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
