"use client";

import React, { useState } from "react";
import classNames from "classnames";
import styles from "./AnimationController.module.scss";
import {
  ANIMATION_EMOJIS,
  ANIMATION_NAMES,
  INIT_ANIMATION,
} from "@/constants/animations";
import { AnimationOptions } from "@/types/animations";

interface AnimationControllerProps {
  toggleAnimation: (animationName: AnimationOptions) => void;
}

export function AnimationController({
  toggleAnimation,
}: AnimationControllerProps) {
  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationOptions | null>(INIT_ANIMATION);

  const handleAnimationClick = (animation: AnimationOptions) => {
    setSelectedAnimation(animation);
    toggleAnimation(animation);
  };

  return (
    <>
      <div className={styles.divider}>
        <div className={styles.lineGradient}></div>
      </div>

      <div className="w-full flex flex-col justify-end">
        <p className="text-2xl mb-6 font-light">List Animations</p>

        <ul className="grid grid-cols-4 gap-4">
          {ANIMATION_NAMES.map((animation) => (
            <li key={animation}>
              <button
                onClick={() => handleAnimationClick(animation)}
                className={classNames(
                  "px-4 py-2 border-2 border-white/50 rounded-lg text-center w-full text-3xl text-white hover:border-white hover:bg-white/10",
                  styles.selectAnimationBtn,
                  selectedAnimation === animation && styles.active
                )}
              >
                {ANIMATION_EMOJIS[animation]}
                <span className="block text-sm mt-2">{animation}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
