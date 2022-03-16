import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef, Inject,
  Input,
  OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {Pizza, Topping} from "../../models";
import {
  CreatePizzaSuccess, LoadPizzas, LoadToppings,
  PizzasState,
  RemovePizzaSuccess, ToppingsState,
  UpdatePizzaSuccess,
  UpdateToppingsSuccess
} from "../../state";
import {Select, Store} from "@ngxs/store";
import {filter, takeUntil, tap} from "rxjs/operators";
import {ToppingImageService} from "../../services/topping-image.service";
import {Observable, of, Subject} from "rxjs";
import {PizzaFormComponent} from "../pizza-form/pizza-form.component";

@Component({
  selector: 'main-panel',
  template: `
    <div class="grid grid-cols-2 m-1" >
      <section>
      <div class="h-120 border-4  border-green-400 p-3">
        <pizza-form
          [_pizza]="pizza$ | async"
          [toppings]="toppings$ | async"
          (selectedToppings)="addToppings($event)"
          (create)="onCreate($event)"
          (update)="onUpdate($event)"
          (remove)="onRemove($event)"
        >
          <pizza-display [toppings]="nToppings"></pizza-display>
        </pizza-form>
      </div>
      </section>
      <section>
        <div class="px-5 py-1 mx-auto overflow-y-auto h-screen">
            <pizza-item-list [pizzas]="pizzas$ | async"
            (selected)="onSelectedPizza($event)"></pizza-item-list>
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
  @Select(ToppingsState.toppings) toppings$: Observable<Topping[]>;
  @Select(ToppingsState.selectedToppings ) selectedToppings$: Observable<any[]>;

  @ViewChild(PizzaFormComponent) pizzaForm: PizzaFormComponent;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  constructor(private store: Store,
              private toppingImages: ToppingImageService,
              private cdr: ChangeDetectorRef) {}
  addToppings(toppings: Topping[]) {

    this.store.dispatch(new UpdateToppingsSuccess(toppings))
  }
  resetPizza() {
     // console.log('mp', this.pizzaForm )
     this.pizzaForm.resetPizza(); // reset name, price
     this.nToppings = []; // reset toppings an pizza
     this.store.dispatch( new UpdateToppingsSuccess([])); // reset selected toppings
    this.cdr.detectChanges();
    // this.store.dispatch(new CreatePizzaSuccess(pizza));
  }
  onSelectedPizza(pizza: Pizza) {
    console.log('pizza', pizza);
    // this.pizzaForm.onSetName(pizza); // reset name, price
    this.nToppings = pizza.toppings; // reset toppings an pizza
    this.store.dispatch( new UpdateToppingsSuccess(pizza.toppings)); // reset selected toppings

    this.cdr.detectChanges();
  }
  onCreate(pizza: Pizza) {
    console.log(' pizza -1', pizza);
    this.store.dispatch(new CreatePizzaSuccess(pizza));
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
    this.store.dispatch(new LoadPizzas());
    this.store.dispatch(new LoadToppings());
    this.selectedToppings$.pipe(
      filter( val => !!val),
      tap(val => {
        this.nToppings = val;
      }),
    ).subscribe();
    this.cdr.detectChanges();

  }
  ngOnDestroy() {
    console.log('this.unsubscribe', this.unsubscribe)
    if( this.unsubscribe && this.unsubscribe.next) {
      this.unsubscribe.next({});
      this.unsubscribe.complete();
    }
  }
}
