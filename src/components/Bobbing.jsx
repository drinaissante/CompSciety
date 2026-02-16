import { motion } from "framer-motion";

function Bobbing({logo, className}) {
   return (
    <div className="relative inline-block">

        <motion.div
            className="absolute -bottom-8 left-1/2
                    lg:-translate-x-1/5
                    -translate-x-1/2
                    w-40 h-16
                    bg-green-400
                    blur-2xl
                    opacity-50
                    rounded-full"
            animate={{ y: [0, -12, 0] }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />

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
            className={`${className} relative z-10`}
        />

    </div>

   )
}

export default Bobbing