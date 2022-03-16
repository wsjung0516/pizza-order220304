import {Directive, EventEmitter, HostBinding, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {Pizza} from "../../models";

@Directive({
  selector: '[select_pizza]'
})
export class SelectPizzaDirective {
  @Input('select_pizza') sPizza?: Pizza;
  @Input() selectedPizza?:Pizza;
  @Output() selectPizza = new EventEmitter();
  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes', changes, this.sPizza)
    if(changes['selectedPizza'].currentValue && changes['selectedPizza'].currentValue.id === this.sPizza.id) {
      this.border = '3px solid red';
      //console.log('- wsjung SelectColorDirective-- changes', changes, changes.selectedPizza.currentValue)
    } else {
      this.border = '1px solid gray';
    }
  }

  @HostBinding('style.border') border?: string;
  @HostBinding('style.zIndex') zIndex?: number;
  @HostListener('mouseover') onMouseOver() {
    if( this.selectedPizza && this.selectedPizza.id !== this.sPizza.id) {
      this.border = '3px solid blue';
    }
  }
  @HostListener('click') onClick() {
    this.border = '3px solid red';
    this.selectPizza.emit(this.sPizza);
  }
  @HostListener('mouseleave') onMouseLeave() {
    if( this.selectedPizza && this.selectedPizza.id !== this.sPizza.id) {
      this.border = '2px solid gray';
    }
  }
}
