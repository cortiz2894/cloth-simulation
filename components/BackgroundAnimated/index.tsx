"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./BackgroundAnimated.module.scss";

const BackgroundAnimated = () => {
  const interactive = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ curX: 0, curY: 0 });
  const targetRef = useRef({ tgX: 0, tgY: 0 });

  const move = useCallback(() => {
    setPosition((prev) => ({
      curX: prev.curX + (targetRef.current.tgX - prev.curX) / 20,
      curY: prev.curY + (targetRef.current.tgY - prev.curY) / 20,
    }));
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      move();
      requestAnimationFrame(animate);
    });

    const handleMouseMove = (event: MouseEvent) => {
      targetRef.current = {
        tgX: event.clientX,
        tgY: event.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [move]);

  useEffect(() => {
    if (interactive.current) {
      interactive.current.style.transform = `translate(${Math.round(
        position.curX
      )}px, ${Math.round(position.curY)}px)`;
    }
  }, [position]);

  return (
    <div className={styles.gradient}>
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.svgBlur}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles.gradientsContainer}>
        <div className={styles.g1}></div>
        <div className={styles.g2}></div>
        <div className={styles.g3}></div>
        <div className={styles.g4}></div>
        <div className={styles.g5}></div>
        <div className={styles.interactive} ref={interactive}></div>
      </div>
    </div>
  );
};

export default BackgroundAnimated;
