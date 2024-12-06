import {
  Object3DProps,
  BufferGeometryProps,
  MaterialProps,
} from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: Object3DProps;
      mesh: Object3DProps & {
        geometry?: BufferGeometryProps;
        material?: MaterialProps;
      };
      pointLight: Object3DProps;
      ambientLight: Object3DProps;
    }
  }
}
