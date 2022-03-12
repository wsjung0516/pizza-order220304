import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';
import { LoadPizzas, SelectPizza } from '../state';

@Injectable()
export class PizzaExistsGuards implements CanActivate {
  //@Select(PizzasState.loaded) pizzasLoaded$: Observable<boolean>;
  // @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>;

  constructor(private store: Store) {}
  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId);
        const ret = this.hasPizza(id);
        console.log('PizzaExistsGuards--checkStore--ret-id->',ret,id);
        return ret;
      })
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(state => state.pizzasState.pizzas).pipe(
      map((pizzas: Pizza[]) => pizzas.find(pizza => pizza.id === id)),
      switchMap((pizza: any) => {
        if (!!pizza) {
          return this.store
            .dispatch(new SelectPizza(pizza.id))
            .pipe(switchMap(() => of(true)));
        }
        return of(false);
      })
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(state => state.pizzasState.loaded).pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          return this.store.dispatch(new LoadPizzas());
        }
        return of(true);
      }),
      take(1)
    );
  }
}
