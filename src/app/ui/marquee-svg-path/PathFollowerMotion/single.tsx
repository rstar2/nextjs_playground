"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame } from "motion/react";
import { MarqueePathFollowerProps, wrap } from "./utils";

export default function PathFollowerMotion({ path, pathHidden = false, baseVelocity = 20 }: MarqueePathFollowerProps) {
  const baseOffset = useMotionValue(0);
  const offset = useTransform(baseOffset, (v) => `${wrap(0, 100, v)}%`);

  useAnimationFrame((_, delta) => {
    const moveBy = (baseVelocity * delta) / 1000;
    baseOffset.set(baseOffset.get() + moveBy);
  });

  return (
    <div className="relative h-[187px] w-[588px]">
      <svg width="100%" height="100%" viewBox="0 0 588 187" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={path} stroke={pathHidden ? "none" : "black"} fill="none" />
      </svg>
      <motion.div
        className="absolute left-0 top-0 h-8 w-8 rounded-sm bg-black"
        style={{
          offsetPath: `path('${path}')`,
          offsetDistance: offset,
          offsetRotate: "auto",
        }}
      />
    </div>
  );
}
