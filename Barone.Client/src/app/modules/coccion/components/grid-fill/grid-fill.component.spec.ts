import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { gridFillComponent } from './grid-fill.component';



describe('gridFillComponent', () => {
  let component: gridFillComponent;
  let fixture: ComponentFixture<gridFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [gridFillComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(gridFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
