// FOR THE ANIMATION ON LOAD/ SCROLL
import { motion } from "framer-motion";

const MotionDiv = ({
  children,
  className = "",
  initial = { opacity: 0, y: 50 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.8, ease: "easeOut" },
  viewport = { once: true },
}) => {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
