import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import { Topping } from '../models';
import { ToppingsService } from '../services';
import {
  LoadToppings,
  LoadToppingsFail,
  LoadToppingsSuccess,
  UpdateToppings, UpdateToppingsFail,
  UpdateToppingsSuccess,
  VisualiseToppings
} from './toppings.actions';
import {PizzasStateModel} from './pizzas.state';
import {Injectable} from "@angular/core";

export interface ToppingsStateModel {
  toppings: Topping[];
  selectedToppings: Topping[];
  loaded: boolean;
  loading: boolean;
}

@State<ToppingsStateModel>({
  name: 'toppingsState',
  defaults: {
    toppings: [],
    selectedToppings: [],
    loaded: false,
    loading: false
  }
})
@Injectable()
export class ToppingsState {
  constructor(private toppingsService: ToppingsService) {}

  @Selector()
  static toppings(state: ToppingsStateModel): Topping[] {
    return state.toppings;
  }
  @Selector()
  static selectedToppings(state: ToppingsStateModel): Topping[] {
    return state.selectedToppings;
  }
/*
  @Selector()
  static selectedToppingImages(state: ToppingsStateModel): any[] {
    return state.selectedToppingImages;
  }
*/
  // load Toppings
  @Action(LoadToppings)
  loadToppings({ patchState, dispatch }: StateContext<ToppingsStateModel>) {
    patchState({ loading: true });
    return this.toppingsService.getToppings().pipe(
      map((toppings: Topping[]) => {
        asapScheduler.schedule(() =>
          dispatch(new LoadToppingsSuccess(toppings))
        );
      }),
      catchError(err =>
        of(asapScheduler.schedule(() => dispatch(new LoadToppingsFail())))
      )
    );
  }

  @Action(LoadToppingsSuccess)
  loadToppingSuccess(
    { patchState }: StateContext<ToppingsStateModel>,
    action: LoadToppingsSuccess
  ) {
    // console.log('loadToppingSuccess action-->',action);
    patchState({
      toppings: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(LoadToppingsFail)
  loadToppingsFail({ patchState }: StateContext<ToppingsStateModel>) {
    // console.log('loadToppingFailure-->');
    patchState({ loading: false, loaded: false });
  }

  // update Toppings
  @Action(UpdateToppings)
  updateToppings({ patchState, dispatch }: StateContext<ToppingsStateModel>) {
/*
    patchState({ loading: true });
    return this.toppingsService.getToppings().pipe(
      tap(val=>console.log('getToppings--val-->',val)),
      map((toppings: Topping[]) => {
        asapScheduler.schedule(() =>
          dispatch(new UpdateToppingsSuccess(toppings))
        );
      }),
      catchError(err =>
        of(asapScheduler.schedule(() => dispatch(new UpdateToppingsFail())))
      )
    );
*/
  }

  @Action(UpdateToppingsSuccess)
  updateToppingSuccess(
    { patchState, getState }: StateContext<ToppingsStateModel>,
    action: UpdateToppingsSuccess
  ) {
    patchState({
      toppings: getState().toppings,
      selectedToppings: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(UpdateToppingsFail)
  updateToppingsFail({ patchState }: StateContext<ToppingsStateModel>) {
    console.log('loadToppingFailure-->');
    patchState({ loading: false, loaded: false });
  }

  // ----visualise toppings -------
/*
  @Action(VisualiseToppings)
  visualiseToppings( { patchState }: StateContext<ToppingsStateModel>,  action: VisualiseToppings ) {
    patchState({ selectedToppings: action.payload });
  }
*/
/*
  @Action(VisualiseToppings)
  visualiseToppings( {patchState}: StateContext<PizzasStateModel>,  action: VisualiseToppings ) {
    patchState({ pizzas : action.payload})
  }
*/
}
