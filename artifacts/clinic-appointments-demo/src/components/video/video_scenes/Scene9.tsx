import { motion } from "framer-motion";
import { Check, HeartPulse, MapPin, Phone } from "lucide-react";

import { EASE, Kicker, SceneFooter, SceneShell, Wordmark } from "./Shared";

export function Scene9() {
   return (
      <SceneShell tint="ink">
         <motion.div
            className="absolute -left-[8vmin] top-[18vmin] h-[42vmin] w-[42vmin] rounded-full border-[1.2vmin] border-[#f29d63]/30"
            animate={{ rotate: [0, 16, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div
            className="absolute -right-[9vmin] bottom-[7vmin] h-[48vmin] w-[48vmin] rounded-full bg-[#276b63]/80"
            animate={{ x: [0, -18, 0], y: [0, 8, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
         />
         <div className="absolute left-[6vmin] top-[4vmin] z-20">
            <Wordmark light />
         </div>
         <div className="relative z-10 flex h-full items-center justify-center px-[8vmin] text-center">
            <div className="flex flex-col items-center">
               <motion.div
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
               >
                  <Kicker light>OCare clinic</Kicker>
               </motion.div>
               <motion.div
                  className="mt-[4vmin] flex h-[10vmin] w-[10vmin] items-center justify-center rounded-[3vmin] bg-[#f29d63] text-[#123837] ui-shadow"
                  initial={{ rotate: -12, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.85, ease: EASE }}
               >
                  <HeartPulse size="5vmin" strokeWidth={1.8} />
               </motion.div>
               <motion.h1
                  className="mt-[4vmin] font-display text-[8.2vmin] font-extrabold leading-[.9] tracking-[-.09em] text-[#fffaf3]"
                  initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                  transition={{ delay: 0.72, duration: 1, ease: EASE }}
               >
                  Quality care,
                  <br />
                  <span className="text-[#f29d63]">without the queue.</span>
               </motion.h1>
               <motion.div
                  className="mt-[4vmin] flex items-center gap-[2.4vmin] text-[1.4vmin] font-semibold text-[#b8d0c6]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.55, duration: 0.7, ease: EASE }}
               >
                  <span className="flex items-center gap-[.7vmin]">
                     <Check size="1.7vmin" className="text-[#f29d63]" /> Find a
                     slot
                  </span>
                  <span className="h-[1.8vmin] w-px bg-[#b8d0c6]/40" />
                  <span className="flex items-center gap-[.7vmin]">
                     <Phone size="1.55vmin" className="text-[#f29d63]" /> Keep
                     your number
                  </span>
                  <span className="h-[1.8vmin] w-px bg-[#b8d0c6]/40" />
                  <span className="flex items-center gap-[.7vmin]">
                     <MapPin size="1.55vmin" className="text-[#f29d63]" />{" "}
                     Arrive ready
                  </span>
               </motion.div>
            </div>
         </div>
         <motion.div
            className="absolute bottom-[12vmin] left-1/2 -translate-x-1/2 text-[1.15vmin] font-bold uppercase tracking-[.18em] text-[#b8d0c6]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
         >
            care, on your time · lagos
         </motion.div>
         <SceneFooter page="09" total="09" />
      </SceneShell>
   );
}
