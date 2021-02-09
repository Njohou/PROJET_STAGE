import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudStudentComponent } from './crud-student.component';

describe('CrudStudentComponent', () => {
  let component: CrudStudentComponent;
  let fixture: ComponentFixture<CrudStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
