import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AcLayerComponent, AcNotification, ActionType } from 'angular-cesium';
import { MockDataProviderService } from '../../utils/services/dataProvider/mock-data-provider.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ellipse-layer',
    templateUrl: 'ellipse-layer.component.html',
    styleUrls: ['ellipse-layer.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EllipseLayerComponent implements OnInit {
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  ellipses$: Observable<AcNotification>;
  Cesium = Cesium;
  show = true;

  constructor(private tracksDataProvider: MockDataProviderService) {
  }

  ngOnInit() {
    this.ellipses$ = this.tracksDataProvider.getDataSteam$().pipe(map(entity => ({
      id: entity.id,
      actionType: ActionType.ADD_UPDATE,
      entity: entity,
    })));
  }

  removeAll() {
    this.layer.removeAll();
  }

  setShow($event: boolean) {
    this.show = $event;
  }
}
