import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoccionComponent } from './edit-coccion.component';

describe('EditCoccionComponent', () => {
  let component: EditCoccionComponent;
  let fixture: ComponentFixture<EditCoccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
