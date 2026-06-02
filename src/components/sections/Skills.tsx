"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { techStack } from "@/data/techStack";
import { PERSON } from "@/lib/site";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 py-20 md:py-28 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-white/45 uppercase mb-3">
          Technical Expertise
        </p>
        <h2
          id="skills-heading"
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Skills & Technologies
        </h2>
        <p className="text-white/55 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          {PERSON.name} builds production-ready applications with modern
          full stack tools — from responsive UIs to scalable APIs and cloud
          deployment.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 max-w-5xl mx-auto">
        {techStack.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="group rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center gap-3 h-[130px] p-4"
          >
            <div className="relative flex items-center justify-center w-14 h-14">
              <div className="absolute inset-0 rounded-full bg-white/15 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <Image
                src={item.logo_url}
                alt={`${item.name} logo`}
                width={52}
                height={52}
                loading="lazy"
                className="relative z-10 object-contain"
              />
            </div>
            <p className="text-[12px] text-white/85 text-center font-medium">
              {item.name}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
