import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';

import { BASE, DetailRow, EASE, Kicker, SceneFooter, SceneShell, Wordmark } from './Shared';

export function Scene8() {
  return (
    <SceneShell tint="mint" accent>
      <div className="absolute left-[6vmin] top-[4vmin] z-20"><Wordmark compact /></div>
      <div className="absolute right-0 top-0 h-full w-[52%] overflow-hidden">
        <motion.img src={`${BASE}lagos-clinic-dawn.jpg`} alt="" className="h-full w-full object-cover" initial={{ scale: 1.16, x: '4%' }} animate={{ scale: 1, x: '0%' }} transition={{ duration: 1.3, ease: EASE }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#dcece5] via-[#dcece5]/25 to-transparent" />
        <div className="absolute inset-0 bg-[#276b63]/10 mix-blend-multiply" />
      </div>
      <div className="relative z-10 flex h-full items-center px-[7vmin]">
        <div className="w-[48%]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: EASE }}><Kicker>know before you arrive</Kicker></motion.div>
          <motion.h2 className="mt-[2.5vmin] max-w-[43vmin] font-display text-[6.15vmin] font-extrabold leading-[.96] tracking-[-.08em] text-[#123837]" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8, ease: EASE }}>A clinic visit<br /><span className="text-[#d95d45]">with context.</span></motion.h2>
          <motion.p className="mt-[3vmin] max-w-[34vmin] text-[1.85vmin] leading-[1.4] text-[#5f756f]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9, duration: .6 }}>Hours, location, and what to bring — all visible before you set out across Lagos.</motion.p>
          <motion.div className="mt-[4vmin] w-[37vmin] rounded-[2.2vmin] bg-[#fffaf3]/90 p-[2.2vmin] ui-shadow" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: .8, ease: EASE }}>
            <div className="flex items-start justify-between"><div><div className="text-[1.05vmin] font-bold uppercase tracking-[.13em] text-[#276b63]">nayaCare clinic</div><div className="mt-[.65vmin] font-display text-[2.3vmin] font-extrabold tracking-[-.06em] text-[#123837]">Lekki Phase 1</div></div><div className="flex h-[4.3vmin] w-[4.3vmin] items-center justify-center rounded-[1.3vmin] bg-[#f6ded0] text-[#d95d45]"><MapPin size="2.1vmin" /></div></div>
            <div className="mt-[2.1vmin] grid grid-cols-2 gap-[1.5vmin]"><DetailRow icon="clock" label="hours" value="8am – 6pm" /><DetailRow icon="phone" label="front desk" value="+234 1 290 1182" /></div>
            <div className="mt-[1.7vmin] flex items-center gap-[.8vmin] border-t border-[#123837]/10 pt-[1.7vmin] text-[1.1vmin] font-semibold text-[#5f756f]"><CalendarDays size="1.7vmin" className="text-[#276b63]" /> Bring your ID and booking code</div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-[14vmin] right-[9vmin] z-10 rounded-[1.8vmin] bg-[#f29d63] px-[1.8vmin] py-[1.4vmin] text-[1.25vmin] font-bold text-[#123837] ui-shadow">Lekki Phase 1 · Lagos</div>
      <SceneFooter page="08" total="09" />
    </SceneShell>
  );
}
