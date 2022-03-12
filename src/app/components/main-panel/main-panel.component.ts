import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef, Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Pizza, Topping} from "../../models";
import {
  CreatePizzaSuccess, LoadToppings,
  PizzasState,
  RemovePizzaSuccess, ToppingsState,
  UpdatePizzaSuccess,
  UpdateToppingsSuccess
} from "../../state";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil, tap} from "rxjs/operators";
import {ToppingImageService} from "../../services/topping-image.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'main-panel',
  template: `
    <div class="grid grid-cols-2 m-1 ">
      <section class="h-auto  border-4  border-green-300 p-3">
        <pizza-form
          [pizza]="pizza$ | async"
          [toppings]="toppings$ | async"
          (addToppings)="addToppings($event)"
          (create)="onCreate($event)"
          (update)="onUpdate($event)"
          (remove)="onRemove($event)"
          >
          <pizza-display [toppings]="nToppings"></pizza-display>
        </pizza-form>
      </section>
      <section class="text-gray-600 body-font h-32">
        <div class="container px-5 py-1 mx-auto overflow-y-auto h-screen">
            <pizza-item-list [pizzas]="pizzas$ | async"></pizza-item-list>
        </div>
      </section>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPanelComponent implements OnInit, OnDestroy {
  // @Input() pizzas: Pizza[];
  // @Input() pizza: Pizza;
  // @Input() toppings: Topping[];
  // @Input() nToppings: Topping[];
  //
  pizza$: Observable<Pizza>;
  pizza: Pizza | undefined;
  nToppings: Topping[] | undefined;

  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>;
  @Select(ToppingsState.toppings) toppings$: Observable<Topping[]> | undefined;
  @Select(ToppingsState.selectedToppings ) selectedToppings$: Observable<any[]> | undefined;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  constructor(private store: Store,
              private router: Router,
              private toppingImages: ToppingImageService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {}
  addToppings(toppings: Topping[]) {

    this.store.dispatch(new UpdateToppingsSuccess(toppings))
  }
  onCreate(event: Pizza) {
    console.log(' pizza -1', event);
    this.store.dispatch(new CreatePizzaSuccess(event));
  }

  onUpdate(event: Pizza) {
    event.toppings = this.nToppings;
    this.store.dispatch(new UpdatePizzaSuccess(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('선택한 항목을 삭제하시겠습니까?');
    if (remove) {
      this.store.dispatch(new RemovePizzaSuccess(event));
    }
  }
  ngOnInit(): void {
    this.store.dispatch(new LoadToppings());

    const pizzaId = this.route && this.route.snapshot.params.pizzaId;
    console.log('this.routed -- pizzaId', pizzaId)
    if( pizzaId ) {  // If new routing state, not working this process.
      this.pizza$ = this.store.select(PizzasState.SelectedPizza).pipe(
        tap((pizza: Pizza) => {
          // 'products/1'
          const pizzaExist = !!(pizza && pizza.toppings);
          // console.log('---pizzaExist', pizzaExist);
          const toppingIds = pizzaExist
            ? pizza.toppings && pizza.toppings.map(topping => topping.id)
            : [];
          // console.log('pizza111: ', pizza, toppingIds, pizzaExist);

          if (pizzaExist) {
            this.pizza = pizza;
            this.nToppings = pizza && pizza.toppings;
          }
        }),
        takeUntil(this.unsubscribe$)
      );
    } else {
      // If new route state, make clear saved toppings state.
      let toppings: Topping[] =[];
      this.store.dispatch(new UpdateToppingsSuccess(toppings))
    }
    this.selectedToppings$.pipe(
      // this.selectedToppings$ && this.selectedToppings$.pipe(
      tap(val => {
        this.nToppings = val;
        // this.total = this.priceService.calcTotal(pi.toppings);
        // this.toppings = pi.toppings;
      }),
    ).subscribe();
    this.cd.detectChanges();

  }
  ngOnDestroy() {
    console.log('this.unsubscribe', this.unsubscribe)
    if( this.unsubscribe && this.unsubscribe.next) {
      this.unsubscribe.next({});
      this.unsubscribe.complete();
    }
  }
}
