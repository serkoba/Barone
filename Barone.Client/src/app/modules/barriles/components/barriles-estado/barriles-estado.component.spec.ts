import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrilesEstadoComponent } from './barriles-estado.component';

describe('BarrilesEstadoComponent', () => {
  let component: BarrilesEstadoComponent;
  let fixture: ComponentFixture<BarrilesEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrilesEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrilesEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
