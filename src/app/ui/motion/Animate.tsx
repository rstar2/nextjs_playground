"use client";

import { motion } from "motion/react";

// use ShadCN button with Motion
import { Button } from "@/components/ui/button";
const MotionButton = motion(Button);

export default function Animate() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#ff0088",
          borderRadius: 5,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1 }}
      />

      <motion.button
        className="bg-red-600"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 3,
          },
        }}
      >
        Button
      </motion.button>

      <MotionButton
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 3,
          },
        }}
      >
        ShadCN Button
      </MotionButton>
    </div>
  );
}
