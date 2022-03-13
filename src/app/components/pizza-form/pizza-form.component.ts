import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Pizza, Topping} from "../../models";
import {Observable, Subject} from "rxjs";
import {OverlayRef} from "@angular/cdk/overlay";
import {PriceService} from "../../services/price.service";
import {SelectedItemService} from "../../services/selected-item.service";
import {Select, Store} from "@ngxs/store";
import {LoadToppings, ToppingsState} from "../../state";
import { takeUntil, tap} from "rxjs/operators";
import {PizzaNameComponent} from "./pizza-name/pizza-name.component";

@Component({
  selector: 'pizza-form',
  template: `
    <div class="pizza-form">
      <pizza-name
        [input_name]="pizza?.name"
        (name)="onInputName($event)"
        (isInvalid) = onIsInvalid($event)
      >
      </pizza-name>
        <!-- Angular CDK Overlay를 표시하기 위한 Anchor point, 선태된 토핑에 대한 Count를
         표시하기 위함 selected-item.service.ts와 관련이 있음 -->
        <ng-container>
          <div style="float: left" #subTotal></div>
        </ng-container>
        <!--      -->
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
            [toppings]="_toppings"
            (price)="onPrice($event)"
            (selected)="addToppings.emit($event)">
          </pizza-toppings>
        </div>

        <div class="">
            <app-buttons
              (create)="onCreate()"
              (update)="update.emit($event)"
              (remove)="remove.emit($event)"
            ></app-buttons>
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

  `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('subTotal', {static:false}) selected_origin: any;

  @Input() pizza: Pizza;
  @Input() set toppings (v : any){
    this._toppings = {
      toppings: v
    };
    this.toppings2 = v;
    this.cdr.markForCheck();
  }
  // @Input() nToppings: Topping[];
  @Output() addToppings = new EventEmitter<Topping[]>();
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();
  pizzaPrice:string;
  _isInvalid: boolean;
  _name: any
  price: string;
  exists = false;
  _toppings: {};
  toppings2: Topping[];
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  overlayRef: OverlayRef;
  @Select(ToppingsState.selectedToppings ) selectedToppings$: Observable<any[]> | undefined;
  @ViewChild(PizzaNameComponent) pizzaName: PizzaNameComponent;

  constructor(
    private selectedItemService: SelectedItemService,
    private priceService: PriceService,
    private cdr: ChangeDetectorRef,
    private store: Store

  ) { }
  selected_toppings: Topping[];
  ngOnInit(): void {

    this.selectedToppings$.pipe(
      takeUntil(this.unsubscribe$),
      tap((val)=> {
        this.selected_toppings = val;
         this._toppings = {
           toppings: this.toppings2
         };
        // this._toppings = [...this.toppings2, ...val];
        // console.log('topp-7', this._toppings, this.toppings2, val)
        this.cdr.markForCheck();
      })
    ).subscribe()
  }
  ngAfterViewInit() {
    this.overlayRef = this.selectedItemService.openSelectedToppings(this.selected_origin,  this.pizza);
  }
  onResetName() {
    this.pizzaName.onResetName();
  }
  onSetName(pizza:Pizza) {
    this.pizzaName.onSetNameNPrice(pizza)
  }
  onInputName(ev: any) {
    this._name = ev;
  }
  onIsInvalid(ev: boolean) {
    this._isInvalid = ev;
  }
  onPrice(price:string) {
    console.log('price-1', price, this.pizzaName);
    const pizza = {price}
    this.pizzaName.onSetNameNPrice(pizza)
    // console.log('price', price, this.pizza);
    this.price = this.pizza ? this.pizza.price : price;
    // if(this.price) this.price = price;
    // this.pizza.price = price;
  }
  onCreate() {
    if( this._name === '' || this._name === undefined) {
      window.alert('Input pizza name!!')
    }
    else  {
      console.log('name', this._name)
      const pi: Pizza = {id: uniqueId(), name: this._name.name, price: this.price, toppings: this.selected_toppings};
      this.create.emit(pi)
    }
  }

  ngOnDestroy() {
    this.overlayRef && this.overlayRef.dispose();
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }
}
const uniqueId = (function(){ let id=10; return function(){ return id++;} })();
