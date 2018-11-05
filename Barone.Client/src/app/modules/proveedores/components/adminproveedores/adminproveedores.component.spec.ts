import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproveedoresComponent } from './adminproveedores.component';

describe('AdminproveedoresComponent', () => {
  let component: AdminproveedoresComponent;
  let fixture: ComponentFixture<AdminproveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
