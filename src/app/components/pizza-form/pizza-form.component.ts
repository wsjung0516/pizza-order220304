import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Pizza, Topping} from "../../models";

@Component({
  selector: 'pizza-form',
  template: `
    <div class="pizza-form">
      <pizza-name
        [price] = 'pizzaPrice'
        (name)="onInputName($event)"
        (isInvalid) = onIsInvalid($event)
      >
      </pizza-name>
        <!-- Angular CDK Overlay를 표시하기 위한 Anchor point, 선태된 토핑에 대한 Count를
         표시하기 위함 selected-item.service.ts와 관련이 있음 -->
        <ng-container>
          <div style="float: left" #subTotal></div>
        </ng-container>
        <div class="m-10 w-auto h-auto">
            <!-- Pizza display   -->
            <ng-content></ng-content>
        </div>

        <label>
          <div class="text-xl">Select toppings</div>
        </label>
        <div class="">
          <!-- 선택할 토핑 메뉴. <pizza-toppings>에서 ControlValueAccess 를 구현함-->
          <pizza-toppings
            [toppings]="toppings"
            (selected)="onSelectedToppings($event)">
          </pizza-toppings>
        </div>

        <div class="">
            <app-buttons></app-buttons>
        </div>
    </div>
  `,
  styles: [`
    .pizza-form__list {
      margin: -20px 0 0;
    }

    .pizza-form ::ng-deep pizza-display {
      margin: 0 0 35px;
    }

    .pizza-form label {
      margin: 0 0 35px;
      display: block;
    }

    .pizza-form label h4 {
      margin: 0 0 15px;
    }

    .pizza-form__error {
      padding: 10px;
      border-radius: 0 0 4px 4px;
      display: flex;
      align-items: center;
      background: #aa141b;
      color: #fff;
    }

    .pizza-form__error p {
      font-size: 14px;
      margin: 0;
    }

  `]
})
export class PizzaFormComponent implements OnInit {
  pizzaPrice:string;
  _isInvalid: boolean;
  _name: string
  exists = false;
  @ViewChild('subTotal', {static:false}) selected_origin: any;

  @Input() pizza: Pizza;
  @Input() toppings : Topping[];
  @Output() selectedToppings = new EventEmitter<Topping[]>();
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();
  constructor(

  ) { }

  ngOnInit(): void {
  }
  onInputName(ev: string) {
    this._name = ev;
  }
  onIsInvalid(ev: boolean) {
    this._isInvalid = ev;
  }
  onSelectedToppings(ev: Topping[]) {

  }
}
