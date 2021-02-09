import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditorUpdateComponent } from './course-editor-update.component';

describe('CourseEditorUpdateComponent', () => {
  let component: CourseEditorUpdateComponent;
  let fixture: ComponentFixture<CourseEditorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
