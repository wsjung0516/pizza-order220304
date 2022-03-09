/**
 * Angular CDK Overlay 를 구현한 것.
 * <pizza-form> 으로부터 호출됨.
 *
 * */

import {Inject, Injectable, InjectionToken, Injector} from '@angular/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {Pizza} from "../models";
import {
  SelectedToppingListComponent
} from "../components/selected-toppings/selected-topping-list/selected-topping-list.component";
export const PIZZA_CONFIG_TOKEN = new InjectionToken<Pizza>('PIZZA_CONFIG_TOKEN');

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {
  private overlayRef: OverlayRef | undefined;
// Toppings for temporary display before saving;

  constructor(private overlay: Overlay,
              private parentInjector: Injector,
               ) {
    // this.tToppings$ = new Subject<Topping[]>();


  }

  openSelectedToppings(origin: any, pizza: Pizza): OverlayRef {
    this.overlayRef = this.overlay.create( this.getOverlayConfig(origin));
    const injector = this.getInjector(pizza, this.parentInjector);
    const portal = new ComponentPortal(SelectedToppingListComponent,null,injector);
    this.overlayRef.attach(portal);
    return  this.overlayRef;
  }
  getOverlayConfig(origin : any) {
    return new OverlayConfig({
      width: '200px',
      height: '100px',
      positionStrategy: this.getOverlayPosition(origin),
    })
  }
  positions = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
  ];
  getOverlayPosition(origin: any) {
    return this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(this.positions)
      // .withPositions(this.getPositions())
      .withFlexibleDimensions(false)
      .withPush(false)
  }
  getInjector(data: Pizza, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set( PIZZA_CONFIG_TOKEN, data);

    return new PortalInjector(parentInjector, tokens);
  }

}
