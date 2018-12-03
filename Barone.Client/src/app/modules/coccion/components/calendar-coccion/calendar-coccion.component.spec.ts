import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCoccionComponent } from './calendar-coccion.component';

describe('CalendarCoccionComponent', () => {
  let component: CalendarCoccionComponent;
  let fixture: ComponentFixture<CalendarCoccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCoccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCoccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
