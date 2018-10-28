import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrilesTotalesComponent } from './barriles-totales.component';

describe('BarrilesTotalesComponent', () => {
  let component: BarrilesTotalesComponent;
  let fixture: ComponentFixture<BarrilesTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrilesTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrilesTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
