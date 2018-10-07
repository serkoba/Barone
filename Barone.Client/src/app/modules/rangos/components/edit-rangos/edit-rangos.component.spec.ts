import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRangosComponent } from './edit-rangos.component';

describe('EditRangosComponent', () => {
  let component: EditRangosComponent;
  let fixture: ComponentFixture<EditRangosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRangosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
