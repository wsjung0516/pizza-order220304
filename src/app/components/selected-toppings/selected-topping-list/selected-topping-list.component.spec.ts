import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedToppingListComponent } from './selected-topping-list.component';

describe('SelectedToppingListComponent', () => {
  let component: SelectedToppingListComponent;
  let fixture: ComponentFixture<SelectedToppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedToppingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedToppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
