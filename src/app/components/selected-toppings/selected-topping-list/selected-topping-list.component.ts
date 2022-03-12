import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, forwardRef, Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional
} from '@angular/core';
import {Pizza, Topping} from "../../../models";
import {ToppingsState, UpdateToppingsSuccess} from "../../../state";
import {take, takeUntil, tap} from "rxjs/operators";
import {PriceService} from "../../../services/price.service";
import {PIZZA_CONFIG_TOKEN} from "../../../services/selected-item.service";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {ToppingAddedService} from "../../../services/topping-added.service";

@Component({
  selector: 'selected-topping-list',
  template: `
    <div class="flex flex-wrap" >
      <ng-container>
        <ng-container *ngFor="let topping of rawToppings">
          <selected-topping-item
            (remove)="onRemove($event)"
            [topping]="topping">
          </selected-topping-item>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedToppingListComponent implements OnInit, OnDestroy {
  toppings: Topping[];
  nToppings: any[] = [];
  rawToppings: Topping[];
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  // @Input() toppings: Topping[];

  @Select(ToppingsState.selectedToppings) selectedToppings$: Observable<Topping[]>;
  constructor(
    private store: Store,
    private priceService: PriceService,
    private topping_added: ToppingAddedService,
    private cdr: ChangeDetectorRef,
    @Inject(forwardRef(() => PIZZA_CONFIG_TOKEN)) public pizza?: Pizza,
  ) { }

  ngOnInit(): void {
    this.toppings = this.pizza? this.pizza.toppings : []; // Initial Value
    /** To sync with current topping list, */
    this.store.dispatch( new UpdateToppingsSuccess(this.toppings));
    //
    this.selectedToppings$.pipe(
      tap((topp: any[]) => {
        this.nToppings = [];
        /** Important!!!
         DB와 연결되어 있지 않고, ngxs를 사용하므로, 선택된 토핑 결과를 전달하기 위한 데이터 배열 */
        topp.map( (val: any) => this.nToppings.push(val));
        /** Calculate total price*/
        this.priceService.calcSubTotalToppings(topp).pipe(takeUntil(this.unsubscribe$))
          .subscribe((val:any) => this.rawToppings = val);
        //
        this.cdr.markForCheck();
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();

  }
  onRemove(topping: Topping) {
    let idx = this.nToppings.findIndex( (value: any) => value.id === topping.id);
    let data = this.nToppings.splice(idx,1);
    this.store.dispatch(new UpdateToppingsSuccess(this.nToppings));
    this.cdr.markForCheck();
  }
  ngOnDestroy() {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }
}
