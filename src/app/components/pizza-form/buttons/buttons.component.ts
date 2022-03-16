import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pizza} from "../../../models";
import {Form, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-buttons',
  template: `
    <div class="pizza-form__actions">
      <button
        type="button"
        class="btn btn__ok"
        *ngIf="!exists"
        (click)="createPizza()">
        Create Pizza
      </button>

      <button
        type="button"
        class="btn btn__ok"
        *ngIf="exists"
        (click)="updatePizza()">
        Save changes
      </button>

      <button
        type="button"
        class="btn btn__warning"
        *ngIf="exists"
        (click)="removePizza()">
        Delete Pizza
      </button>
    </div>
  `,
  styles: [`
    .pizza-form__actions {
      position: relative;
      margin: 35px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pizza-form__actions button:last-child {
      margin-left: auto;
    }
    .btn {
      display: inline-block;
      padding: 10px 15px;
      margin: 0;
      outline: 0;
      border: 0;
      border-radius: 3px;
      font-size: 16px;
      font-family: 'cornerstone';
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn__ok {
      background: #0f9675;
      color: #fff;
    }
    .btn__ok:hover {
      background: #0a7d61;
    }
    .btn__warning {
      background: #ab131c;
      color: #fff;
    }
    .btn__warning:hover {
      background: #880c14;
    }

  `]
})
export class ButtonsComponent implements OnInit {
  @Input() exists: boolean;
  @Input() form: FormGroup;
  @Input() pizza: Pizza;
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();

  constructor() { }

  ngOnInit(): void {
  }
  createPizza() {
/*
    const { value, valid } = form;
    // console.log('--- value', value, valid, form);
    if( value['name'].split(':')[0] === '') window.alert('이름을 입력하세요!')
    // if( value['name'] === '') window.alert('이름을 입력하세요!')
    if (valid) {
      this.create.emit(value);
    }
*/
      this.create.emit({});
  }

  updatePizza() {
    const { value, valid, touched, dirty } = this.form;
    if (valid) {
      // console.log('updatePizza-form', form, value);
      // if (touched && valid) {
      this.update.emit({ ...this.pizza, ...value });
    }
  }

  removePizza() {
    const { value } = this.form;
    this.remove.emit({ ...this.pizza, ...value });
  }

}
