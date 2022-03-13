/**
 * Angular CDK Overlay 를 구현한 것.
 * <pizza-form> 으로부터 호출됨.
 *
 * */

import {Inject, Injectable, InjectionToken, Injector} from '@angular/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
// import {SelectedItemComponent} from './selected-item.component';
import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
// import {Pizza, Topping} from '../../models';
import {Observable, Subject} from 'rxjs';
import {HelpMessageComponent} from './help-message.component';
export const PIZZA_CONFIG_TOKEN = new InjectionToken<Message>('PIZZA_CONFIG_TOKEN');
export class Message {
  constructor(public data: string) {};

}
@Injectable({
  providedIn: 'root'
})
export class HelpMessageService {
  private overlayRef: OverlayRef | undefined;
  // tToppings$: Subject<Topping[]>;  // Toppings for temporary display before saving;
  constructor(private overlay: Overlay,
              private parentInjector: Injector,
  ) {
    // this.tToppings$ = new Subject<Topping[]>();


  }
  closeHelpMessage() {
    this.overlayRef && this.overlayRef.detach();
  }
  openHelpMessage(origin: any, message: any ): OverlayRef {

    this.overlayRef = this.overlay.create( this.getOverlayConfig(origin));
    const injector = this.getInjector(message, this.parentInjector);
    const portal = new ComponentPortal(HelpMessageComponent,null,injector);
    this.overlayRef.attach(portal);
    return  this.overlayRef;
  }
  getOverlayConfig(origin: any) {
    return new OverlayConfig({
      width: '500px',
      height: '500px',
      positionStrategy: this.getOverlayPosition(origin),
    })
  }
  positions = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' })
/*
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
*/
  ];
  getOverlayPosition(origin: any) {
    return this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(this.positions)
      // .withPositions(this.getPositions())
      .withFlexibleDimensions(false)
      .withPush(false)
  }
  getInjector(data: Message, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set( PIZZA_CONFIG_TOKEN, data);

    return new PortalInjector(parentInjector, tokens);
  }

}
