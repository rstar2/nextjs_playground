"use client";

import { useState } from "react";
import { motion } from "motion/react";

// Motion supports animating between changes in layout using transforms
// Any layout change that happens as a result of a React render will now be automatically animated.
// Note: Layout changes should happen statically via style or className,
// not via animation props like animate or whileHover, as layout will take care of the animation.
export default function Layout() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <>
      <h2 className="underline">Layout change</h2>
      <button
        className="toggle-container"
        style={{
          ...container,
          justifyContent: "flex-" + (isOn ? "start" : "end"),
        }}
        onClick={toggleSwitch}
      >
        <motion.div
          className="toggle-handle"
          style={handle}
          layout
          transition={{
            type: "spring",
            visualDuration: 0.2,
            bounce: 0.2,
          }}
        />
      </button>
    </>
  );
}

/**
 * ==============   Styles   ================
 */

const container = {
  width: 120,
  backgroundColor: "blue",
  borderRadius: 50,
  cursor: "pointer",
  display: "flex",
  padding: 10,
};

const handle = {
  width: 50,
  height: 50,
  backgroundColor: "#9911ff",
  borderRadius: "50%",
};
