"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrthographicCamera, Environment } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { Effects } from "./Effects";
import { useRef, useState } from "react";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const { positionX, positionY, positionZ, directionalIntensity } = useControls(
    "Controls",
    {
      positionX: { value: 0, min: -20, max: 20 },
      positionY: { value: 0, min: -20, max: 20 },
      positionZ: { value: 30, min: -50, max: 50 },
      directionalIntensity: { value: 0.8, min: 0, max: 1, step: 0.1 },
    }
  );

  return (
    <section className="flex flex-col lg:flex-row gap-10 w-full h-screen">
      <div className="w-full h-full relative" ref={containerRef}>
        <Leva collapsed />
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <OrthographicCamera
            makeDefault
            zoom={80}
            position={[positionX, positionY, positionZ]}
          />
          {/* <OrbitControls enablePan={false} makeDefault enableZoom={false} /> */}
          <ambientLight />
          <directionalLight
            position={[5, 5, 5]}
            intensity={directionalIntensity}
            castShadow
          />
          <Environment preset="studio" />
          <Effects />
          <Model />
        </Canvas>
      </div>
    </section>
  );
}
