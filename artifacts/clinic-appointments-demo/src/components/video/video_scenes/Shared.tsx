import { motion } from "framer-motion";
import {
   CalendarDays,
   Check,
   Clock3,
   MapPin,
   Phone,
   ShieldCheck,
   Sparkles,
   UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const BASE = `${import.meta.env.BASE_URL}`;

export function SceneShell({
   children,
   tint = "cream",
   accent = false,
}: {
   children: ReactNode;
   tint?: "cream" | "mint" | "ink" | "peach";
   accent?: boolean;
}) {
   const backgrounds = {
      cream: "linear-gradient(125deg, #f4efe8 0%, #f8f1e7 48%, #e5efe8 100%)",
      mint: "linear-gradient(135deg, #dcece5 0%, #f4efe8 58%, #e9d8cb 100%)",
      ink: "linear-gradient(135deg, #123837 0%, #1e5149 56%, #276b63 100%)",
      peach: "linear-gradient(135deg, #f4efe8 0%, #f6ded0 56%, #dcece5 100%)",
   };
   return (
      <motion.div
         className="video-frame"
         style={{ background: backgrounds[tint] }}
         initial={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            opacity: 0.7,
         }}
         animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
         }}
         exit={{
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            opacity: 0.8,
         }}
         transition={{ duration: 0.8, ease: EASE }}
      >
         <div className="film-grain absolute inset-0 z-0" />
         <motion.div
            className={`absolute -right-[6vw] -top-[12vh] h-[44vmin] w-[44vmin] rounded-full ${accent ? "bg-[#f29d63]" : "bg-[#a8d1c0]"}`}
            animate={{
               x: ["0%", "-4%", "0%"],
               y: ["0%", "3%", "0%"],
               rotate: [0, 18, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{ opacity: 0.25, filter: "blur(1px)" }}
         />
         <motion.div
            className="absolute -bottom-[18vh] left-[18vw] h-[35vmin] w-[35vmin] rounded-full border-[1.2vmin] border-[#276b63]/15"
            animate={{ rotate: [0, -12, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
         />
         {children}
      </motion.div>
   );
}

export function Wordmark({
   light = false,
   compact = false,
}: {
   light?: boolean;
   compact?: boolean;
}) {
   return (
      <div
         className="flex items-center gap-[.75vmin]"
         style={{ color: light ? "#fffaf3" : "#123837" }}
      >
         <span className="relative flex h-[3.8vmin] w-[3.8vmin] items-center justify-center rounded-[1.1vmin] bg-[#f29d63]">
            <span className="absolute h-[2.25vmin] w-[1.1vmin] rounded-full bg-[#123837]" />
            <span className="absolute h-[1.1vmin] w-[2.25vmin] rounded-full bg-[#123837]" />
         </span>
         <span
            className={`${compact ? "text-[2.1vmin]" : "text-[2.6vmin]"} font-extrabold tracking-[-.07em]`}
         >
            OCare
         </span>
      </div>
   );
}

export function Kicker({
   children,
   light = false,
}: {
   children: ReactNode;
   light?: boolean;
}) {
   return (
      <div
         className={`mono-label flex items-center gap-[1vmin] ${light ? "text-[#f29d63]" : "text-[#276b63]"}`}
      >
         <span className="h-[.8vmin] w-[.8vmin] rounded-full bg-current" />
         {children}
      </div>
   );
}

export function PhoneFrame({
   children,
   className = "",
   dark = false,
}: {
   children: ReactNode;
   className?: string;
   dark?: boolean;
}) {
   return (
      <div
         className={`relative aspect-[.52] w-[26vmin] rounded-[4.8vmin] border-[.7vmin] ${dark ? "border-[#0b2827] bg-[#0b2827]" : "border-[#123837] bg-[#123837]"} p-[.75vmin] ${className}`}
      >
         <div className="absolute left-1/2 top-[.65vmin] z-20 h-[1.7vmin] w-[8vmin] -translate-x-1/2 rounded-full bg-[#0b2827]" />
         <div className="relative h-full overflow-hidden rounded-[3.7vmin] bg-[#f4efe8]">
            {children}
         </div>
      </div>
   );
}

export function AppTop({
   title = "OCare",
   compact = false,
}: {
   title?: string;
   compact?: boolean;
}) {
   return (
      <div className="flex items-center justify-between border-b border-[#123837]/10 px-[2.4vmin] py-[2vmin]">
         <div className="flex items-center gap-[.8vmin]">
            <span className="relative flex h-[2.3vmin] w-[2.3vmin] items-center justify-center rounded-[.65vmin] bg-[#f29d63]">
               <span className="absolute h-[1.35vmin] w-[.65vmin] rounded-full bg-[#123837]" />
               <span className="absolute h-[.65vmin] w-[1.35vmin] rounded-full bg-[#123837]" />
            </span>
            <span
               className={`${compact ? "text-[1.35vmin]" : "text-[1.6vmin]"} font-extrabold tracking-[-.06em] text-[#123837]`}
            >
               {title}
            </span>
         </div>
         <span className="h-[.7vmin] w-[.7vmin] rounded-full bg-[#276b63]" />
      </div>
   );
}

export function Chip({
   children,
   active = false,
   orange = false,
}: {
   children: ReactNode;
   active?: boolean;
   orange?: boolean;
}) {
   return (
      <div
         className={`rounded-full px-[1.5vmin] py-[.85vmin] text-[1.25vmin] font-bold ${active ? "bg-[#276b63] text-[#fffaf3]" : orange ? "bg-[#f29d63]/25 text-[#9b4b31]" : "bg-[#dcece5] text-[#276b63]"}`}
      >
         {children}
      </div>
   );
}

export function TinyIcon({
   kind,
}: {
   kind: "calendar" | "clock" | "pin" | "phone" | "user" | "shield";
}) {
   const Icon = {
      calendar: CalendarDays,
      clock: Clock3,
      pin: MapPin,
      phone: Phone,
      user: UserRound,
      shield: ShieldCheck,
   }[kind];
   return <Icon size="1.8vmin" strokeWidth={2.2} />;
}

export function DetailRow({
   icon,
   label,
   value,
}: {
   icon: "calendar" | "clock" | "pin" | "phone" | "user" | "shield";
   label: string;
   value: string;
}) {
   return (
      <div className="flex items-center gap-[1.5vmin]">
         <div className="flex h-[4vmin] w-[4vmin] items-center justify-center rounded-[1.2vmin] bg-[#dcece5] text-[#276b63]">
            <TinyIcon kind={icon} />
         </div>
         <div>
            <div className="text-[1.05vmin] font-semibold text-[#5f756f]">
               {label}
            </div>
            <div className="text-[1.45vmin] font-bold text-[#123837]">
               {value}
            </div>
         </div>
      </div>
   );
}

export function FloatingStamp({
   children,
   className = "",
}: {
   children: ReactNode;
   className?: string;
}) {
   return (
      <motion.div
         className={`ui-glass absolute rounded-[1.5vmin] px-[1.5vmin] py-[1.1vmin] text-[1.25vmin] font-bold text-[#123837] ${className}`}
         animate={{ y: [0, -0.9, 0], rotate: [-1.2, 1.2, -1.2] }}
         transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
         {children}
      </motion.div>
   );
}

export function ProgressRail({
   active = 1,
   total = 4,
}: {
   active?: number;
   total?: number;
}) {
   return (
      <div className="flex items-center gap-[.7vmin]">
         {Array.from({ length: total }).map((_, index) => (
            <span
               key={index}
               className={`h-[.7vmin] rounded-full transition-all ${index < active ? "w-[3vmin] bg-[#276b63]" : "w-[.7vmin] bg-[#b4c9c0]"}`}
            />
         ))}
      </div>
   );
}

export function SparkLine() {
   return (
      <svg
         viewBox="0 0 180 42"
         className="h-[6vmin] w-[19vmin] overflow-visible"
      >
         <path
            d="M2 35 C18 34, 22 14, 42 21 S64 42, 82 27 S101 7, 117 17 S140 36, 178 4"
            fill="none"
            stroke="#f29d63"
            strokeWidth="3.5"
            strokeLinecap="round"
         />
         <path
            d="M2 35 C18 34, 22 14, 42 21 S64 42, 82 27 S101 7, 117 17 S140 36, 178 4 L178 42 L2 42Z"
            fill="#f29d63"
            opacity=".14"
         />
      </svg>
   );
}

export function SceneFooter({
   page,
   total = "09",
}: {
   page: string;
   total?: string;
}) {
   return (
      <div className="absolute bottom-[4vmin] left-[6vmin] right-[6vmin] z-20 flex items-center justify-between">
         <div className="h-px flex-1 bg-[#123837]/15" />
         <div className="ml-[2vmin] flex items-center gap-[1vmin] text-[1.1vmin] font-bold tracking-[.15em] text-[#5f756f]">
            <span>{page}</span>
            <span className="text-[#123837]/30">/</span>
            <span>{total}</span>
         </div>
      </div>
   );
}
