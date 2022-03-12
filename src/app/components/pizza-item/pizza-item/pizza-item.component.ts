import {Component, Input, OnInit} from '@angular/core';
import {Topping} from "../../../models";

@Component({
  selector: 'pizza-item',
  template: `
    <div class="pizza-item">
      <ng-container>
        <a [routerLink]="['/products', id]">
          <pizza-display
            [toppings]="nToppings">
          </pizza-display>
        </a>
        <div style="color: darkred" class="flex justify-center">
          <h3>{{ name }}</h3>
        </div>

      </ng-container>
    </div>
  `,
  styles: [
  ]
})
export class PizzaItemComponent implements OnInit {
  name: string;
  nToppings!: Topping[];
  id: number;
  @Input() set pizza(v: any) {
    console.log(' pizza-item.component, pizza',v)
    this.nToppings = v.toppings;
    this.name = v.name;
    this.id = v.id;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
