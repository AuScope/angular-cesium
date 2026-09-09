import { Injectable } from '@angular/core';
import { Cartesian3 } from 'cesium';
import { EditablePolygon } from '../../../models/editable-polygon';
import { PolygonEditOptions } from '../../../models/polygon-edit-options';
import { AcLayerComponent } from '../../../../angular-cesium/components/ac-layer/ac-layer.component';
import { CoordinateConverter } from '../../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { DEFAULT_POLYGON_OPTIONS } from './polygons-editor.service';

@Injectable()
export class PolygonsManagerService {
  polygons: Map<string, EditablePolygon> = new Map<string, EditablePolygon>();

  createEditablePolygon(id: string, editPolygonsLayer: AcLayerComponent, editPointsLayer: AcLayerComponent,
                        editPolylinesLayer: AcLayerComponent, coordinateConverter: CoordinateConverter,
                        polygonOptions: PolygonEditOptions, positions?: Cartesian3[]) {
    const editablePolygon = new EditablePolygon(
      id,
      editPolygonsLayer,
      editPointsLayer,
      editPolylinesLayer,
      coordinateConverter,
      polygonOptions ?? DEFAULT_POLYGON_OPTIONS,
      positions);
    this.polygons.set(id, editablePolygon
    );
  }

  dispose(id: string) {
    const polygon = this.polygons.get(id);
    if (polygon) {
      polygon.dispose();
    }
    this.polygons.delete(id);
  }

  get(id: string): EditablePolygon {
    const polygon = this.polygons.get(id);
    if (!polygon) {
      throw new Error(`Polygon '${id}' not found`);
    }
    return polygon;
  }

  clear() {
    this.polygons.forEach(polygon => polygon.dispose());
    this.polygons.clear();
  }
}
