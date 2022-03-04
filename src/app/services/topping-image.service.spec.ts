import { ToppingImageService } from './topping-image.service';
import {createServiceFactory, SpectatorService} from '@ngneat/spectator';

describe('ToppingImageService Without Mock', () => {
  let spectator: SpectatorService<ToppingImageService>;
  const createService = createServiceFactory({
    service: ToppingImageService,
    // mocks: [OtherService]
  });
  beforeEach(() => spectator = createService());

  it('should be 0', () => {
    expect(spectator.service.counter).toEqual(0);
  });
  it('should set images for each toppings', () => {
    const toppings = [
      {id: 1, name: "anchovy"},
      {id: 2, name: "bacon"},
      {id: 1, name: "anchovy"},
      {id: 4, name: "chili"},
      {id: 7, name: "olive"},
      {id: 2, name: "bacon"},
      {id: 7, name: "olive"},
      {id: 6, name: "mushroom"},
      {id: 7, name: "olive"},
    ];
    const each_image_toppings = [
      {id: 1, name: "anchovy", image:"anchovy_1"},
      {id: 2, name: "bacon", image:"bacon_1"},
      {id: 1, name: "anchovy", image:"anchovy_2"},
      {id: 4, name: "chili", image:"chili_1"},
      {id: 7, name: "olive", image:"olive_1"},
      {id: 2, name: "bacon", image:"bacon_2"},
      {id: 7, name: "olive", image:"olive_2"},
      {id: 6, name: "mushroom", image:"mushroom_1"},
      {id: 7, name: "olive", image:"olive_3"},
    ];
    expect(spectator.service.setEachToppingImage(toppings)).toEqual(each_image_toppings);
  });

});
