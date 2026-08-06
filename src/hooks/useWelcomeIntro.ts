"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { getIntroTotalDurationMs, introTiming } from "@/lib/introTiming";
import {
  playWelcomeVoice,
  preloadWelcomeAudio,
  stopWelcomeVoice,
  unlockWelcomeAutoplay,
} from "@/lib/welcomeAudio";

type UseWelcomeIntroOptions = {
  enabled: boolean;
  onComplete: () => void;
};

export function useWelcomeIntro({
  enabled,
  onComplete,
}: UseWelcomeIntroOptions) {
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const completeOnce = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    stopWelcomeVoice();
    onCompleteRef.current();
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;

    completedRef.current = false;
    preloadWelcomeAudio();

    let introTimer: ReturnType<typeof setTimeout> | null = null;
    let textStartTimer: ReturnType<typeof setTimeout> | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let unlocked = false;
    let audioStarted = false;
    let retryCount = 0;
    const MAX_RETRIES = 10;

    const clearTimers = () => {
      if (introTimer) clearTimeout(introTimer);
      if (textStartTimer) clearTimeout(textStartTimer);
      if (retryTimer) clearTimeout(retryTimer);
      introTimer = null;
      textStartTimer = null;
      retryTimer = null;
    };

    const tryPlayAudio = async () => {
      if (audioStarted || completedRef.current) return;

      const played = await playWelcomeVoice();
      if (played) {
        audioStarted = true;
        return;
      }

      retryCount += 1;
      if (retryCount < MAX_RETRIES) {
        retryTimer = setTimeout(() => void tryPlayAudio(), 60);
      }
    };

    const startVoice = async () => {
      if (!unlocked) {
        await unlockWelcomeAutoplay();
        unlocked = true;
      }
      void tryPlayAudio();
    };

    /* Pre-unlock autoplay as early as possible (muted — no audible glitch) */
    void unlockWelcomeAutoplay().then(() => {
      unlocked = true;
    });

    /* Intro ends exactly at 3s — matches welcome.mp3 + animation */
    introTimer = setTimeout(completeOnce, getIntroTotalDurationMs());

    /* Voice starts with "Welcome" text — synced to animation */
    textStartTimer = setTimeout(() => {
      void startVoice();
    }, introTiming.textAnimationStart * 1000);

    return () => {
      clearTimers();
      stopWelcomeVoice();
    };
  }, [enabled, completeOnce]);
}
