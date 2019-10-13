import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEstiloComponent } from './producto-estilo.component';

describe('ProductoEstiloComponent', () => {
  let component: ProductoEstiloComponent;
  let fixture: ComponentFixture<ProductoEstiloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoEstiloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoEstiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
