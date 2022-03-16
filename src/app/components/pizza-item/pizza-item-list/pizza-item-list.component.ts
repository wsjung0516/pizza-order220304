import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pizza} from "../../../models";

@Component({
  selector: 'pizza-item-list',
  template: `
    <div class="flex flex-wrap -m-1">
      <div class="xl:w-1/2 md:w-1/1 p-2" *ngFor="let pizza of pizzas"
           [select_pizza]="pizza"
           [selectedPizza]="selectedPizza"
           (selectPizza)="onSelectPizza($event)">
        <pizza-item [pizza]="pizza" (selected)="selected.emit(pizza)"></pizza-item>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PizzaItemListComponent implements OnInit {
  @Input() pizzas: Pizza[];
  @Output() selected = new EventEmitter<Pizza>();
  constructor() { }
  selectedPizza: Pizza;
  ngOnInit(): void {
  }
  onSelectPizza(ev: any) {
    this.selectedPizza = ev;
    // console.log('pizza-2', ev)
  }
}
