"use client";

import {
  INTRO_DURATION_MS,
  WELCOME_AUDIO_SRC,
  getAudioSegmentDurationS,
  introTiming,
} from "@/lib/introTiming";

let sharedAudio: HTMLAudioElement | null = null;

export function getWelcomeAudio(): HTMLAudioElement {
  if (typeof window === "undefined") {
    throw new Error("Audio is client-only");
  }
  if (!sharedAudio) {
    sharedAudio = new Audio(WELCOME_AUDIO_SRC);
    sharedAudio.preload = "auto";
  }
  return sharedAudio;
}

/** Preload early so autoplay is ready when intro mounts */
export function preloadWelcomeAudio() {
  if (typeof window === "undefined") return;
  const audio = getWelcomeAudio();
  audio.load();
}

/** Muted micro-play unlocks autoplay in Chrome/Safari without user click */
export async function unlockWelcomeAutoplay(): Promise<void> {
  const audio = getWelcomeAudio();
  try {
    audio.muted = true;
    audio.currentTime = 0;
    await audio.play();
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
  } catch {
    audio.muted = false;
  }
}

function configurePlaybackRate(audio: HTMLAudioElement) {
  const segment = getAudioSegmentDurationS();
  if (audio.duration > 0 && segment > 0) {
    audio.playbackRate = audio.duration / segment;
  } else {
    audio.playbackRate = 1;
  }
}

export async function playWelcomeVoice(): Promise<boolean> {
  const audio = getWelcomeAudio();
  audio.volume = 1;
  configurePlaybackRate(audio);
  audio.currentTime = 0;

  try {
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

export function stopWelcomeVoice() {
  if (!sharedAudio) return;
  sharedAudio.pause();
  sharedAudio.currentTime = 0;
}

export { INTRO_DURATION_MS, introTiming };
