import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininsumosComponent } from './admininsumos.component';

describe('AdmininsumosComponent', () => {
  let component: AdmininsumosComponent;
  let fixture: ComponentFixture<AdmininsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmininsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmininsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
