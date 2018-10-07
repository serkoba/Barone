import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntregasComponent } from './edit-entregas.component';

describe('EditEntregasComponent', () => {
  let component: EditEntregasComponent;
  let fixture: ComponentFixture<EditEntregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
