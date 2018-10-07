import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPagosComponent } from './edit-pagos.component';

describe('EditPagosComponent', () => {
  let component: EditPagosComponent;
  let fixture: ComponentFixture<EditPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
