import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrangosComponent } from './adminrangos.component';

describe('AdminrangosComponent', () => {
  let component: AdminrangosComponent;
  let fixture: ComponentFixture<AdminrangosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminrangosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
