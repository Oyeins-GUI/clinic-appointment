import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

import { AppTop, Chip, EASE, Kicker, PhoneFrame, ProgressRail, SceneFooter, SceneShell, Wordmark } from './Shared';

export function Scene3() {
  return (
    <SceneShell tint="mint" accent>
      <div className="absolute left-[6vmin] top-[4vmin] z-20"><Wordmark compact /></div>
      <div className="relative z-10 flex h-full items-center justify-between px-[12vmin]">
        <div className="w-[41%]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .6, ease: EASE }}><Kicker>step 01 · find a visit</Kicker></motion.div>
          <motion.h2 className="mt-[2.5vmin] font-display text-[6.5vmin] font-extrabold leading-[.95] tracking-[-.08em] text-[#123837]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .8, ease: EASE }}>See the day<br /><span className="text-[#276b63]">before you go.</span></motion.h2>
          <motion.p className="mt-[3vmin] max-w-[35vmin] text-[1.85vmin] leading-[1.4] text-[#5f756f]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: .7 }}>Open NayaCare and see clinics with appointments available now.</motion.p>
          <motion.div className="mt-[4vmin] flex items-center gap-[2vmin]" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: .6, ease: EASE }}>
            <ProgressRail active={1} />
            <span className="text-[1.2vmin] font-bold text-[#5f756f]">one clear path</span>
          </motion.div>
        </div>
        <motion.div className="relative mr-[10vmin]" initial={{ opacity: 0, y: 42, rotate: 4, scale: .94 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} transition={{ delay: .35, duration: 1, ease: EASE }}>
          <PhoneFrame>
            <AppTop />
            <div className="px-[2.5vmin] py-[2.2vmin]">
              <div className="text-[1.15vmin] font-semibold text-[#5f756f]">Good morning, Tola</div>
              <div className="mt-[.8vmin] font-display text-[2.55vmin] font-extrabold leading-[1.05] tracking-[-.06em] text-[#123837]">Find a clinic<br />near you</div>
              <div className="mt-[2.2vmin] flex items-center gap-[.8vmin] rounded-[1.2vmin] bg-[#fffaf3] px-[1.2vmin] py-[1.3vmin] text-[1.15vmin] text-[#5f756f] ui-shadow"><MapPin size="1.7vmin" className="text-[#d95d45]" /> Lagos, Nigeria <span className="ml-auto text-[#276b63]">⌄</span></div>
              <div className="mt-[2.5vmin] flex gap-[.7vmin]"><Chip active>Available today</Chip><Chip>Any clinic</Chip></div>
              <div className="mt-[2.4vmin]">
                <div className="mb-[1vmin] flex items-center justify-between"><span className="text-[1.5vmin] font-bold text-[#123837]">Nearby availability</span><span className="text-[1.05vmin] font-bold text-[#276b63]">3 found</span></div>
                <div className="rounded-[1.4vmin] border border-[#123837]/10 bg-[#fffaf3] p-[1.5vmin] ui-shadow">
                  <div className="flex items-start justify-between"><div><div className="text-[1.35vmin] font-bold text-[#123837]">NayaCare Clinic</div><div className="mt-[.5vmin] flex items-center gap-[.5vmin] text-[1.05vmin] text-[#5f756f]"><MapPin size="1.3vmin" /> Lekki Phase 1</div></div><span className="rounded-full bg-[#dcece5] px-[.9vmin] py-[.45vmin] text-[.9vmin] font-bold text-[#276b63]">open</span></div>
                  <div className="mt-[1.7vmin] flex items-center justify-between"><span className="text-[1.05vmin] font-semibold text-[#276b63]">Next slot · 10:30</span><ArrowRight size="1.8vmin" className="text-[#d95d45]" /></div>
                </div>
              </div>
            </div>
          </PhoneFrame>
          <motion.div className="absolute -left-[9vmin] bottom-[8vmin] rounded-[1.4vmin] bg-[#123837] px-[1.7vmin] py-[1.2vmin] text-[1.2vmin] font-bold text-[#fffaf3] ui-shadow" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>3 slots within 8km</motion.div>
        </motion.div>
      </div>
      <SceneFooter page="03" total="09" />
    </SceneShell>
  );
}
