import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedToppingItemComponent } from './selected-topping-item.component';

describe('SelectedToppingItemComponent', () => {
  let component: SelectedToppingItemComponent;
  let fixture: ComponentFixture<SelectedToppingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedToppingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedToppingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
