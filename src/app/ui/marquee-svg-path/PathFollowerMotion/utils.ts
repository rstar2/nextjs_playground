/**
 * Wraps a number between a min and max value
 * @param min The minimum value
 * @param max The maximum value
 * @param value The value to wrap
 * @returns The wrapped value between min and max
 */
export const wrap = (min: number, max: number, value: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export type MarqueePathFollowerProps = {
  path: string;
  pathHidden?: boolean;
  baseVelocity?: number;
  hoverVelocity?: number;
};
