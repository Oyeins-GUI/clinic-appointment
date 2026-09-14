import { motion } from "framer-motion";
import { Check, ChevronRight, Phone, UserRound } from "lucide-react";

import {
   EASE,
   Kicker,
   ProgressRail,
   SceneFooter,
   SceneShell,
   Wordmark,
} from "./Shared";

function InputRow({
   label,
   value,
   icon,
}: {
   label: string;
   value: string;
   icon: "user" | "phone";
}) {
   return (
      <div className="rounded-[1.3vmin] border border-[#123837]/12 bg-[#fffaf3] px-[1.8vmin] py-[1.25vmin]">
         <div className="flex items-center gap-[.7vmin] text-[1vmin] font-bold uppercase tracking-[.1em] text-[#5f756f]">
            {icon === "user" ? (
               <UserRound size="1.45vmin" />
            ) : (
               <Phone size="1.45vmin" />
            )}
            {label}
         </div>
         <div className="mt-[.7vmin] text-[1.55vmin] font-semibold text-[#123837]">
            {value}
         </div>
      </div>
   );
}

export function Scene5() {
   return (
      <SceneShell tint="mint">
         <div className="absolute left-[6vmin] top-[4vmin] z-20">
            <Wordmark compact />
         </div>
         <div className="relative z-10 flex h-full items-center justify-center gap-[11vmin] px-[13vmin]">
            <div className="w-[38%]">
               <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
               >
                  <Kicker>step 03 · make it yours</Kicker>
               </motion.div>
               <motion.h2
                  className="mt-[2.5vmin] font-display text-[6.3vmin] font-extrabold leading-[.95] tracking-[-.08em] text-[#123837]"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.75, ease: EASE }}
               >
                  A few details.
                  <br />
                  <span className="text-[#276b63]">No paperwork.</span>
               </motion.h2>
               <motion.p
                  className="mt-[3vmin] max-w-[33vmin] text-[1.85vmin] leading-[1.4] text-[#5f756f]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.6 }}
               >
                  Your appointment is held for you while OCare keeps the
                  essentials in one place.
               </motion.p>
               <motion.div
                  className="mt-[4vmin] flex items-center gap-[2vmin]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.15, duration: 0.6 }}
               >
                  <ProgressRail active={3} />
                  <span className="text-[1.2vmin] font-bold text-[#5f756f]">
                     private by design
                  </span>
               </motion.div>
            </div>
            <motion.div
               className="relative w-[38vmin] rounded-[2.7vmin] border border-[#123837]/10 bg-[#f4efe8]/85 p-[3vmin] ui-shadow"
               initial={{ opacity: 0, y: 35, rotate: 2 }}
               animate={{ opacity: 1, y: 0, rotate: 0 }}
               transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
            >
               <div className="flex items-start justify-between">
                  <div>
                     <div className="text-[1.15vmin] font-bold uppercase tracking-[.12em] text-[#276b63]">
                        patient details
                     </div>
                     <div className="mt-[.8vmin] font-display text-[2.6vmin] font-extrabold tracking-[-.06em] text-[#123837]">
                        Tell us who&apos;s coming
                     </div>
                  </div>
                  <div className="flex h-[4vmin] w-[4vmin] items-center justify-center rounded-full bg-[#f29d63] text-[#123837]">
                     <UserRound size="2vmin" />
                  </div>
               </div>
               <div className="mt-[2.8vmin] space-y-[1.2vmin]">
                  <InputRow
                     label="full name"
                     value="Tola Adebayo"
                     icon="user"
                  />
                  <InputRow
                     label="mobile number"
                     value="+234 803 421 9088"
                     icon="phone"
                  />
                  <div className="rounded-[1.3vmin] border border-[#123837]/12 bg-[#fffaf3] px-[1.8vmin] py-[1.25vmin]">
                     <div className="text-[1vmin] font-bold uppercase tracking-[.1em] text-[#5f756f]">
                        what brings you in?
                     </div>
                     <div className="mt-[.7vmin] text-[1.45vmin] font-semibold text-[#123837]">
                        Routine check-up
                     </div>
                  </div>
               </div>
               <div className="mt-[2vmin] flex items-center justify-between border-t border-[#123837]/10 pt-[2vmin]">
                  <span className="text-[1.05vmin] font-semibold text-[#5f756f]">
                     Details stay with OCare
                  </span>
                  <div className="flex items-center gap-[.7vmin] text-[1.15vmin] font-bold text-[#276b63]">
                     <Check size="1.7vmin" /> saved
                  </div>
               </div>
               <div className="mt-[1.8vmin] flex items-center justify-between rounded-[1.2vmin] bg-[#276b63] px-[1.7vmin] py-[1.35vmin] text-[1.3vmin] font-bold text-[#fffaf3]">
                  Review appointment <ChevronRight size="1.8vmin" />
               </div>
            </motion.div>
         </div>
         <SceneFooter page="05" total="09" />
      </SceneShell>
   );
}
