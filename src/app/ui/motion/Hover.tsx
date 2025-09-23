"use client";

import { motion } from "motion/react";

export default function Hover() {
  return (
    <motion.button
      className="bg-blue-600"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => console.log("hover started!")}
    >
      Hover
    </motion.button>
  );
}
