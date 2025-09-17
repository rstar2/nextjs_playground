"use client";

import React, { useMemo, useRef } from "react";

import { motion, useMotionValue, useTransform, useAnimationFrame, MotionValue, useSpring } from "motion/react";
import { MarqueePathFollowerProps, wrap } from "./utils";

// See https://tympanus.net/codrops/2025/06/17/building-an-infinite-marquee-along-an-svg-path-with-react-motion/
export default function PathFollowerMotion({
  path,
  pathHidden = false,
  baseVelocity = 20,
  hoverVelocity,
  repeat = 1,
  children,
}: MarqueePathFollowerProps & { repeat?: number; children: React.ReactNode }) {
  const baseOffset = useMotionValue(0);

  const isHoveredRef = useRef(false);

  // use these to create a smooth speed transition when hovering
  const hoverFactorValue = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactorValue, {
    stiffness: 100,
    damping: 20,
  });

  useAnimationFrame((_, delta) => {
    // // allow on hover to override the base velocity
    // // this will create an abrupt transition
    // const velocity = hoverVelocity !== undefined && isHoveredRef.current ? hoverVelocity : baseVelocity;
    // const moveBy = (velocity * delta) / 1000;
    // baseOffset.set(baseOffset.get() + moveBy);

    // allow on hover to override the base velocity
    // this will create an smooth spring transition (could adjust this 0.3 factor based on the hoverVelocity)
    hoverFactorValue.set(isHoveredRef.current ? 0.3 : 1);
    const moveBy = ((baseVelocity * delta) / 1000) * smoothHoverFactor.get();
    baseOffset.set(baseOffset.get() + moveBy);
  });

  const items = useMemo(() => {
    const childrenArray = React.Children.toArray(children);

    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => {
        const itemIndex = repeatIndex * childrenArray.length + childIndex;
        const key = `${childIndex}-${repeatIndex}`;
        return {
          child,
          childIndex,
          repeatIndex,
          itemIndex,
          key,
        };
      }),
    );
  }, [children, repeat]);

  return (
    <div className="relative h-[187px] w-[588px]">
      <svg width="100%" height="100%" viewBox="0 0 588 187" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={path} stroke={pathHidden ? "none" : "black"} fill="none" />
      </svg>

      {items.map(({ child, repeatIndex, itemIndex, key }) => {
        return (
          <MarqueeItem
            key={key}
            baseOffset={baseOffset}
            path={path}
            itemIndex={itemIndex}
            totalItems={items.length}
            repeatIndex={repeatIndex}
            onHover={hoverVelocity !== undefined ? (isEnter) => (isHoveredRef.current = isEnter) : undefined}
          >
            {child}
          </MarqueeItem>
        );
      })}
    </div>
  );
}

type MarqueeItemProps = {
  baseOffset: MotionValue<number>;
  path: string;
  itemIndex: number;
  totalItems: number;
  repeatIndex: number;
  children: React.ReactNode;
  zIndexBase?: number;
  onHover?(isEnter: boolean): void;
};

function MarqueeItem({
  baseOffset,
  path,
  itemIndex,
  totalItems,
  repeatIndex,
  children,
  zIndexBase = 0,
  onHover,
}: MarqueeItemProps) {
  const itemOffset = useTransform(baseOffset, (v: number) => {
    // Distribute items evenly along the path
    const position = (itemIndex * 100) / totalItems;
    const wrappedValue = wrap(0, 100, v + position);
    return `${wrappedValue}%`;
  });

  // adjust the z-index based on the progress along the path,
  // the further along the path, the higher the z-index
  const zIndex = useTransform(itemOffset, (v) => {
    const progress = parseFloat(v.replace("%", ""));
    return Math.floor(zIndexBase + progress);
  });

  return (
    <motion.div
      className="absolute left-0 top-0 h-8 w-8 rounded-sm bg-black"
      //   className="absolute left-0 top-0 h-8 w-8 rounded-sm"
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        offsetRotate: "auto",
        zIndex,
      }}
      aria-hidden={repeatIndex > 0}
      onMouseEnter={onHover ? () => onHover(true) : undefined}
      onMouseLeave={onHover ? () => onHover(false) : undefined}
    >
      {children}
    </motion.div>
  );
}
