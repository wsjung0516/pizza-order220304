import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Pizza, Topping} from "../../models";

@Component({
  selector: 'main-panel',
  template: `
    <div class="grid grid-cols-2 m-1 ">
      <section class="h-auto  border-4  border-green-300 p-3">
        <pizza-form
          [pizza]="pizza"
          [nToppings]="nToppings"
          (addToppings)="addToppings($event)"
          (create)="onCreate($event)"
          (update)="onUpdate($event)"
          (remove)="onRemove($event)"
          >
          <pizza-display [toppings]="toppings"></pizza-display>
        </pizza-form>
      </section>
      <section class="text-gray-600 body-font h-32">
        <div class="container px-5 py-1 mx-auto overflow-y-auto h-screen">
            <pizza-item-list [pizzas]="pizzas"></pizza-item-list>
        </div>
      </section>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPanelComponent implements OnInit {
  @Input() pizzas: Pizza[];
  @Input() pizza: Pizza;
  @Input() toppings: Topping[];
  @Input() nToppings: Topping[];
  constructor( private cdr: ChangeDetectorRef) { }
  onCreate(pizza: Pizza) {

  }
  onUpdate(pizza: Pizza) {

  }
  onRemove(pizza: Pizza) {

  }
  addToppings( ev: any) {

  }
  ngOnInit(): void {
  }
}
