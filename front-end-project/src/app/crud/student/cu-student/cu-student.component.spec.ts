import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuStudentComponent } from './cu-student.component';

describe('CuStudentComponent', () => {
  let component: CuStudentComponent;
  let fixture: ComponentFixture<CuStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
