import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerPartsComponent } from './burger-parts.component';

describe('BurgerPartsComponent', () => {
  let component: BurgerPartsComponent;
  let fixture: ComponentFixture<BurgerPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurgerPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgerPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
