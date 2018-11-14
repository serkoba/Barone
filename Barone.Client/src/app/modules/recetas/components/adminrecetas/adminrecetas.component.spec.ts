import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrecetasComponent } from './adminrecetas.component';

describe('AdminrecetasComponent', () => {
  let component: AdminrecetasComponent;
  let fixture: ComponentFixture<AdminrecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminrecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
