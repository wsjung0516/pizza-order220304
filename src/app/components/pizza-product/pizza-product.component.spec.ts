import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaProductComponent } from './pizza-product.component';

describe('PizzaProductComponent', () => {
  let component: PizzaProductComponent;
  let fixture: ComponentFixture<PizzaProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
