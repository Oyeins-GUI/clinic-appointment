import { motion } from 'framer-motion';
import { CalendarDays, Check, Clock3, SlidersHorizontal } from 'lucide-react';

import { AppTop, BASE, Chip, EASE, Kicker, PhoneFrame, ProgressRail, SceneFooter, SceneShell, Wordmark } from './Shared';

export function Scene4() {
  return (
    <SceneShell tint="cream">
      <div className="absolute left-[6vmin] top-[4vmin] z-20"><Wordmark compact /></div>
      <div className="relative z-10 flex h-full items-center justify-center gap-[13vmin] px-[10vmin]">
        <div className="w-[35%]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: EASE }}><Kicker>step 02 · choose well</Kicker></motion.div>
          <motion.h2 className="mt-[2.5vmin] font-display text-[6.4vmin] font-extrabold leading-[.95] tracking-[-.08em] text-[#123837]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8, ease: EASE }}>The right doctor.<br /><span className="text-[#d95d45]">Your right day.</span></motion.h2>
          <motion.p className="mt-[3vmin] max-w-[32vmin] text-[1.85vmin] leading-[1.4] text-[#5f756f]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: .6 }}>Filter by care, pick a clinician, and lock in a time that fits your life.</motion.p>
          <motion.div className="mt-[4vmin] flex items-center gap-[2vmin]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: .6 }}><ProgressRail active={2} /><span className="text-[1.2vmin] font-bold text-[#5f756f]">one choice at a time</span></motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 32, rotateY: -12 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ delay: .25, duration: 1, ease: EASE }}>
          <PhoneFrame className="w-[38vmin]">
            <AppTop title="Book a visit" />
            <div className="px-[2.7vmin] py-[2vmin]">
              <div className="flex items-center justify-between"><div><div className="text-[1.05vmin] font-semibold text-[#5f756f]">Choose your care</div><div className="mt-[.4vmin] text-[1.75vmin] font-bold text-[#123837]">General medicine</div></div><SlidersHorizontal size="2vmin" className="text-[#276b63]" /></div>
              <div className="mt-[2vmin] flex gap-[.7vmin]"><Chip active>General care</Chip><Chip>Women&apos;s health</Chip></div>
              <div className="mt-[2.2vmin] rounded-[1.6vmin] border border-[#123837]/10 bg-[#fffaf3] p-[1.7vmin] ui-shadow">
                <div className="flex items-center gap-[1.3vmin]"><img src={`${BASE}doctor-amara.jpg`} alt="" className="h-[5vmin] w-[5vmin] rounded-full object-cover" /><div><div className="text-[1.4vmin] font-bold text-[#123837]">Dr. Amara Okoye</div><div className="mt-[.4vmin] text-[1.05vmin] text-[#5f756f]">General physician · 8 years</div></div><Check size="2vmin" className="ml-auto text-[#276b63]" /></div>
                <div className="mt-[1.8vmin] grid grid-cols-2 gap-[.8vmin] text-[1.1vmin] font-bold"><div className="flex items-center gap-[.6vmin] rounded-[1vmin] bg-[#dcece5] px-[1vmin] py-[.8vmin] text-[#276b63]"><CalendarDays size="1.5vmin" /> Tue, 18 Jun</div><div className="flex items-center gap-[.6vmin] rounded-[1vmin] bg-[#f6ded0] px-[1vmin] py-[.8vmin] text-[#9b4b31]"><Clock3 size="1.5vmin" /> 10:30 AM</div></div>
              </div>
              <div className="mt-[2.2vmin] text-[1.25vmin] font-bold text-[#123837]">Open times <span className="font-normal text-[#5f756f]">· Tue, 18 Jun</span></div>
              <div className="mt-[1vmin] grid grid-cols-3 gap-[.8vmin]">{['09:00','10:30','12:15','14:00','15:30','16:45'].map((time, i) => <div key={time} className={`rounded-[.9vmin] px-[.8vmin] py-[1vmin] text-center text-[1.05vmin] font-bold ${i === 1 ? 'bg-[#276b63] text-[#fffaf3]' : 'bg-[#dcece5]/60 text-[#276b63]'}`}>{time}</div>)}</div>
            </div>
          </PhoneFrame>
        </motion.div>
      </div>
      <SceneFooter page="04" total="09" />
    </SceneShell>
  );
}
