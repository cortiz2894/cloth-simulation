"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Object3D, Vector2 } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useFrame, useThree } from "@react-three/fiber";
//@ts-ignore
import { WiggleBone } from "wiggle";

type GLTFResult = GLTF & {
  nodes: {
    zipper: THREE.Mesh;
    Cube001: THREE.Mesh & { skeleton: THREE.Skeleton };
    Cube001_1: THREE.Mesh & { skeleton: THREE.Skeleton };
    neutral_bone: THREE.Bone;
    Bone: THREE.Bone;
    Bone001: THREE.Bone;
    Bone002: THREE.Bone;
    Bone003: THREE.Bone;
    Bone004: THREE.Bone;
    Bone005: THREE.Bone;
    Bone006: THREE.Bone;
    Bone007: THREE.Bone;
    Bone008: THREE.Bone;
    Bone009: THREE.Bone;
    Bone010: THREE.Bone;
  };
  materials: {
    metal: THREE.Material;
    "shirt material": THREE.Material;
  };
};

type ModelProps = {} & JSX.IntrinsicElements["group"];

export function Model({ ...props }: ModelProps) {
  const group = useRef<Object3D>(null);
  const clothRef = useRef<Object3D>(null);

  const { nodes, materials } = useGLTF(
    "glb/clothes_simulation_armature.glb"
  ) as GLTFResult;

  const wiggleBones = useRef<WiggleBone[]>([]);
  const [targetRotation, setTargetRotation] = useState(new Vector2(0, 0));
  const currentRotation = useRef(new Vector2(0, 0));
  const { size } = useThree();

  console.log(nodes);

  useEffect(() => {
    if (!nodes.Bone || !nodes.Bone001 || !nodes.Bone002 || !nodes.Bone003) {
      console.error("Faltan huesos requeridos en el modelo.");
      return;
    }

    wiggleBones.current.push(
      new WiggleBone(nodes.Bone005, { stiffness: 1000, damping: 100 })
    );
    wiggleBones.current.push(
      new WiggleBone(nodes.Bone006, { stiffness: 1000, damping: 100 })
    );
    wiggleBones.current.push(
      new WiggleBone(nodes.Bone007, { stiffness: 1000, damping: 100 })
    );
    wiggleBones.current.push(
      new WiggleBone(nodes.Bone008, { stiffness: 1000, damping: 100 })
    );
    wiggleBones.current.push(
      new WiggleBone(nodes.Bone009, { stiffness: 1000, damping: 100 })
    );
    wiggleBones.current.push(
      new WiggleBone(nodes.Bone010, { stiffness: 1000, damping: 100 })
    );

    return () => {
      wiggleBones.current.forEach((wb) => wb.dispose());
    };
  }, [nodes]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const rotationX = (clientY / size.height - 0.5) * (Math.PI / 2);
      const rotationY = (clientX / size.width - 0.5) * Math.PI;
      setTargetRotation(new Vector2(rotationX, rotationY));
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size]);

  useFrame((state, delta) => {
    wiggleBones.current.forEach((wb) => wb.update());

    // Soft rotation
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const lerpFactor = 1 - Math.pow(0.01, delta);

    currentRotation.current.x = lerp(
      currentRotation.current.x,
      targetRotation.x,
      lerpFactor
    );
    currentRotation.current.y = lerp(
      currentRotation.current.y,
      targetRotation.y,
      lerpFactor
    );

    if (clothRef.current) {
      clothRef.current.rotation.x = currentRotation.current.x;
      clothRef.current.rotation.y = currentRotation.current.y;
    }
  });

  return (
    <group>
      <group {...props} ref={group} dispose={null}>
        {/* Malla del cierre */}
        {/* <mesh
          castShadow
          receiveShadow
          geometry={nodes.zipper.geometry}
          material={materials.metal}
          position={[0.11, -0.054, 1.49]}
        /> */}
        <group position={[0, -3.069, 0]} ref={clothRef}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.neutral_bone} />
          <skinnedMesh
            geometry={nodes.Cube001.geometry}
            material={materials["shirt material"]}
            skeleton={nodes.Cube001.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Cube001_1.geometry}
            material={materials.metal}
            skeleton={nodes.Cube001_1.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("glb/clothes_simulation_armature.glb");
