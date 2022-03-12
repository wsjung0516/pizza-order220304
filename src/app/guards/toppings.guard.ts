import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';

import { LoadToppings } from '../state';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(): Observable<any> {
    // console.log('ToppingGuard is called');
    return this.checkStore().pipe(
      switchMap((val) => {
        console.log('checkStore val-->',val)
        return of(true)
      }),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(state => state.toppingsState.loaded).pipe(
/*
      tap ( val => {
        if( !val)
        this.store.dispatch(new LoadToppings())
      }),
      map( val => !!val),
*/

      switchMap((loaded: boolean) => {
        if (!loaded) {
          return this.store.dispatch(new LoadToppings());
        }
          console.log('checkStore loaded-->',loaded)
        return of(true);
      }),
      take(1)
    );
  }
}
