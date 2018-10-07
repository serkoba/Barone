import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminestilosComponent } from './adminestilos.component';

describe('AdminestilosComponent', () => {
  let component: AdminestilosComponent;
  let fixture: ComponentFixture<AdminestilosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminestilosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminestilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
