import { AnimationOptions } from "@/types/animations";

export const ANIMATION_NAMES = [
  "Intro",
  "MovingEyes",
  "Surprise",
  "Focus",
  "Blink",
  "Smile",
] as const;

export const ANIMATION_EMOJIS: Record<AnimationOptions, string> = {
  Intro: "▶️",
  MovingEyes: "👀",
  Surprise: "😲",
  Focus: "🧐",
  Blink: "😉",
  Smile: "😊",
} as const;

export const INIT_ANIMATION = "Intro" as const;
