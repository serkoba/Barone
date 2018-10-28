import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasReportesComponent } from './entregas-reportes.component';

describe('EntregasReportesComponent', () => {
  let component: EntregasReportesComponent;
  let fixture: ComponentFixture<EntregasReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
