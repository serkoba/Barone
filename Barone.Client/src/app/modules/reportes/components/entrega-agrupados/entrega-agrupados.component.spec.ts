import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaAgrupadosComponent } from './entrega-agrupados.component';

describe('EntregaAgrupadosComponent', () => {
  let component: EntregaAgrupadosComponent;
  let fixture: ComponentFixture<EntregaAgrupadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaAgrupadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaAgrupadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
