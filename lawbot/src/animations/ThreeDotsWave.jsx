import { motion } from "framer-motion";
import React from "react";

const LoadingDot = {
  display: "flex",
  width: "0.60rem",
  height: "0.60rem",
  backgroundColor: "white",
  borderRadius: "50%"
};

const LoadingContainer = {
  gap: "10px",
  display: "flex",
  justifyContent: "space-around"
};

const DotVariants = {
  initial: { y: 0 },
  animate: { y: -3 }
};

const DotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut"
};

export default function ThreeDotsWave() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div style={LoadingContainer}>
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...DotTransition, delay: 0 }}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...DotTransition, delay: 0.2 }}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...DotTransition, delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
}