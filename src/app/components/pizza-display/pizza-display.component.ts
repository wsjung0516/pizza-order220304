import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ToppingImageService} from "../../services/topping-image.service";

export const DROP_ANIMATION = trigger("drop", [
  transition(":enter", [
    style({transform: "translateY(-200px)", opacity: 0}),
    animate(
      "300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)",
      style({transform: "translateY(0)", opacity: 1})
    )
  ]),
  transition(":leave", [
    style({transform: "translateY(0)", opacity: 1}),
    animate(
      "200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)",
      style({transform: "translateY(-200px)", opacity: 0})
    )
  ])
]);

@Component({
  selector: 'pizza-display',
  template: `
    <div class="pizza-display">
      <div class="pizza-display__base">
        <div class="flex justify-center">
            <img src="assets/img/pizza.svg">
        </div>
        <img  *ngFor="let topping of nToppings; index as i;"
          src="assets/img/toppings/multi/{{ topping.image }}.svg"
          [style.zIndex]="i"
          class="pizza-display__topping"
          @drop>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .pizza-display {
      background: #f5f5f5;
      border-radius: 4px;
      padding: 15px 0;
    }
    .pizza-display__base {
      position: relative;
      text-align: center;
    }
    .pizza-display__topping {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
    }
  `
  ],
  animations:[DROP_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDisplayComponent implements OnInit {
  @Input() set toppings(v: any) {
    // console.log(' PizzaDisplayComponent toppings', this.nToppings, v);
    this.nToppings = this.toppingImageService.setEachToppingImage(v);
  };
  nToppings: any[];

  constructor(private toppingImageService: ToppingImageService) { }

  ngOnInit(): void {
  }

}
