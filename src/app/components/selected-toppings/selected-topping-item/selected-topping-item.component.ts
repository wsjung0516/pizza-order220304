import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Topping} from "../../../models";

@Component({
  selector: 'selected-topping-item',
  template: `
    <div class="selected-toppings-item" (click)="remove.emit(topping)">
      <div class="w-12 h-auto"  href="#">
        <img src="assets/img/toppings/singles/{{ topping.name }}.svg"></div>
        <div class="mr-1">{{topping.name}}</div>
      <div class="text-red-900">{{topping.count}}</div>
    </div>
  `,
  styles: [`
    .selected-toppings-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      margin: 0 0 10px;
      border-radius: 4px;
      font-size: 12px;
      font-family: 'cornerstone';
      border: 1px solid grey;
      flex: 0 0 23%;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .selected-toppings-item.active {
      background: #f5f5f5;
    }

    .selected-toppings-item img {
      width: 22px;
      margin: 0 10px 0 0;
    }
  `
  ]
})
export class SelectedToppingItemComponent implements OnInit {
  @Input() topping: Topping;
  @Output() remove = new EventEmitter<Topping>();
  constructor() { }

  ngOnInit(): void {
  }
}
