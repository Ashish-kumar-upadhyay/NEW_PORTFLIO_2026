/** Intro timeline — scaled from original 3.7s to match 3s welcome.mp3 */
export const INTRO_DURATION_S = 3;
export const INTRO_DURATION_MS = 3000;

/** Original sequence ends at 3.7s (domain delay 2.1 + duration 1.6) */
const TIMELINE_SCALE = INTRO_DURATION_S / 3.7;

export const INTRO_EASE = [0.22, 1, 0.36, 1] as const;

export const introTiming = {
  container: { duration: 2 * TIMELINE_SCALE },
  icons: { stagger: 0.35 * TIMELINE_SCALE, duration: 1.8 * TIMELINE_SCALE },
  welcome: { delay: 1.2 * TIMELINE_SCALE, duration: 1.6 * TIMELINE_SCALE },
  toMy: { delay: 1.5 * TIMELINE_SCALE, duration: 1.6 * TIMELINE_SCALE },
  portfolio: { delay: 1.8 * TIMELINE_SCALE, duration: 1.6 * TIMELINE_SCALE },
  domain: { delay: 2.1 * TIMELINE_SCALE, duration: 1.6 * TIMELINE_SCALE },
  textAnimationStart: 1.2 * TIMELINE_SCALE,
} as const;

export const getIntroTotalDurationMs = () => INTRO_DURATION_MS;

export const WELCOME_AUDIO_SRC = "/audio/welcome.mp3";

/** Audio plays from "Welcome" text start until intro ends */
export const getAudioSegmentDurationS = () =>
  INTRO_DURATION_S - introTiming.textAnimationStart;
