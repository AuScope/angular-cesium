import { publish } from 'rxjs/operators';
import { CesiumService } from '../cesium/cesium.service';
import { CesiumEvent } from './consts/cesium-event.enum';
import { CesiumEventModifier } from './consts/cesium-event-modifier.enum';
import { Injectable } from '@angular/core';
import { CesiumPureEventObserver } from './event-observers/cesium-pure-event-observer';
import { CesiumLongPressObserver } from './event-observers/cesium-long-press-observer';
import { ConnectableObservable } from 'rxjs';

@Injectable()
export class CesiumEventBuilder {

  public static longPressEvents: Set<CesiumEvent> = new Set([
    CesiumEvent.LONG_LEFT_PRESS,
    CesiumEvent.LONG_RIGHT_PRESS,
    CesiumEvent.LONG_MIDDLE_PRESS
  ]);

  private eventsHandler: any;
  private cesiumEventsObservables = new Map<string, ConnectableObservable<any>>();

  constructor(private cesiumService: CesiumService) {
  }

  public static getEventFullName(event: CesiumEvent, modifier?: CesiumEventModifier): string {
    if (modifier && event) {
      return `${event}_${modifier}`;
    } else if (event) {
      return event.toString();
    } else {
      throw new Error('Event is required to get event full name');
    }
  }

  init() {
    this.eventsHandler = this.cesiumService.getViewer().screenSpaceEventHandler;
  }

  get(event: CesiumEvent, modifier?: CesiumEventModifier): ConnectableObservable<any> {
    const eventName = CesiumEventBuilder.getEventFullName(event, modifier);
    const existingEvent = this.cesiumEventsObservables.get(eventName);
    if (existingEvent !== undefined) {
      return existingEvent;
    }
    const eventObserver = this.createCesiumEventObservable(event, modifier);
    this.cesiumEventsObservables.set(eventName, eventObserver);
    return eventObserver;
  }

  private createCesiumEventObservable(event: CesiumEvent, modifier?: CesiumEventModifier): ConnectableObservable<any> {
    let cesiumEventObservable: ConnectableObservable<any>;
    if (CesiumEventBuilder.longPressEvents.has(event)) {
      cesiumEventObservable = this.createSpecialCesiumEventObservable(event, modifier);
    } else {
      cesiumEventObservable = publish()(new CesiumPureEventObserver(event, modifier).init(this.eventsHandler));
    }
    cesiumEventObservable.connect();
    return cesiumEventObservable;
  }

  private createSpecialCesiumEventObservable(event: CesiumEvent, modifier: CesiumEventModifier | undefined): ConnectableObservable<any> {
    // could support more events if needed
    return new CesiumLongPressObserver(event, modifier, this).init();
  }
}

