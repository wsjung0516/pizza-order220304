import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Pizza} from "../../models";

@Component({
  selector: 'pizza-product',
  template: `
    <div class="products">
<!--
      <div class="products__new">
        <button
          style="cursor:pointer"
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </button>
      </div>
      <div class="products__list">
        <ng-container *ngIf="!pizzas.length">
          No pizzas, add one to get started (pizzas$ | async)
        </ng-container>
        <pizza-item *ngFor="let pizza of pizzas"
                    [pizza]="pizza">
        </pizza-item>
      </div>
-->
    </div>\`
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaProductComponent implements OnInit {
  @Input() pizzas: Pizza[];
  constructor() { }

  ngOnInit(): void {
  }

}
