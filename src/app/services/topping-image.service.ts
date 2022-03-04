import { Injectable } from '@angular/core';
import {Topping} from '../models';
import {from} from 'rxjs';
import {distinct, map, pluck, takeLast, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToppingImageService {
  counter:any = 0;
  constructor() { }
  // Before action of setting  image name, named sequence no for each topping object.
  // to layering each selected toppings by z-index;
  // Extract id of toppings, which was added by inserting action.
  // Remove duplicated id
  // Set image name to each toppings.
  // Get the last array, which is duplicated by pluck function.
  // Sort each topping array by the sequence no
  setEachToppingImage(toppings:Topping[]) {
    let arr: any[] = [];
    let no = 1;
    let data: any[] = [];
    if( !toppings ) { // @ts-ignore
      return ;
    }
    toppings.map( val => data.push ({ no:no++, id:val.id, name: val.name }));
    from(data).pipe(
      pluck('id'),
      distinct(),
      tap ( v1 => {
        let count = 1;
        data.map( v2 => {
          if( v2.id === v1) {
            arr.push({no: v2.no, id:v2.id, name:v2.name, image: v2.name+'_'+ (count++).toString()})
          }
        });
      }),
      map(() => arr ),
      takeLast(1),
    ).subscribe();
    arr.sort((a,b) => {return a.no < b.no ? -1 : a.no > b.no ? 1 : 0; });
    // console.log('arr',arr)
    data = [];
    arr.map( val => data.push({id:val.id, name: val.name, image: val.image }));
    return data;

  }

}
