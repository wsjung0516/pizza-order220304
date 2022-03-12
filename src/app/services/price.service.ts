import { Injectable } from '@angular/core';
import {Pizza, Topping} from '../models';
import {from, Observable} from 'rxjs';
import {groupBy, map, mergeMap, pluck, tap, toArray} from 'rxjs/operators';
import {Pizzac, ToppingsState} from '../state';
import {Select} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  counter = 0;
  @Select(ToppingsState.toppings) toppings$: Observable<Topping[]> | undefined;

  constructor() {}
  calcSubTotalToppings(toppings: Topping[]) {
    let id: any = null;
    let name: any;
    let price: number;
    let data: any[] = [];
    //
    return from( toppings).pipe(
      groupBy( value => value.id),
      mergeMap( group => group.pipe(toArray())),
      map( value => {
        value.map( v2 => {
          id = v2.id;
          name = v2.name;
          price = v2.price;
        });
        data.push({id:id, name:name, count:value.length, price: price});
      }),
      map( _ => data)
      // map( val => val),
    )/*.subscribe();
    return data;*/
  }
  calcTotal(topp:Topping[]) {
    //
  let total: number = 0;
    return from(topp).pipe(
      tap( (p1: any) => {
        // rtopp.push({ id: p1.id, name: p1.name, count: p1.count, price: parseFloat((price[p1.id-1].price * p1.count).toFixed(1))});
        let tval = p1.price * p1.count;
        total =  total + tval;
        }
       ),
      map( val => total)
    )

    /*.subscribe();
       return (total * 1000).toLocaleString();*/
  }

}
