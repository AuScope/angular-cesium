import { EditPoint } from './edit-point';
import { EditorObservable } from './editor-observable';
import { PolylineEditUpdate } from './polyline-edit-update';
import { PointProps, PolylineProps } from './polyline-edit-options';

export class PolylineEditorObservable extends EditorObservable<PolylineEditUpdate> {
  setManually: (points: {position: Cartesian3, pointProp?: PointProps}[] | Cartesian3[], polylineProps?: PolylineProps) => void;
	polylineEditValue: () => PolylineEditUpdate;
	getCurrentPoints: () => EditPoint[];
}
