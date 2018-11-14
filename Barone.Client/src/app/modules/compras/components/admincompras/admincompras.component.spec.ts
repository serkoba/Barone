import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincomprasComponent } from './admincompras.component';

describe('AdmincomprasComponent', () => {
  let component: AdmincomprasComponent;
  let fixture: ComponentFixture<AdmincomprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincomprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
