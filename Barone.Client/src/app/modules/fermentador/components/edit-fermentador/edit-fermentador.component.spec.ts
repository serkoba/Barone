import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFermentadorComponent } from './edit-fermentador.component';

describe('EditFermentadorComponent', () => {
  let component: EditFermentadorComponent;
  let fixture: ComponentFixture<EditFermentadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFermentadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFermentadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
