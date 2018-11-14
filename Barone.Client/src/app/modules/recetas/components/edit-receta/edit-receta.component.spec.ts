import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecetaComponent } from './edit-receta.component';

describe('EditRecetaComponent', () => {
  let component: EditRecetaComponent;
  let fixture: ComponentFixture<EditRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
