"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { PERSON, SOCIAL } from "@/lib/site";

const links = [
  {
    title: "LinkedIn",
    handle: "ashish-kumar-upadhyay",
    href: SOCIAL.linkedin,
    icon: FaLinkedinIn,
    description: "Connect for collaborations and professional updates",
  },
  {
    title: "GitHub",
    handle: "Ashish-kumar-upadhyay",
    href: SOCIAL.github,
    icon: FaGithub,
    description: "Open-source work, repositories, and code samples",
  },
  {
    title: "Instagram",
    handle: "ashish.kumar.upadhyay",
    href: SOCIAL.instagram,
    icon: FaInstagram,
    description: "Behind-the-scenes and personal brand moments",
  },
];

export default function SocialMedia() {
  return (
    <section
      id="social"
      aria-labelledby="social-heading"
      className="w-full max-w-[1100px] mx-auto px-8 md:px-12 lg:px-20 py-16 md:py-24 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className="text-center mb-10"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-white/45 uppercase mb-3">
          Stay Connected
        </p>
        <h2 id="social-heading" className="text-3xl md:text-4xl font-bold mb-3">
          Social Media
        </h2>
        <p className="text-white/55 text-sm md:text-base max-w-xl mx-auto">
          Follow {PERSON.name} across platforms for projects, updates, and
          networking.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {links.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 flex flex-col gap-4"
              aria-label={`${PERSON.name} on ${item.title}`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                  <Icon aria-hidden />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-white/40 group-hover:text-white transition"
                  aria-hidden
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-white/40 font-mono mb-2">
                  @{item.handle}
                </p>
                <p className="text-sm text-white/55 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
