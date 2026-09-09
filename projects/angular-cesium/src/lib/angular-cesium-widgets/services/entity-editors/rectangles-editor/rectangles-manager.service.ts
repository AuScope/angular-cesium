import { Injectable } from '@angular/core';
import { Cartesian3 } from 'cesium';
import { EditableRectangle } from '../../../models/editable-rectangle';
import { RectangleEditOptions } from '../../../models/rectangle-edit-options';
import { AcLayerComponent } from '../../../../angular-cesium/components/ac-layer/ac-layer.component';
import { CoordinateConverter } from '../../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { DEFAULT_RECTANGLE_OPTIONS } from './rectangles-editor.service';

@Injectable()
export class RectanglesManagerService {
  rectangles: Map<string, EditableRectangle> = new Map<string, EditableRectangle>();

  createEditableRectangle(
    id: string,
    editRectanglesLayer: AcLayerComponent,
    editPointsLayer: AcLayerComponent,
    coordinateConverter: CoordinateConverter,
    rectangleOptions?: RectangleEditOptions,
    positions?: Cartesian3[]
  ) {
    const editableRectangle = new EditableRectangle(
      id,
      editPointsLayer,
      editRectanglesLayer,
      coordinateConverter,
      rectangleOptions ?? DEFAULT_RECTANGLE_OPTIONS,
      positions
    );

    this.rectangles.set(id, editableRectangle);
  }

  dispose(id: string) {
    const rectangle = this.rectangles.get(id);
    if (!rectangle) {
      throw new Error(`Rectangle '${id}' not found`);
    }
    rectangle.dispose();
    rectangle.delete(id);
  }

  get(id: string): EditableRectangle {
    const rectangle = this.rectangles.get(id);
    if (!rectangle) {
      throw new Error(`Rectangle '${id}' not found`);
    }
    return rectangle;
  }

  clear() {
    this.rectangles.forEach(rectangle => rectangle.dispose());
    this.rectangles.clear();
  }
}

