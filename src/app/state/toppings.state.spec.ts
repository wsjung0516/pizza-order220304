import { TestBed } from '@angular/core/testing';
import {NgxsModule, Store} from "@ngxs/store";
import {ToppingsState} from "./toppings.state";
import {UpdateToppingsSuccess} from "./toppings.actions";
import {Topping} from "../models";
import {ToppingsService} from "../services";
import {HttpClientModule} from "@angular/common/http";
import {createServiceFactory, SpectatorService} from "@ngneat/spectator";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";

describe('Topping State -- ', () => {
  let store: Store;
  let spectator: SpectatorService<ToppingsState>
  const createService = createServiceFactory({
    service: ToppingsState,
    imports: [
      // NgxsModule.forRoot(),
      NgxsModule.forRoot([ToppingsState]),
      HttpClientModule
    ],
    declarations: [],
    providers: [ToppingsService]

  })
  beforeEach(() => {
    spectator = createService();
    store = spectator.inject(Store);
  })


/*
        {id: 1, name: "anchovy", price: 1.0 },
        {id: 2, name: "bacon", price: 0.8 },
        {id: 1, name: "anchovy", price: 1.0 },
        {id: 4, name: "chili", price: 0.9 },
        {id: 7, name: "olive", price: 1.1 },
        {id: 2, name: "bacon", price: 0.8 },
*/
  it('Should topping update', () => {

    const topp: Topping[] = [
      {id: 1, name: "anchovy", price: 1.0 },
    ]
    store.dispatch(new UpdateToppingsSuccess(topp));
    const toppings = store.selectSnapshot(state => state.toppingsState.selectedToppings);
    // console.log(' toppings', toppings)
    expect(toppings).toEqual(topp);
  });
});
