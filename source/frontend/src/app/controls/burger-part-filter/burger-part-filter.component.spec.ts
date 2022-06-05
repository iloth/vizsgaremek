import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerPartFilterComponent } from './burger-part-filter.component';

describe('BurgerPartFilterComponent', () => {
  let component: BurgerPartFilterComponent;
  let fixture: ComponentFixture<BurgerPartFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurgerPartFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgerPartFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
