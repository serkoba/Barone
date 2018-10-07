import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrilesEstiloComponent } from './barriles-estilo.component';

describe('BarrilesEstiloComponent', () => {
  let component: BarrilesEstiloComponent;
  let fixture: ComponentFixture<BarrilesEstiloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrilesEstiloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrilesEstiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
