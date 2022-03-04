import { PriceService } from './price.service';
import {createServiceFactory, SpectatorService} from '@ngneat/spectator';
import {Pizza, Topping} from '../models';
import {NgxsModule, Store} from '@ngxs/store';

describe('PriceService Without Mock', () => {
  let spectator: SpectatorService<PriceService>;
  const createService = createServiceFactory({
    imports: [
      NgxsModule.forRoot()
    ],
    service: PriceService,
    mocks: [Store]
  });
  beforeEach(() => {
    spectator = createService();
  })

  it('should be 0', () => {
     expect(spectator.service.counter).toEqual(0);
  });

  it('should calc sub total of each toppings', () => {
    let ttoppings : Topping[] = [
        {id: 1, name: "anchovy", price: 1.0 },
        {id: 2, name: "bacon", price: 0.8 },
        {id: 1, name: "anchovy", price: 1.0 },
        {id: 4, name: "chili", price: 0.9 },
        {id: 7, name: "olive", price: 1.1 },
        {id: 2, name: "bacon", price: 0.8 },
        {id: 7, name: "olive", price: 1.1 },
        {id: 6, name: "mushroom", price: 0.7 },
        {id: 7, name: "olive", price: 1.1 },
      ]
    let rtoppings : Topping[] = [
      {id: 1, name: "anchovy", count: 2, price: 1.0 },
      {id: 2, name: "bacon", count: 2, price: 0.8 },
      {id: 4, name: "chili", count: 1, price: 0.9 },
      {id: 7, name: "olive", count: 3, price: 1.1 },
      {id: 6, name: "mushroom", count: 1, price: 0.7 },
      ]

    expect(spectator.service.calcSubTotalToppings(ttoppings)).toEqual(rtoppings);
  });
  it('should calc total price for toppings', () => {
    let topp : Topping[] =  [
      {id: 1, name: "anchovy", count: 2},
      {id: 2, name: "bacon", count: 2},
      {id: 4, name: "chili", count: 1},
      {id: 7, name: "olive", count: 3},
      {id: 6, name: "mushroom", count: 5},
    ];
    let rtopp : any[] =  [
      {id: 1, name: "anchovy", count: 2, price: 1.0 },
      {id: 2, name: "bacon", count: 2, price: 0.8 },
      {id: 4, name: "chili", count: 1, price: 0.9 },
      {id: 7, name: "olive", count: 3, price: 1.1 },
      {id: 6, name: "mushroom", count: 5, price: 0.7 },
    ];
    let total = "11,300"
    expect(spectator.service.calcTotal(rtopp)).toEqual(total);
  });

});
