import {Component, Input, OnInit} from '@angular/core';
import {Topping} from "../../../models";

@Component({
  selector: 'selected-topping-list',
  template: `
    <div class="grid grid-cols-2 gap-1" style="width: 250px; height: 150px">
      <ng-container>
        <ng-container *ngFor="let topping of toppings">
          <selected-topping-item [topping]="topping">
          </selected-topping-item>
        </ng-container>
      </ng-container>
      <!--        {{total}}-->
    </div>
  `,
  styles: [`
    .selected-toppings {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    `
  ]
})
export class SelectedToppingListComponent implements OnInit {
  @Input() toppings: Topping[];
  constructor() { }

  ngOnInit(): void {
  }
}
