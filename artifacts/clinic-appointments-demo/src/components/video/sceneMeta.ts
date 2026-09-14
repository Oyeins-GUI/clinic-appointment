// Optional scene metadata for Replit workspace integrations. When the
// workspace's scene controls are enabled for this project, a viewer's click on
// a scene segment scopes their next chat request to that scene's source file.
// Fill one entry per SCENE_DURATIONS key in VideoTemplate.tsx only when a
// skill reference asks for it; otherwise leave the map empty. Scenes missing
// from the map still play and can be jumped to.
//
// Example:
//   export const SCENE_DETAILS: Record<string, SceneDetails> = {
//     open: { title: 'Intro', filePath: 'src/components/video/video_scenes/Scene1.tsx' },
//   };

export interface SceneDetails {
   title: string;
   filePath: string;
}

export const SCENE_DETAILS: Record<string, SceneDetails> = {
   intro: {
      title: "The queue problem",
      filePath: "src/components/video/video_scenes/Scene1.tsx",
   },
   queue: {
      title: "The hidden cost",
      filePath: "src/components/video/video_scenes/Scene2.tsx",
   },
   discover: {
      title: "Find availability",
      filePath: "src/components/video/video_scenes/Scene3.tsx",
   },
   filter: {
      title: "Choose a doctor and date",
      filePath: "src/components/video/video_scenes/Scene4.tsx",
   },
   details: {
      title: "Patient details",
      filePath: "src/components/video/video_scenes/Scene5.tsx",
   },
   confirmation: {
      title: "Booking confirmation and reminders",
      filePath: "src/components/video/video_scenes/Scene6.tsx",
   },
   lookup: {
      title: "Phone appointment lookup",
      filePath: "src/components/video/video_scenes/Scene7.tsx",
   },
   clinic: {
      title: "Clinic information",
      filePath: "src/components/video/video_scenes/Scene8.tsx",
   },
   close: {
      title: "OCare Clinic",
      filePath: "src/components/video/video_scenes/Scene9.tsx",
   },
};
