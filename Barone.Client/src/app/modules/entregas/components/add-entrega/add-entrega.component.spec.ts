import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntregaComponent } from './add-entrega.component';

describe('AddEntregaComponent', () => {
  let component: AddEntregaComponent;
  let fixture: ComponentFixture<AddEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
