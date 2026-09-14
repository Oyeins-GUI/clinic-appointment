import { motion } from 'framer-motion';

import { EASE, FloatingStamp, Kicker, SceneFooter, SceneShell, Wordmark } from './Shared';

const queueCards = [
  { number: '47', label: 'still waiting', x: '9%', y: '26%', r: '-8deg', color: '#f6c7a6' },
  { number: '64', label: 'called 10:42', x: '29%', y: '48%', r: '5deg', color: '#dcece5' },
  { number: '92', label: 'your ticket', x: '15%', y: '68%', r: '-4deg', color: '#fffaf3' },
];

export function Scene2() {
  return (
    <SceneShell tint="peach">
      <div className="absolute left-[6vmin] top-[4vmin] z-20"><Wordmark compact /></div>
      <div className="absolute left-0 top-0 h-full w-[45%] bg-[#123837]" />
      <motion.div className="absolute left-[7vmin] top-[27%] z-10 text-[#fffaf3]" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, ease: EASE }}>
        <Kicker light>the hidden cost</Kicker>
        <h2 className="mt-[2.5vmin] max-w-[44vmin] font-display text-[6.2vmin] font-extrabold leading-[.96] tracking-[-.08em]">A visit can<br /><span className="text-[#f29d63]">take half a day.</span></h2>
        <p className="mt-[3vmin] max-w-[29vmin] text-[1.8vmin] leading-[1.4] text-[#b8d0c6]">Long lines. Unclear timing. One more day planned around a waiting room.</p>
      </motion.div>
      <div className="absolute right-0 top-0 h-full w-[58%] overflow-hidden">
        <div className="paper-lines absolute inset-0 opacity-40" />
        <motion.div className="absolute right-[6vmin] top-[17vmin] text-right" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .7, ease: EASE }}>
          <div className="mono-label text-[#276b63]">queue snapshot</div>
          <div className="mt-[1vmin] font-display text-[8vmin] font-extrabold tracking-[-.1em] text-[#123837]">3h 18m</div>
          <div className="text-[1.6vmin] text-[#5f756f]">average morning wait</div>
        </motion.div>
        {queueCards.map((card, index) => (
          <motion.div key={card.number} className="absolute ui-shadow flex w-[18vmin] flex-col rounded-[1.8vmin] border border-[#123837]/10 p-[1.8vmin]" style={{ left: card.x, top: card.y, background: card.color, rotate: card.r }} initial={{ opacity: 0, scale: .82, y: 30 }} animate={{ opacity: 1, scale: 1, y: [0, index % 2 ? -8 : 7, 0] }} transition={{ delay: .75 + index * .22, duration: .7, ease: EASE, y: { delay: 1.4 + index * .22, duration: 4 + index, repeat: Infinity, ease: 'easeInOut' } }}>
            <span className="font-display text-[5vmin] font-extrabold leading-none tracking-[-.08em] text-[#123837]">{card.number}</span>
            <span className="mt-[1vmin] text-[1.1vmin] font-bold uppercase tracking-[.12em] text-[#5f756f]">{card.label}</span>
          </motion.div>
        ))}
        <FloatingStamp className="bottom-[14vmin] right-[7vmin] bg-[#f29d63]/90">not today</FloatingStamp>
      </div>
      <SceneFooter page="02" total="09" />
    </SceneShell>
  );
}
