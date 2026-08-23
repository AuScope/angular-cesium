import { Cartesian3 } from 'cesium';
import { CoordinateConverter } from './../../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { AcLayerComponent } from './../../../../angular-cesium/components/ac-layer/ac-layer.component';
import { Injectable } from '@angular/core';
import { PolygonEditOptions } from '../../../models/polygon-edit-options';
import { EditablePolyline } from '../../../models/editable-polyline';
import { DEFAULT_POLYLINE_OPTIONS } from './polylines-editor.service';

@Injectable()
export class PolylinesManagerService {
  polylines: Map<string, EditablePolyline> = new Map<string, EditablePolyline>();

  createEditablePolyline(id: string, editPolylinesLayer: AcLayerComponent, editPointsLayer: AcLayerComponent,
                         coordinateConverter: CoordinateConverter, polylineOptions?: PolygonEditOptions, positions?: Cartesian3[]) {
    const editablePolyline = new EditablePolyline(
      id,
      editPolylinesLayer,
      editPointsLayer,
      coordinateConverter,
      polylineOptions ?? DEFAULT_POLYLINE_OPTIONS,
      positions);
    this.polylines.set(id, editablePolyline
    );
  }

  get(id: string): EditablePolyline {
    const polyline = this.polylines.get(id);
    if (!polyline) {
      throw new Error(`Polyline '${id}' not found`);
    }
    return polyline;
  }

  clear() {
    this.polylines.forEach(polyline => polyline.dispose());
    this.polylines.clear();
  }
}
