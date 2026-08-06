"use client";

import { useLayoutEffect } from "react";
import { preloadWelcomeAudio } from "@/lib/welcomeAudio";

/** Loads welcome.mp3 as soon as the app mounts — improves autoplay success */
export default function WelcomeAudioPreloader() {
  useLayoutEffect(() => {
    preloadWelcomeAudio();
  }, []);

  return null;
}
