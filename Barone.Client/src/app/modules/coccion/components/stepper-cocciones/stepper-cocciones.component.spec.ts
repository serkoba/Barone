import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperCoccionesComponent } from './stepper-cocciones.component';

describe('StepperCoccionesComponent', () => {
  let component: StepperCoccionesComponent;
  let fixture: ComponentFixture<StepperCoccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperCoccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperCoccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
