import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfermentadorComponent } from './adminfermentador.component';

describe('AdminfermentadorComponent', () => {
  let component: AdminfermentadorComponent;
  let fixture: ComponentFixture<AdminfermentadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfermentadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfermentadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
