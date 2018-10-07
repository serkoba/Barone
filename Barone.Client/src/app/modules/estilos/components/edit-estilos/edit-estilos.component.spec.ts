import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstilosComponent } from './edit-estilos.component';

describe('EditEstilosComponent', () => {
  let component: EditEstilosComponent;
  let fixture: ComponentFixture<EditEstilosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEstilosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
