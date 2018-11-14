import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComprasComponent } from './edit-compras.component';

describe('EditComprasComponent', () => {
  let component: EditComprasComponent;
  let fixture: ComponentFixture<EditComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
