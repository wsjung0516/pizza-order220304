import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Topping} from "../../../models";

@Component({
  selector: 'pizza-item',
  template: `
    <div class="" (click)="selected.emit($event)">
      <pizza-display
        [toppings]="nToppings">
      </pizza-display>
      <div class="flex justify-center">
        <div class="text-xl text-red-400">{{ name }}:</div>
        <div class="text-xl ml-2 text-green-900"> {{ price }}</div>
      </div>
    </div>
  `,
  styles: [
  ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaItemComponent implements OnInit {
  name: string;
  nToppings!: Topping[];
  id: number;
  price: string;
  @Output() selected = new EventEmitter<any>();
  @Input() set pizza(v: any) {
    this.nToppings = v.toppings;
    this.name = v.name;
    this.id = v.id;
    this.price = v.price
    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
