import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperCocciones2Component } from './stepper-cocciones2.component';

describe('StepperCocciones2Component', () => {
  let component: StepperCocciones2Component;
  let fixture: ComponentFixture<StepperCocciones2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperCocciones2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperCocciones2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
