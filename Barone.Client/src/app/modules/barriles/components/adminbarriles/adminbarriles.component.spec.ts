import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbarrilesComponent } from './adminbarriles.component';

describe('AdminbarrilesComponent', () => {
  let component: AdminbarrilesComponent;
  let fixture: ComponentFixture<AdminbarrilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbarrilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbarrilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
