import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteClassComponent } from './note-class.component';

describe('NoteClasseComponent', () => {
  let component: NoteClassComponent;
  let fixture: ComponentFixture<NoteClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
