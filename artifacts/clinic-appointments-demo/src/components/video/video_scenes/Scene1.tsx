import { motion } from 'framer-motion';

import { BASE, EASE, FloatingStamp, Kicker, SceneFooter, SceneShell, Wordmark } from './Shared';

export function Scene1() {
  return (
    <SceneShell tint="cream" accent>
      <div className="absolute inset-y-0 right-0 w-[56%] overflow-hidden">
        <motion.img
          src={`${BASE}lagos-clinic-dawn.jpg`}
          alt=""
          className="h-full w-full object-cover"
          initial={{ scale: 1.12, x: '5%' }}
          animate={{ scale: 1, x: '0%' }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4efe8] via-[#f4efe8]/35 to-transparent" />
        <div className="absolute inset-0 bg-[#123837]/10 mix-blend-multiply" />
      </div>
      <div className="absolute left-[6vmin] top-[4vmin] z-10"><Wordmark /></div>
      <div className="relative z-10 flex h-full items-center px-[6vmin]">
        <div className="w-[49%] pt-[2vmin]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7, ease: EASE }}>
            <Kicker>For every Lagos morning</Kicker>
          </motion.div>
          <motion.h1
            className="mt-[3vmin] max-w-[68vmin] font-display text-[7.2vmin] font-extrabold leading-[.95] tracking-[-.08em] text-[#123837]"
            initial={{ opacity: 0, y: 26, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ delay: .55, duration: .9, ease: EASE }}
          >
            The queue can wait.<br /><span className="text-[#d95d45]">Your care shouldn&apos;t.</span>
          </motion.h1>
          <motion.p className="mt-[3vmin] max-w-[42vmin] text-[2vmin] leading-[1.35] text-[#5f756f]" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: .7, ease: EASE }}>
            NayaCare helps patients find a real clinic slot before they leave home.
          </motion.p>
          <motion.div className="mt-[5vmin] h-[.8vmin] w-[18vmin] rounded-full bg-[#f29d63]" initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.45, duration: .6, ease: EASE }} />
        </div>
      </div>
      <FloatingStamp className="right-[9vmin] top-[18vmin] rotate-3"><span className="text-[#d95d45]">Morning rush</span><br /><span className="font-normal text-[#5f756f]">Lekki • 8:07 am</span></FloatingStamp>
      <motion.div className="absolute bottom-[15vmin] right-[14vmin] z-10 rounded-[2vmin] bg-[#123837] px-[2.2vmin] py-[1.6vmin] text-[1.4vmin] font-bold text-[#fffaf3] ui-shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: .7, ease: EASE }}>
        <span className="mr-[1vmin] inline-block h-[.8vmin] w-[.8vmin] rounded-full bg-[#f29d63]" /> Appointment-first care
      </motion.div>
      <SceneFooter page="01" />
    </SceneShell>
  );
}
