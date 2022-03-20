/**
 * 토핑의 종류를 표시하는 부분
 *  pizza-form component에서 child로 호출됨,
 *  perent component에서 reactive form control을 적용하였으므로,
 *  이 component에서 ControlValueAccessor interface를 적용함.
 *
 * */


import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter, forwardRef,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {Pizza, Topping} from "../../models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {filter, skip, switchMap, take, takeLast, takeUntil, tap, toArray} from "rxjs/operators";
import {Select} from "@ngxs/store";
import {PizzasState, ToppingsState} from "../../state";
import {Observable, Subject, from} from "rxjs";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ToppingImageService} from "../../services/topping-image.service";
const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true,
};

@Component({
  selector: 'pizza-toppings',
  template: `
    <div class="pizza-toppings">
      <ng-container *ngFor="let topping of toppings;">
        <div class="">
          <div class="w-40 min-w-full md:min-w-0">
            <div class="pizza-toppings-item" (click)="addTopping(topping)" style="text-align: justify-all"
                 matBadge="{{displayToppingCount(topping)}}" >
              <img src="assets/img/toppings/singles/{{ topping.name }}.svg">
              {{ topping.name }}
              <div class="topping_price">{{topping.price && topping.price * 1000}}원</div>
            </div>
          </div>
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
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaToppingsComponent implements OnInit, OnDestroy {
  @Input() toppings: Topping[];
  // @Select(PizzasState.pizzas) pizza$: Observable<Pizza>;

  topp: Topping[] = [];
  pizzaId: number | undefined;
  pizza: Pizza | undefined;
  private onTouch: Function = ()=>{};
  // private onTouch: Function;
  private _onChange: Function = ()=>{};
  // price:string;
  // snackBar: MatSnackBar;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  @Select(PizzasState.SelectedPizza) pizza$: Observable<Pizza> | undefined;
  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]> | undefined;
  @Select(ToppingsState.selectedToppings ) selectedToppings$: Observable<any[]> | undefined;

  constructor( // private store: Store,
               private toppingImages: ToppingImageService,
               // private snackBar: MatSnackBar,
               private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    /**
     * Save the result of selected toppings
     * */
    this.selectedToppings$.pipe(
      filter(val => !!val ),
      tap(val => {
        this.topp = val;
        this.ref.markForCheck();
      })
    ).subscribe();

  }
  registerOnChange(fn: (_:any)=> void) {
    this._onChange = fn;
  }
  registerOnTouched(fn: (_:any) => void) {
    this.onTouch = fn;
  }
  writeValue(value: any) {
    this.topp = value;
  }

  /** 토핑을 추가하는 부분 토핑은 5회까지 만 선택하게 제한함 */
  addTopping(topping: Topping) {
    let count = this.topp.filter( val=> val.id === topping.id);
    if( count.length >= 5) { // addTopping add each topping util each count 5
      // this.snackBar.open("Limited to 5 toppings level", 'Check!!', {duration:3000});
      return;
    }
    this.topp = [...this.topp, topping];
    // this.writeValue(this.value)
    /** Parent component로 데이터를 전달하는 부분 */
    this._onChange(this.topp);

  }
  /** Display count of selected toppings */
  displayToppingCount(topping: Topping): number{
    let count = Array.from(this.topp).filter( val=> val.id === topping.id);
    const ret = count.length === 0 ? null : count.length;
    return ret;
  }
  ngOnDestroy() {
    if( this.unsubscribe.next) {
      this.unsubscribe.next({});
      this.unsubscribe.complete();
    }
  }
}
