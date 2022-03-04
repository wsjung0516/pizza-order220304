import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {Pizza, Topping} from '../models';
import { PizzasService } from '../services';
import {
  CreatePizza,
  CreatePizzaFail,
  CreatePizzaSuccess,
  LoadPizzas,
  LoadPizzasFail,
  LoadPizzasSuccess, RemovePizza, RemovePizzaFail, RemovePizzaSuccess,
  SelectPizza, UpdatePizza, UpdatePizzaFail, UpdatePizzaSuccess
} from './pizzas.actions';
import {Navigate} from '@ngxs/router-plugin';
import {Injectable} from "@angular/core";

// -----pizzas model --------
export class Pizzac implements Pizza{
  id: number | undefined;
  name: string | undefined;
  toppings: Topping[] | undefined;
}

export interface PizzasStateModel {
  pizzas: Pizza[];
  loaded: boolean;
  loading: boolean;
  selectedPizzaId: number;
}
// --- pizzas state : initialState---
@State<PizzasStateModel>({
  name: 'pizzasState',
  defaults: {
    pizzas: [],
    loaded: false,
    loading: false,
    selectedPizzaId: 0
  }
})
@Injectable()
export class PizzasState {
  // temporary for localStorage version
  temp_id:number = 10;

  constructor(private pizzaService: PizzasService,
              ) {}
  @Selector()
  static pizzas(state: PizzasStateModel) {
    return state.pizzas;
  }
  @Selector()
  static loaded(state: PizzasStateModel) {
    return state.loaded;
  }

  @Selector()
  static SelectedPizza(state: PizzasStateModel): Pizza {
    //
    return <Pizza>state.pizzas.find(
      (pizza: Pizza) => pizza.id === state.selectedPizzaId
    );
  }
  //---------------- load pizza ----------
  @Action(LoadPizzas)
  loadPizzas({ patchState, dispatch }: StateContext<PizzasStateModel>) {
    patchState({ loading: true });
    return this.pizzaService
      .getPizzas()
      .pipe(
        map((pizzas: Pizza[]) =>
          asapScheduler.schedule(() =>
            dispatch(new LoadPizzasSuccess(pizzas))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              dispatch(new LoadPizzasFail(error))
            )
          )
        )
      );
  }

  @Action(LoadPizzasSuccess)
  loadPizzasSuccess(
    { patchState }: StateContext<PizzasStateModel>,
    { payload }: LoadPizzasSuccess
  ) {
    patchState({ pizzas: payload, loaded: true, loading: false });
  }

  @Action(LoadPizzasFail)
  loadPizzasFail(
    { dispatch }: StateContext<PizzasStateModel>,
    { payload }: LoadPizzasFail
  ) {
    dispatch({ loaded: false, loading: false });
  }

  // ---- selected Pizza ----
  @Action(SelectPizza)
  selectedPizza(
    { patchState }: StateContext<PizzasStateModel>,  { payload }: SelectPizza ) {
    patchState({ selectedPizzaId: payload });
  }
  //---------------- create pizza ----------
  @Action(CreatePizza)
  createPizza({ patchState, dispatch }: StateContext<PizzasStateModel>, {payload}:CreatePizza) {
    patchState({ loading: true });
    return this.pizzaService
      .createPizza(payload)
      .pipe(
        map((pizza: Pizza) =>
          asapScheduler.schedule(() =>
            dispatch(new CreatePizzaSuccess(pizza))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              dispatch(new LoadPizzasFail(error))
            )
          )
        )
      );
  }

  @Action(CreatePizzaSuccess)
  createPizzaSuccess(
    { patchState,getState, dispatch }: StateContext<PizzasStateModel>, {payload}: any ,CreatePizzaSuccess: any ) {
    this.temp_id = this.temp_id + 1;
    payload.id = this.temp_id;
    patchState({ pizzas:[...getState().pizzas,payload], loaded: true, loading: false });
    dispatch(new Navigate(['./products']));

  }

  @Action(CreatePizzaFail)
  createPizzaFail(
    { dispatch }: StateContext<PizzasStateModel> ) {
    dispatch({ loaded: false, loading: false });
  }
  //---------------- update pizza ----------
  @Action(UpdatePizza)
  updatePizza({ patchState, dispatch }: StateContext<PizzasStateModel>, {payload}:UpdatePizza) {
    patchState({ loading: true });
    return this.pizzaService
      .updatePizza(payload)
      .pipe(
        map((pizza: Pizza) =>
          asapScheduler.schedule(() =>
            dispatch(new UpdatePizzaSuccess(pizza))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              dispatch(new LoadPizzasFail(error))
            )
          )
        )
      );
  }

  @Action(UpdatePizzaSuccess)
  updatePizzaSuccess(
    { patchState,getState,dispatch }: StateContext<PizzasStateModel>, {payload}: UpdatePizzaSuccess ) {
    //
    const pizzas = getState().pizzas.filter(val=>val.id !== payload.id);
    patchState({pizzas:[ ...pizzas,payload], loaded: true, loading: false });
    dispatch(new Navigate(['./products']));
  }

  @Action(UpdatePizzaFail)
  updatePizzaFail(
    { dispatch }: StateContext<PizzasStateModel> ) {
    dispatch({ loaded: false, loading: false });
  }
  //---------------- remove pizza ----------
  payload:any = null;
  @Action(RemovePizza)
  removePizza({ patchState, dispatch }: StateContext<PizzasStateModel>, {payload}:RemovePizza) {
    patchState({ loading: true });
    this.payload = payload;
    return this.pizzaService
      .removePizza(payload)
      .pipe(
        map((pizza: Pizza) =>
          asapScheduler.schedule(() =>
            dispatch(new RemovePizzaSuccess(pizza))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              dispatch(new LoadPizzasFail(error))
            )
          )
        )
      );
  }

  @Action(RemovePizzaSuccess)
  removePizzaSuccess(
    { patchState,getState, dispatch }: StateContext<PizzasStateModel>, {payload}:RemovePizzaSuccess ) {
    //
    const pizzas = getState().pizzas.filter(val => val.id !== payload.id)
    // const pizzas = getState().pizzas.filter(val => val.id !== this.payload.id)
    //
    this.payload = null;
    patchState({ pizzas:[...pizzas],loaded: true, loading: false });
    dispatch(new Navigate(['./products']));

  }

  @Action(RemovePizzaFail)
  removePizzaFail(
    { dispatch }: StateContext<PizzasStateModel> ) {
    dispatch({ loaded: false, loading: false });
  }


}
