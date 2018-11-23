import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincoccionesComponent } from './admincocciones.component';

describe('AdmincoccionesComponent', () => {
  let component: AdmincoccionesComponent;
  let fixture: ComponentFixture<AdmincoccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincoccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincoccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
