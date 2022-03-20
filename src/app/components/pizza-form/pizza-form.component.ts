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
import {from, Observable, Subject } from "rxjs";
import {OverlayRef} from "@angular/cdk/overlay";
import {SelectedItemService} from "../../services/selected-item.service";
import {Select, Store} from "@ngxs/store";
import {PizzasState, ToppingsState} from "../../state";
import {filter, groupBy, map, mergeMap, skip, switchMap, takeLast, takeUntil, tap, toArray} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";

@Component({
  selector: 'pizza-form',
  template: `
    <div class="pizza-form">
      <form [formGroup]="form">
        <div class="input_name_area">
          <label>
            <input
              type="text"
              formControlName="name"
              placeholder="Input Pizza Name!"
              class="pizza-form__input"
              [class.error]="nameControlInvalid">
            <div
              class="pizza-form__error"
              *ngIf="nameControlInvalid">
              <p>피자이름을 입력하세요!</p>
            </div>
          </label>
          <label>
            <input
              type="text"
              formControlName="price"
              placeholder="Pizza price!"
              class="pizza-price"
            >
          </label>
        </div>
        <!-- Angular CDK Overlay를 표시하기 위한 Anchor point, 선태된 토핑에 대한 Count를
         표시하기 위함 selected-item.service.ts와 관련이 있음 -->
        <ng-container>
          <div  #subTotal></div>
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
            [toppings]="toppings"
            formControlName="toppings">
          </pizza-toppings>
        </div>

        <div class="">
            <app-buttons [exists]="exists"
                         [form]="form"
              (create)="createPizza(form)"
              (update)="updatePizza()"
              (remove)="removePizza()"
            ></app-buttons>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .input_name_area {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .pizza-form__input {
      margin: 0;
      padding: 15px;
      outline: 0;
      width: 100%;
      border-radius: 4px;
      font-size: 20px;
      font-weight: 600;
      background: #f5f5f5;
      border: 1px solid transparent;
    }
    .pizza-price {
      margin: 0;
      padding: 15px;
      outline: 0;
      width: 100%;
      border-radius: 4px;
      font-size: 20px;
      font-weight: 600;
      background: #f5f5f5;
      border: 1px solid transparent;
    }

    .pizza-form__input.error {
      border-radius: 4px 4px 0 0;
      border-color: #b54846;
    }

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
  exists = false;
  @ViewChild('subTotal', {static:false}) selected_origin: any;

  @Input() set _pizza(pi: Pizza){
    // console.log('pizza',pi)
    if( pi ) {
      this.pizza = pi;
      const nv = pi.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.form.patchValue({name: pi.name, price: nv });
    }
  }
  @Input() toppings : Topping[];
  @Output() selectedToppings = new EventEmitter<Topping[]>();
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  overlayRef: OverlayRef;
  //
  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]> | undefined;
  @SelectSnapshot(PizzasState.pizzas) pizzas: Pizza[];
  @Select(ToppingsState.selectedToppings) selectedToppings$: Observable<Topping[]> | undefined;
  total:any;
  pizza: Pizza;
  @Input() form: FormGroup;


  constructor(
    private selectedItemService: SelectedItemService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      price: [""],
      toppings: [[]]
    });

  }
  ngOnInit(): void {
    this.form.get("toppings")
      .valueChanges.pipe(
    )
      .subscribe(value => {
        this.selectedToppings.emit(value);
      });
    //
    this.selectedToppings$.pipe(
      filter( val => !!val),
      calcuretePrice(),
      takeUntil(this.unsubscribe$),
    ).subscribe((val:any) => {
      // console.log('price-2',val);
      const price = (val * 1000).toFixed(0).toLocaleString()
      const nv = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
      // console.log(' price-3', price, val)
      this.form.patchValue({ price: nv })
    });
  }
  private isDuplicatedName(name: string) {
    const idx =  this.pizzas.findIndex(val => val.name === name)
    console.log(' idx', idx, name, this.pizzas)
    let newName;
    if( idx > -1 ) {
      newName = window.prompt('중복된 이름이 있습니다. 다른 이름을 입력하세요')
      return newName;
    } else {
      return name;
    }
  }
  ngAfterViewInit() {
    this.overlayRef = this.selectedItemService.openSelectedToppings(this.selected_origin,  this.pizza);
  }
  resetPizza() {
    this.form.reset({name:'', price:'', toppings:[]});
    this.exists = false;
    // this.form.reset();
  }
  get nameControl() {
    return this.form.get("name") as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError("required") && this.nameControl.touched;
  }

  createPizza(form: FormGroup) {
    const { value, valid } = form;
    console.log('--- value', value, valid, form);
    const name = value['name'].split(':')[0];
    if( name === '') window.alert('이름을 입력하세요!')
    let na = checkDuplicatedName(this.pizzas, name)// if( value['name'] === '') window.alert('이름을 입력하세요!')
    if (valid && na !== 'cancel') {
      this.create.emit(value);
    }
  }

  updatePizza() {
     const { value, valid, touched, dirty } = this.form;
    if (valid) {
      // console.log('updatePizza-form', form, value);
      // if (touched && valid) {
      console.log('pizza-2', { ...this.pizza, ...value } )
      this.update.emit({ ...this.pizza, ...value });
    }
  }

  removePizza() {
    const { value } = this.form;
    this.remove.emit({ ...this.pizza, ...value });
  }

  ngOnDestroy() {
    this.overlayRef && this.overlayRef.dispose();
    if( this.unsubscribe && this.unsubscribe.next) {
      this.unsubscribe.next({});
      this.unsubscribe.complete();
    }
  }
}
export function checkDuplicatedName(pizzas: Pizza[], name:string) {
  let ret = true;
  let newName;
  do {
    const idx =  pizzas.findIndex(val => val.name === name)
    console.log(' idx', idx, name, pizzas)
    if( idx > -1 ) {
      newName = window.prompt('중복된 이름이 있습니다. 다른 이름을 입력하세요')
      console.log('newName', newName);
      if( !newName) {  // In case cancel is pressed
        newName = 'cancel';
        ret = false;
      } else if( newName !== name) ret = false
    } else {
      ret = false
      newName = name;
    }
  } while (ret)
  return newName
}
export function calcuretePrice() {
  return function <T>(source: Observable<T>) {
    let id: any = null;
    let name: any;
    let price: number;
    let data: any[] = [];
    let total = 0;
    return new Observable( observer => {
      return source.subscribe(
        {
          next(value:any) {
            data = [];
            total = 0;
            if( value.length === 0 ) observer.next(0);
            return from( value ).pipe(
              groupBy( (value:any) => value.id),
              mergeMap( (group:any) => group.pipe(toArray())),
              // [{id:1, name: anchovy, price:1.1},{id:1, name: anchovy, price:1.1},{id:2, name: bacon, price:1},{id:3, name: basil, price:1.2}]

              map( (value:any) => {
                value.map( (v2: any) => {
                  id = v2.id;
                  name = v2.name;
                  price = v2.price;
                });
                data.push({id:id, name:name, count:value.length, price: price});
              }),
              takeLast(1),
              // [{id:1, name: anchovy, count:2, price:1.1},{id:2, name: bacon, count:1, price:1},{id:3, name:basil, count:1, price:1.2}]
              // map( _ => data),
              map( _ => {
                data.forEach(p1 => {
                  const tval = p1.price * p1.count;
                  total =  total + tval;
                })
              }),
              map( _ => observer.next(total))
            ).subscribe();
          }
        }
      )
    })
  }
}
