import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTeacherComponent } from './crud-teacher.component';

describe('CrudTeacherComponent', () => {
  let component: CrudTeacherComponent;
  let fixture: ComponentFixture<CrudTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
