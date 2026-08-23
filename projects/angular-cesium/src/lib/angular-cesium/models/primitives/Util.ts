declare const Cesium: any;

export function to2D(frameState: any, points: any) {
	const unpacked: any = [];
	const repacked: any = [];

	Cesium.Cartesian3.unpackArray(points, unpacked);
	Cesium.Cartesian3.packArray(unpacked.map((p: any) => Cesium.SceneTransforms.computeActualWgs84Position(frameState, p)), repacked);

	return repacked;
}

export function createSimpleIndicesArray(size: number): Uint16Array {
	const indicesArray = [];

	for (let i = 0; i < size; i++) {
		indicesArray.push(i);
	}

	return new Uint16Array(indicesArray);
}

export function isTranslucent(color:number[]){
	return color[3] < 1.0;
}