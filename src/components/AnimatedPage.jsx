import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: "-100vw", opacity: 0 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: "100%", minHeight: "100vh" }} // ✅ minHeight 추가
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
