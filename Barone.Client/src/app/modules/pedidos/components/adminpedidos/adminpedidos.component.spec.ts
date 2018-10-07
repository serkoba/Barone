import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpedidosComponent } from './adminpedidos.component';

describe('AdminpedidosComponent', () => {
  let component: AdminpedidosComponent;
  let fixture: ComponentFixture<AdminpedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
