import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproductosComponent } from './adminproductos.component';

describe('AdminproductosComponent', () => {
  let component: AdminproductosComponent;
  let fixture: ComponentFixture<AdminproductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
