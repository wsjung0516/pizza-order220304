import {Component, Input, OnInit} from '@angular/core';
import {Pizza} from "../../../models";

@Component({
  selector: 'pizza-item-list',
  template: `
    <div class="flex flex-wrap -m-1">
      <div class="xl:w-1/2 md:w-1/1 p-2" *ngFor="let pizza of pizzas">
        <pizza-item [pizza]="pizza"></pizza-item>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PizzaItemListComponent implements OnInit {
  @Input() pizzas: Pizza[];
  constructor() { }

  ngOnInit(): void {
  }

}
