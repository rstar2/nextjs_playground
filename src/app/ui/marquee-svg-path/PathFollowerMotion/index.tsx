"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame } from "motion/react";

import "./index.css";

/**
 * Wraps a number between a min and max value
 * @param min The minimum value
 * @param max The maximum value
 * @param value The value to wrap
 * @returns The wrapped value between min and max
 */
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type MarqueePathFollowerProps = {
  path: string;
  baseVelocity: number;
};

export default function PathFollowerMotion({ path, baseVelocity }: MarqueePathFollowerProps) {
  const baseOffset = useMotionValue(0);
  const offset = useTransform(baseOffset, (v) => `${wrap(0, 100, v)}%`);

  useAnimationFrame((_, delta) => {
    const moveBy = (baseVelocity * delta) / 1000;
    baseOffset.set(baseOffset.get() + moveBy);
  });

  return (
    <div className="marquee-container-motion">
      <svg width="100%" height="100%" viewBox="0 0 588 187" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={path} stroke="black" fill="none" />
      </svg>
      <motion.div
        className="marquee-item"
        style={{
          offsetPath: `path('${path}')`,
          offsetDistance: offset,
          offsetRotate: "auto",
        }}
      />
    </div>
  );
}
