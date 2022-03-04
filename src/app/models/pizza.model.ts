import { Topping } from './topping.model';
import { InjectionToken} from '@angular/core';

export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}
