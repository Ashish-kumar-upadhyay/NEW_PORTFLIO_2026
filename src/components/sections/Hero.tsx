"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import App from "@/components/band/App";
import TextType from "@/components/band/TextType";
import { PERSON } from "@/lib/site";

const skills = [
  "React.js",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Firebase",
  "TypeScript",
];

type HeroProps = {
  showApp: boolean;
};

export default function Hero({ showApp }: HeroProps) {
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    const heroPlayed = sessionStorage.getItem("heroPlayed");

    if (heroPlayed === "true") {
      setStartAnim(true);
      return;
    }

    const delay = 3600;

    const textTimer = setTimeout(() => {
      setStartAnim(true);
    }, delay);

    const appTimer = setTimeout(() => {
      sessionStorage.setItem("heroPlayed", "true");
    }, delay + 1500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(appTimer);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="px-6 md:pl-[120px] md:pr-[60px]"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 40,
          pointerEvents: showApp ? "auto" : "none",
        }}
        aria-hidden={!showApp}
      >
        {showApp && <App />}
      </div>

      <div
        className="md:max-w-[640px] w-full relative z-[5] flex flex-col md:flex-row md:items-center md:gap-10"
      >
        {/* Profile — visible on mobile & as accent on desktop */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-0 shrink-0 md:hidden"
        >
          <div className="w-[88px] h-[88px] rounded-full border border-white/20 p-1 overflow-hidden">
            <Image
              src={PERSON.profileImage}
              alt={`${PERSON.name} — Full Stack Developer`}
              width={88}
              height={88}
              priority
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.div
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 30, filter: "blur(12px)" }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 16 }}
          >
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              ✦ {PERSON.location} · Available for work
            </span>
          </motion.div>

          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.85, y: 50 }
            }
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.05] tracking-tight mb-2"
            style={{
              fontSize: "clamp(28px, 5.5vw, 52px)",
              color: "var(--text-primary)",
            }}
          >
            {PERSON.name}
          </motion.h1>

          <motion.p
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -40 }
            }
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-2xl font-semibold mb-5"
            style={{ color: "var(--text-secondary)" }}
          >
            {PERSON.jobTitle}
          </motion.p>

          <motion.div
            initial={false}
            animate={startAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ marginBottom: 14 }}
          >
            <span
              className="font-mono text-sm"
              style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}
            >
              <TextType
                text={[
                  "Full Stack Developer",
                  "React.js & Next.js Specialist",
                  "Freelance Developer",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                deletingSpeed={50}
                cursorBlinkDuration={0.5}
              />
            </span>
          </motion.div>

          <motion.p
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 50, scale: 0.96 }
            }
            transition={{ duration: 1, delay: 0.45 }}
            className="mb-6 max-w-[480px] text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {PERSON.summary.split(".")[0]}.
            Building scalable web apps with clean code, modern UI, and
            production-ready deployments.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={startAnim ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
            }}
            className="flex flex-wrap gap-2 mb-7"
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.85 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                className="font-mono text-[11px] rounded-full px-3 py-1 border"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={false}
            animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <a
              href={PERSON.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:opacity-90 transition"
            >
              <FileText size={15} aria-hidden />
              Download Resume
            </a>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white text-white text-sm font-semibold hover:bg-white/10 transition"
            >
              <Mail size={15} aria-hidden />
              Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={false}
            animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col gap-1.5 font-mono text-[13px]"
            style={{ color: "var(--text-muted)" }}
          >
            <span>↓ explore projects & experience below</span>
            <span>↗ open to full-time & freelance opportunities</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [1, 0.65, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll <span>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
