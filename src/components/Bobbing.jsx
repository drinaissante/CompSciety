import { motion } from "framer-motion";

function Bobbing({logo, className}) {
   return (
        <motion.img
            src={logo}
            alt="CompSciety"
            animate={{ y: [0, -12, 0] }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            draggable={false}
            loading="lazy"
            decoding="async"
            className={className}
        />
   )
}

export default Bobbing