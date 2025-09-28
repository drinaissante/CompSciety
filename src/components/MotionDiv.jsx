// FOR THE ANIMATION ON LOAD/ SCROLL
import { AnimatePresence, motion } from "framer-motion";

const MotionDiv = ({
  children,
  className = "",
  initial = { opacity: 0, y: 50 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.8, ease: "easeOut" },
  viewport = { once: true },
  hasViewed = undefined,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={hasViewed ? undefined : initial}
        whileInView={whileInView}
        transition={transition}
        viewport={viewport}
        exit={hasViewed ? undefined : { x: -300, opacity: 0 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionDiv;
