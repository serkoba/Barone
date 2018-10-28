import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosReportesComponent } from './pedidos-reportes.component';

describe('PedidosReportesComponent', () => {
  let component: PedidosReportesComponent;
  let fixture: ComponentFixture<PedidosReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
