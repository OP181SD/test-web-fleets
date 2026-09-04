"use client";

import { type MotionStyle, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, useCallback, useEffect, useState } from "react";

const TILT_LIMIT = 12;
const SCALE = 1.03;
const SPRING = { stiffness: 150, damping: 15, mass: 0.5 };

export interface TiltHandlers {
  onMouseMove?: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: () => void;
  style: MotionStyle;
}

export function useTilt(): TiltHandlers {
  const [reduce, setReduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduce(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);
  const springScale = useSpring(scale, SPRING);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(py * TILT_LIMIT);
      rotateY.set(-px * TILT_LIMIT);
      scale.set(SCALE);
    },
    [rotateX, rotateY, scale],
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }, [rotateX, rotateY, scale]);

  if (reduce) {
    return { style: {} };
  }

  return {
    onMouseMove,
    onMouseLeave,
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      scale: springScale,
      transformStyle: "preserve-3d",
      willChange: "transform",
      transform: "translateZ(0)",
    },
  };
}
