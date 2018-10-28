import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCuentaReporteComponent } from './estado-cuenta-reporte.component';

describe('EstadoCuentaReporteComponent', () => {
  let component: EstadoCuentaReporteComponent;
  let fixture: ComponentFixture<EstadoCuentaReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoCuentaReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCuentaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
