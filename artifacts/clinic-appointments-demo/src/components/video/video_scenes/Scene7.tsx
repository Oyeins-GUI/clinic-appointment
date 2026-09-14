import { motion } from 'framer-motion';
import { ArrowUpRight, PhoneCall, Search, ShieldCheck } from 'lucide-react';

import { EASE, Kicker, SceneFooter, SceneShell, Wordmark } from './Shared';

export function Scene7() {
  return (
    <SceneShell tint="peach">
      <div className="absolute left-[6vmin] top-[4vmin] z-20"><Wordmark compact /></div>
      <div className="relative z-10 flex h-full items-center justify-center gap-[11vmin] px-[12vmin]">
        <div className="w-[37%]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: EASE }}><Kicker>when the day changes</Kicker></motion.div>
          <motion.h2 className="mt-[2.5vmin] font-display text-[6.25vmin] font-extrabold leading-[.96] tracking-[-.08em] text-[#123837]" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .8, ease: EASE }}>Your phone<br /><span className="text-[#276b63]">is your key.</span></motion.h2>
          <motion.p className="mt-[3vmin] max-w-[33vmin] text-[1.85vmin] leading-[1.4] text-[#5f756f]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .82, duration: .6 }}>Look up an appointment with the number you booked it with. No account maze. No paper slip.</motion.p>
          <motion.div className="mt-[4vmin] flex items-center gap-[1.4vmin] text-[1.25vmin] font-bold text-[#276b63]" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: .6 }}><ShieldCheck size="2vmin" /> Your details stay protected.</motion.div>
        </div>
        <motion.div className="relative w-[46vmin] rounded-[3vmin] bg-[#123837] p-[3vmin] ui-shadow" initial={{ opacity: 0, x: 40, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ delay: .35, duration: 1, ease: EASE }}>
          <div className="flex items-start justify-between text-[#fffaf3]"><div><div className="text-[1.1vmin] font-bold uppercase tracking-[.15em] text-[#f29d63]">appointment lookup</div><div className="mt-[1.2vmin] font-display text-[3.1vmin] font-extrabold leading-[1] tracking-[-.07em]">Find your visit<br />in seconds.</div></div><div className="flex h-[4vmin] w-[4vmin] items-center justify-center rounded-full bg-[#f29d63] text-[#123837]"><PhoneCall size="2vmin" /></div></div>
          <div className="mt-[3vmin] rounded-[1.6vmin] bg-[#fffaf3] p-[1.8vmin]"><div className="text-[1.05vmin] font-bold uppercase tracking-[.11em] text-[#5f756f]">mobile number</div><div className="mt-[.9vmin] flex items-center justify-between text-[1.8vmin] font-bold text-[#123837]"><span>+234 803 421 9088</span><Search size="2vmin" className="text-[#276b63]" /></div></div>
          <motion.div className="mt-[1.7vmin] flex items-center justify-between rounded-[1.4vmin] border border-[#f29d63]/35 px-[1.8vmin] py-[1.45vmin] text-[1.25vmin] font-bold text-[#fffaf3]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: .5 }}>1 appointment found <ArrowUpRight size="1.8vmin" className="text-[#f29d63]" /></motion.div>
          <div className="mt-[2.5vmin] border-t border-[#fffaf3]/15 pt-[2vmin] text-[1.2vmin] text-[#b8d0c6]">A single number keeps your care moving.</div>
        </motion.div>
      </div>
      <SceneFooter page="07" total="09" />
    </SceneShell>
  );
}
