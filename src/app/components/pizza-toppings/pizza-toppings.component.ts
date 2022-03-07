import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pizza, Topping} from "../../models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'pizza-toppings',
  template: `
      <div class="pizza-toppings" >
         <ng-container *ngFor="let topping of toppings;">
             <div  class="pizza-toppings-item" (click)="addTopping(topping)" style="text-align: justify-all"
                 [class.active]="isExistInToppings(topping)">
                <img src="assets/img/toppings/singles/{{ topping.name }}.svg">
                 {{ topping.name }}<div class="topping_price" >{{topping.price && topping.price * 1000}}원</div>
             </div>
          </ng-container>
      </div>
  `,

  styles: [`
    :host {
      display: block;
    }

    .pizza-toppings {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .pizza-toppings-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: left;
      padding: 8px;
      margin: 0 0 10px;
      border-radius: 4px;
      font-size: 15px;
      font-family: 'cornerstone';
      border: 1px solid grey;
      flex: 0 0 23%;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .pizza-toppings-item div.topping_price {
      position: absolute;
      color: blue;
      right: 10px;
    }

    .pizza-toppings-item.active {
      background: #f5f5f5;
    }

    .pizza-toppings-item.active:after {
      content: '';
      border-radius: 50%;
      background: #19b55f url('/src/assets/img/actions/checked.svg') no-repeat center center;
      width: 16px;
      height: 16px;
      position: absolute;
      top: -5px;
      right: -5px;
      background-size: 10px;
    }

    .pizza-toppings-item.fulled {
      background: aqua;
    }

    .pizza-toppings-item img {
      width: 22px;
      margin: 0 10px 0 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaToppingsComponent implements OnInit {
  @Input() toppings: Topping[];
  @Output() selected = new EventEmitter<Topping[]>();
  topp: Topping[] = [];
  pizzaId: number;
  pizza: Pizza;
  snackBar: MatSnackBar;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  /** 토핑을 추가하는 부분 토핑은 5회까지 만 선택하게 제한함 */
  addTopping( topping: Topping) {
    let count = Array.from(this.topp).filter( val=> val.id === topping.id);
    if( count.length >= 5) { // addTopping add each topping util each count 5
      this.snackBar.open("Limited to 5 toppings level", 'Check!!', {duration:3000});
      return;
    }
    this.topp = [...this.topp, topping];
    console.log('--- this.topp', this.topp, this.topp.length, topping)
    // this.topp = [...this.topp, topping];
    // this.writeValue(this.value)
    /** Parent component로 데이터를 전달하는 부분 */
    this.selected.emit(this.topp);
    // this._onChange(this.topp);

  }
  isExistInToppings( topping: Topping) {
    /** 이미 선택된 토핑인지 판다하여 메뉴에 체크 표시를 함*/
    return Array.from(this.topp).some(val => val.id === topping.id);
  }
}
