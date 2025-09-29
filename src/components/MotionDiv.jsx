// FOR THE ANIMATION ON LOAD/ SCROLL
import { AnimatePresence, motion } from "framer-motion";

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

export const MotionDivExit = ({
  children,
  className = "",
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  exit = { x: -300, opacity: 0 },
  transition = { duration: 0.8, ease: "easeOut" },
  hasViewed = false,
  isVisible = true, // control rendering
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          key="motion-exit"
          initial={hasViewed ? false : initial} // skip initial if already viewed
          animate={animate}
          exit={hasViewed ? false : exit} // skip exit if already viewed
          transition={transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotionDiv;
