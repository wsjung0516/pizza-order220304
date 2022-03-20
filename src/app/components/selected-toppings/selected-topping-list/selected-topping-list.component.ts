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
import {filter, skip, take, takeUntil, tap} from "rxjs/operators";
import {PriceService} from "../../../services/price.service";
import {PIZZA_CONFIG_TOKEN} from "../../../services/selected-item.service";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {ToppingAddedService} from "../../../services/topping-added.service";

@Component({
  selector: 'selected-topping-list',
  template: `
    <div class="" style="width: 45vw">
      <div class="flex flex-wrap ">
        <ng-container *ngFor="let topping of rawToppings">
          <selected-topping-item
            (remove)="onRemove($event)"
            [topping]="topping">
          </selected-topping-item>
        </ng-container>
      </div>

    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedToppingListComponent implements OnInit, OnDestroy {
  @Input() toppings: Topping[];
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
    @Optional() @Inject(forwardRef(() => PIZZA_CONFIG_TOKEN)) public pizza?: Pizza,
  ) { }

  ngOnInit(): void {
    this.toppings = this.pizza? this.pizza.toppings : this.toppings; // Initial Value
    /** To sync with current topping list, */
    this.store.dispatch( new UpdateToppingsSuccess(this.toppings));
    //
    this.selectedToppings$.pipe(
      filter(val => !!val ),
      tap((topp: any[]) => {
        this.nToppings = [];
        /** Important!!!
         DB와 연결되어 있지 않고, ngxs를 사용하므로, 선택된 토핑 결과를 전달하기 위한 데이터 배열 */
        topp.map( (val: any) => this.nToppings.push(val));

        if( topp.length === 0) {
          this.rawToppings = [];
          this.cdr.markForCheck();
        }
        /**
         * Calculate total price, extract toppings that has the same toppings and
         * count if there are multiple same toppings
         * */
        this.priceService.calcSubTotalToppings(topp).pipe(takeUntil(this.unsubscribe$))
          .subscribe((val:any) => {
            // console.log('remove toppings - 2',topp);
            this.rawToppings = val
            this.cdr.markForCheck();
          });
        //
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();

  }
  onRemove(topping: Topping) {
    let idx = this.nToppings.findIndex( (value: any) => value.id === topping.id);
    this.nToppings.splice(idx,1);
    this.store.dispatch(new UpdateToppingsSuccess(this.nToppings));
    this.cdr.markForCheck();
  }
  ngOnDestroy() {
    if( this.unsubscribe.next) {
      this.unsubscribe.next({});
      this.unsubscribe.complete();
    }
  }
}
