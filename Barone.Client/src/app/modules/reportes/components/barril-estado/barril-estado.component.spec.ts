import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrilEstadoComponent } from './barril-estado.component';

describe('BarrilEstadoComponent', () => {
  let component: BarrilEstadoComponent;
  let fixture: ComponentFixture<BarrilEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrilEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrilEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
