import {
  SafeFrame,
  VideoCanvas,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';
import { Scene7 } from './video_scenes/Scene7';
import { Scene8 } from './video_scenes/Scene8';
import { Scene9 } from './video_scenes/Scene9';

const SCENE_DURATIONS = {
  intro: 8500,
  queue: 10500,
  discover: 13000,
  filter: 14000,
  details: 12000,
  confirmation: 12500,
  lookup: 12000,
  clinic: 13000,
  close: 13500,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9];
  const Scene = scenes[currentScene] ?? Scene1;
  const accentPositions = [
    { x: '8vw', y: '12vh', rotate: -9, scale: 1 },
    { x: '83vw', y: '26vh', rotate: 12, scale: .8 },
    { x: '74vw', y: '74vh', rotate: 28, scale: .65 },
    { x: '18vw', y: '73vh', rotate: -18, scale: .85 },
    { x: '83vw', y: '19vh', rotate: 5, scale: .7 },
    { x: '16vw', y: '18vh', rotate: -24, scale: .72 },
    { x: '78vw', y: '77vh', rotate: 20, scale: .9 },
    { x: '12vw', y: '62vh', rotate: -12, scale: .78 },
    { x: '50vw', y: '10vh', rotate: 0, scale: 1.15 },
  ];
  const position = accentPositions[currentScene] ?? accentPositions[0];

  return (
    <VideoCanvas
      aspectRatio={VIDEO_ASPECT_RATIO}
      style={{ backgroundColor: 'var(--color-bg-light)' }}
      className="video-frame"
    >
      <div className="absolute inset-0 paper-lines opacity-20" />
      <motion.div
        className="pointer-events-none absolute z-[1] h-[8vmin] w-[8vmin] rounded-[2.2vmin] border-[.8vmin] border-[#f29d63]/55"
        animate={{ left: position.x, top: position.y, rotate: position.rotate, scale: position.scale }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[.6vmin] bg-[#f29d63]"
        animate={{ opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <SafeFrame className="absolute inset-0 z-10">
        <AnimatePresence initial={false} mode="sync">
          <Scene key={`scene-${currentScene}`} />
        </AnimatePresence>
      </SafeFrame>
    </VideoCanvas>
  );
}
