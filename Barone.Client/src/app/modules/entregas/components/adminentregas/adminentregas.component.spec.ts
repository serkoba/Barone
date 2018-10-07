import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminentregasComponent } from './adminentregas.component';

describe('AdminentregasComponent', () => {
  let component: AdminentregasComponent;
  let fixture: ComponentFixture<AdminentregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminentregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminentregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
