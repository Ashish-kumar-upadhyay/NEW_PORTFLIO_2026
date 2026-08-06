"use client";

import { motion } from "framer-motion";

type Props = {
  questions: { label: string; prompt: string }[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
};

export default function SuggestedQuestions({
  questions,
  onSelect,
  disabled,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {questions.map((q) => (
        <motion.button
          key={q.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(q.prompt)}
          whileHover={{ scale: disabled ? 1 : 1.03 }}
          whileTap={{ scale: disabled ? 1 : 0.97 }}
          className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wide border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.08] backdrop-blur-sm transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          {q.label}
        </motion.button>
      ))}
    </div>
  );
}
