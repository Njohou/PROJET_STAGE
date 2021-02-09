import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuTeacherComponent } from './cu-teacher.component';

describe('CuTeacherComponent', () => {
  let component: CuTeacherComponent;
  let fixture: ComponentFixture<CuTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
