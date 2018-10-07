import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBarrilesComponent } from './edit-barriles.component';

describe('EditBarrilesComponent', () => {
  let component: EditBarrilesComponent;
  let fixture: ComponentFixture<EditBarrilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBarrilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBarrilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
