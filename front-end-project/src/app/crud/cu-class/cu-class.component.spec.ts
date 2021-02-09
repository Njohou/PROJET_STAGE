import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuClassComponent } from './cu-class.component';

describe('CuClassComponent', () => {
  let component: CuClassComponent;
  let fixture: ComponentFixture<CuClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
