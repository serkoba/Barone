import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProdComponent } from './grid-prod.component';

describe('GridProdComponent', () => {
  let component: GridProdComponent;
  let fixture: ComponentFixture<GridProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
