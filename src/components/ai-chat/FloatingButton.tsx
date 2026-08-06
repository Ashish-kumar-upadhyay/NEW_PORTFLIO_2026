"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export default function FloatingButton({ isOpen, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close Ashish AI chat" : "Open Ashish AI chat assistant"}
      aria-expanded={isOpen}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="ai-chat-fab group fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-[950] flex items-center justify-center w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
    >
      {/* Idle pulse ring */}
      {!isOpen && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-white/20"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Glass button */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[rgba(20,20,20,0.72)] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:border-white/25 group-hover:shadow-[0_0_28px_rgba(120,180,255,0.22),0_8px_32px_rgba(0,0,0,0.5)]"
      />

      {/* Neon glow on hover */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_50%,rgba(100,160,255,0.18),transparent_70%)]"
      />

      <Sparkles
        className="relative z-10 w-5 h-5 sm:w-[22px] sm:h-[22px] text-white/90 group-hover:text-white transition-colors"
        aria-hidden
      />
    </motion.button>
  );
}
