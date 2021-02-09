import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCrudComponent } from './course-crud.component';

describe('CourseCrudComponent', () => {
  let component: CourseCrudComponent;
  let fixture: ComponentFixture<CourseCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
