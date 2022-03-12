import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {Pizza, Topping} from "../../models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {take, takeUntil, tap} from "rxjs/operators";
import {Select} from "@ngxs/store";
import {ToppingsState} from "../../state";
import {Observable, Subject} from "rxjs";
import {PriceService} from "../../services/price.service";

@Component({
  selector: 'pizza-toppings',
  template: `
      <div class="pizza-toppings" >
         <ng-container *ngFor="let topping of _toppings;">
           <div class="">
             <div class="w-40 min-w-full md:min-w-0">
               <div  class="pizza-toppings-item" (click)="addTopping(topping)" style="text-align: justify-all"
                     matBadge="{{toppingCount(topping)}}" matBadgeColor="warn" >
                 <img src="assets/img/toppings/singles/{{ topping.name }}.svg">
                 {{ topping.name }}<div class="topping_price" >{{topping.price && topping.price * 1000}}원</div>
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
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaToppingsComponent implements OnInit, OnDestroy {
  @Input() set toppings (to: any) {
    this._toppings = to.toppings;
  }
  @Output() selected = new EventEmitter<Topping[]>();
  topp: Topping[] = [];
  _toppings: Topping[] = [];
  pizzaId: number;
  pizza: Pizza;
  price:string;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  snackBar: MatSnackBar;
  @Select(ToppingsState.selectedToppings ) selectedToppings$: Observable<any[]> | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private priceService: PriceService
  ) { }
  ngOnInit(): void {
    /**
     * Save the result of selected toppings
     * */
    this.selectedToppings$.pipe(
      // this.selectedToppings$ && this.selectedToppings$.pipe(
      tap(val => {
        this.topp = val;
        // console.log('topp-4',val);
        this.calcuratePrice(val);
        // this.toppings = pi.toppings;
      }),
    ).subscribe();
    // this.cd.detectChanges();

  }

  private calcuratePrice(val: any[]) {
    this.priceService.calcSubTotalToppings(val).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((val: any) => {
      // console.log(' price-2', val)
      this.priceService.calcTotal(val).pipe(
        takeUntil(this.unsubscribe$)// take(1)
      ).subscribe(val => {
        this.price = (val * 1000).toFixed(0).toLocaleString()
        // console.log(' price-3',this.price, val)
      });
    });
  }

  /** 토핑을 추가하는 부분 토핑은 5회까지 만 선택하게 제한함 */
  addTopping( topping: Topping) {
    let count = Array.from(this.topp).filter( val=> val.id === topping.id);
    if( count.length >= 5) { // addTopping add each topping util each count 5
      this.snackBar.open("Limited to 5 toppings level", 'Check!!', {duration:3000});
      return;
    }
    this.topp = [...this.topp, topping];
    // console.log('--- this.topp', this.topp, this.topp.length, topping)
    /** Parent component로 데이터를 전달하는 부분 */
    this.selected.emit(this.topp);
    // this._onChange(this.topp);

  }
  /** Display count of selected toppings */
  toppingCount(topping: Topping): number{
    let count = Array.from(this.topp).filter( val=> val.id === topping.id);
    const ret = count.length === 0 ? null : count.length;
    return ret;
  }
  ngOnDestroy() {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }
}
