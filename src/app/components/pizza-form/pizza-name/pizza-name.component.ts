import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Pizza} from "../../../models";

@Component({
  selector: 'pizza-name',
  template: `
    <form [formGroup]="form">
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
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaNameComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() set input_name (name: string) {
    this.form.patchValue({name:name});
  }
/*
  @Input() set price (v: string ) {
    // Thousand separator
    const nv = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 원';
    console.log('nv -1', v)
    // @ts-ignore
    this.form.patchValue({price: v  })
  }
*/
  @Output() isInvalid = new EventEmitter<boolean>();
  @Output() name = new EventEmitter<string>();
  tName: string = '';
  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
    });
  }
  onResetName() {
    this.form.reset();
  }
  onSetNameNPrice(pizza: Pizza) {
    const nv = pizza.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 원';
    console.log('nv- 2, price', nv, pizza);
    // this.form.reset();
    // this.form.patchValue({ price: nv});
    this.form.patchValue({name: pizza.name, price: nv});
  }
  ngOnInit(): void {
    this.form.valueChanges.pipe().subscribe(val => {
      this.tName = val;
      // console.log('val', val)
      this.name.emit(val);
      this.isInvalid.emit(this.nameControlInvalid);
    })
  }
  get nameControl(): any {
    // console.log('name', this.form);
    return this.form.get("name") as FormControl;
  }
  get nameControlInvalid() {
    return this.nameControl.hasError("required") && this.nameControl.touched;
  }
}
