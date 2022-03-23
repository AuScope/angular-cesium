import { Cartesian2 as cCartesian2, Cartesian3 as cCartesian3, Color, HeightReference, HorizontalOrigin,
         LabelStyle as cLabelStyle, VerticalOrigin } from 'cesium';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';
import { Cartesian2 } from '../../angular-cesium/models/cartesian2';


export interface LabelStyle {
  show?: boolean;
  font?: string;
  style?: any;
  fillColor?: any;
  outlineColor?: any;
  backgroundColor?: any;
  backgroundPadding?: any;
  showBackground?: boolean;
  scale?: number;
  distanceDisplayCondition?: any;
  heightReference?: any;
  horizontalOrigin?: any;
  eyeOffset?: Cartesian3;
  position?: Cartesian3;
  pixelOffset?: Cartesian2;
  pixelOffsetScaleByDistance?: any;
  outlineWidth?: any;
  scaleByDistance?: any;
  translucencyByDistance?: any;
  verticalOrigin?: any;
  disableDepthTestDistance?: number;
}

export interface LabelProps {
  text: string;
  show?: boolean;
  font?: string;
  style?: any;
  fillColor?: any;
  outlineColor?: any;
  backgroundColor?: any;
  backgroundPadding?: any;
  showBackground?: boolean;
  scale?: number;
  distanceDisplayCondition?: any;
  heightReference?: any;
  horizontalOrigin?: any;
  eyeOffset?: Cartesian3;
  position?: Cartesian3;
  pixelOffset?: Cartesian2;
  pixelOffsetScaleByDistance?: any;
  outlineWidth?: any;
  scaleByDistance?: any;
  translucencyByDistance?: any;
  verticalOrigin?: any;
  disableDepthTestDistance?: number;
}

export const defaultLabelProps: LabelProps = {
  backgroundColor: new Color(0.165, 0.165, 0.165, 0.7),
  backgroundPadding: new cCartesian2(25, 20),
  distanceDisplayCondition: undefined,
  fillColor: Color.WHITE,
  font: '30px sans-serif',
  heightReference: HeightReference.NONE,
  horizontalOrigin: HorizontalOrigin.LEFT,
  outlineColor: Color.BLACK,
  outlineWidth: 1.0,
  pixelOffset: cCartesian2.ZERO,
  pixelOffsetScaleByDistance: undefined,
  scale: 1.0,
  scaleByDistance: undefined,
  show: true,
  showBackground: false,
  style: cLabelStyle.FILL,
  text: '',
  translucencyByDistance: undefined,
  verticalOrigin: VerticalOrigin.BASELINE,
  eyeOffset: cCartesian3.ZERO,
  disableDepthTestDistance: 0,
};
