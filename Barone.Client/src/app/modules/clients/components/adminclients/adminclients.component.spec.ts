import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminclientsComponent } from './adminclients.component';

describe('AdminclientsComponent', () => {
  let component: AdminclientsComponent;
  let fixture: ComponentFixture<AdminclientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminclientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
