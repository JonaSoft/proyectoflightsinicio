import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenaiceComponent } from './mantenaice.component';

describe('MantenaiceComponent', () => {
  let component: MantenaiceComponent;
  let fixture: ComponentFixture<MantenaiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenaiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenaiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
