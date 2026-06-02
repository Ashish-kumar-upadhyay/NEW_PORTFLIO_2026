"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/experience";
import { PERSON } from "@/lib/site";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full max-w-[1100px] mx-auto px-8 md:px-12 lg:px-20 py-20 md:py-28 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-white/45 uppercase mb-3">
          Career Journey
        </p>
        <h2
          id="experience-heading"
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Experience Timeline
        </h2>
        <p className="text-white/55 max-w-2xl mx-auto text-sm md:text-base">
          Professional milestones of {PERSON.name} — freelancing, full stack
          development, and client deliverables across India.
        </p>
      </motion.div>

      <ol className="relative border-l border-white/10 ml-3 md:ml-6 space-y-10">
        {experience.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="relative pl-8 md:pl-12"
          >
            <span
              className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-white border-4 border-[#0d0d0d]"
              aria-hidden
            />
            <div className="rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Briefcase size={18} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50">{item.organization}</p>
                  </div>
                </div>
                <time className="text-xs font-mono text-white/40 tracking-wide shrink-0">
                  {item.period}
                </time>
              </div>
              <p className="text-sm text-white/65 leading-relaxed mb-4">
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-sm text-white/55 flex gap-2 leading-relaxed"
                  >
                    <span className="text-white/30 shrink-0">▸</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
