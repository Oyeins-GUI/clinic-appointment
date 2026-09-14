import { motion } from "framer-motion";
import { Bell, Check, MapPin } from "lucide-react";

import {
   AppTop,
   EASE,
   Kicker,
   PhoneFrame,
   ProgressRail,
   SceneFooter,
   SceneShell,
   Wordmark,
} from "./Shared";

export function Scene6() {
   return (
      <SceneShell tint="cream" accent>
         <div className="absolute left-[6vmin] top-[4vmin] z-20">
            <Wordmark compact />
         </div>
         <div className="relative z-10 flex h-full items-center justify-center gap-[13vmin] px-[14vmin]">
            <motion.div
               className="relative"
               initial={{ opacity: 0, scale: 0.9, y: 24 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: 0.25, duration: 1, ease: EASE }}
            >
               <PhoneFrame>
                  <AppTop title="Appointment booked" />
                  <div className="flex h-[82%] flex-col items-center px-[2.5vmin] py-[3.5vmin] text-center">
                     <motion.div
                        className="flex h-[8vmin] w-[8vmin] items-center justify-center rounded-full bg-[#dcece5] text-[#276b63]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                           delay: 0.7,
                           type: "spring",
                           stiffness: 280,
                           damping: 18,
                        }}
                     >
                        <Check size="4vmin" strokeWidth={3} />
                     </motion.div>
                     <div className="mt-[2.4vmin] font-display text-[2.65vmin] font-extrabold tracking-[-.07em] text-[#123837]">
                        You&apos;re all set, Tola.
                     </div>
                     <div className="mt-[1vmin] text-[1.2vmin] leading-[1.35] text-[#5f756f]">
                        Your visit is saved. We&apos;ll keep an eye on the time.
                     </div>
                     <div className="mt-[2.5vmin] w-full rounded-[1.6vmin] bg-[#fffaf3] p-[1.7vmin] text-left ui-shadow">
                        <div className="text-[1vmin] font-bold uppercase tracking-[.12em] text-[#5f756f]">
                           confirmation
                        </div>
                        <div className="mt-[.6vmin] text-[1.65vmin] font-bold text-[#276b63]">
                           NC-240618
                        </div>
                        <div className="mt-[1.4vmin] flex items-center gap-[.8vmin] text-[1.05vmin] font-semibold text-[#5f756f]">
                           <MapPin size="1.5vmin" /> OCare Clinic · Lekki
                        </div>
                     </div>
                     <div className="mt-[1.8vmin] flex w-full items-center justify-between rounded-[1.4vmin] bg-[#f6ded0] px-[1.5vmin] py-[1.5vmin] text-left">
                        <div className="flex items-center gap-[1vmin]">
                           <div className="flex h-[3.8vmin] w-[3.8vmin] items-center justify-center rounded-[1.1vmin] bg-[#f29d63] text-[#123837]">
                              <Bell size="1.9vmin" />
                           </div>
                           <div>
                              <div className="text-[1.05vmin] font-bold text-[#123837]">
                                 Reminders
                              </div>
                              <div className="text-[.95vmin] text-[#9b4b31]">
                                 24h and 2h before
                              </div>
                           </div>
                        </div>
                        <div className="relative h-[2.5vmin] w-[4.8vmin] rounded-full bg-[#276b63]">
                           <div className="absolute right-[.35vmin] top-[.35vmin] h-[1.8vmin] w-[1.8vmin] rounded-full bg-[#fffaf3]" />
                        </div>
                     </div>
                  </div>
               </PhoneFrame>
               <motion.div
                  className="absolute -right-[7vmin] top-[17vmin] rounded-full bg-[#f29d63] px-[1.5vmin] py-[1.1vmin] text-[1.15vmin] font-bold text-[#123837] ui-shadow"
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{
                     duration: 4.2,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
               >
                  reminders on
               </motion.div>
            </motion.div>
            <div className="w-[36%]">
               <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
               >
                  <Kicker>step 04 · breathe easy</Kicker>
               </motion.div>
               <motion.h2
                  className="mt-[2.5vmin] font-display text-[6.4vmin] font-extrabold leading-[.95] tracking-[-.08em] text-[#123837]"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
               >
                  Booked.
                  <br />
                  <span className="text-[#d95d45]">Remembered.</span>
               </motion.h2>
               <motion.p
                  className="mt-[3vmin] max-w-[31vmin] text-[1.85vmin] leading-[1.4] text-[#5f756f]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
               >
                  A clear confirmation, a reference number, and a reminder when
                  it matters.
               </motion.p>
               <motion.div
                  className="mt-[4vmin] flex items-center gap-[2vmin]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.15, duration: 0.6 }}
               >
                  <ProgressRail active={4} />
                  <span className="text-[1.2vmin] font-bold text-[#5f756f]">
                     nothing to chase
                  </span>
               </motion.div>
            </div>
         </div>
         <SceneFooter page="06" total="09" />
      </SceneShell>
   );
}
