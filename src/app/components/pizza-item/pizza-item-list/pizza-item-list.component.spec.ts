import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaItemListComponent } from './pizza-item-list.component';

describe('PizzaItemListComponent', () => {
  let component: PizzaItemListComponent;
  let fixture: ComponentFixture<PizzaItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
