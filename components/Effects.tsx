import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

import { BlendFunction } from "postprocessing";

import { useControls, folder } from "leva";

export function Effects() {
  const { bloomEnabled, ...bloomProps } = useControls("Effects", {
    Bloom: folder({
      bloomEnabled: true,
      luminanceThreshold: { value: 1, min: -10, max: 1, step: 0.01 },
      mipmapBlur: false,
      luminanceSmoothing: { value: 0.05, min: -50, max: 35, step: 0.01 },
      intensity: { value: 0.05, min: -10, max: 15, step: 0.01 },
    }),
  });

  const { ...noiseProps } = useControls("Effects", {
    Noise: folder({
      premultiply: true,
      blendFunction: {
        value: BlendFunction.ALPHA,
        options: BlendFunction,
      },
      opacity: { value: 0.39, min: 0, max: 1, step: 0.01 },
      intensity: { value: 0.25, min: 0, max: 1, step: 0.01 },
      seed: { value: 0, min: 0, max: 1, step: 0.01 },
    }),
  });

  return (
    <EffectComposer>
      <Bloom {...bloomProps} />
      {/* <Noise
        premultiply={noiseProps.premultiply}
        blendFunction={noiseProps.blendFunction as BlendFunction}
        opacity={noiseProps.opacity}
      /> */}
    </EffectComposer>
  );
}
