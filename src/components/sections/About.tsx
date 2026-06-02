"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FileText, ArrowUpRight, MapPin } from "lucide-react";
import { PERSON } from "@/lib/site";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 70, rotate: 2 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        padding: isMobile ? "60px 24px 20px" : "80px 60px 20px 120px",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            style={{ maxWidth: "640px", width: "100%" }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
              <span
                className="font-mono text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                ABOUT ME
              </span>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeUp}
              style={{
                fontSize: isMobile ? 32 : "clamp(32px,5vw,46px)",
                fontWeight: 800,
                lineHeight: 1.08,
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              {PERSON.name}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="flex items-center gap-2 text-sm mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              <MapPin size={14} aria-hidden />
              {PERSON.jobTitle} · {PERSON.location}
            </motion.p>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                maxWidth: isMobile ? "100%" : "540px",
              }}
            >
              {PERSON.summary} With over a year of freelance experience and
              Masai-trained full stack fundamentals, Ashish Kumar Upadhyay
              transforms ideas into polished, production-ready products — from
              e-commerce and ed-tech to booking systems and brand websites.
            </motion.p>

            <motion.p
              variants={fadeUp}
              style={{
                marginTop: 14,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                maxWidth: isMobile ? "100%" : "540px",
              }}
            >
              <strong style={{ color: "var(--text-primary)" }}>
                Skills & experience:
              </strong>{" "}
              React.js, Next.js, JavaScript, TypeScript, Firebase, Node.js,
              Express.js, MongoDB, Git, GitHub, and Vercel deployments. Comfortable
              across the stack — UI engineering, REST APIs, authentication, and
              database design.
            </motion.p>

            <motion.p
              variants={fadeUp}
              style={{
                marginTop: 14,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                maxWidth: isMobile ? "100%" : "540px",
              }}
            >
              <strong style={{ color: "var(--text-primary)" }}>Career goals:</strong>{" "}
              Join a product-focused team or grow as a senior freelance developer,
              shipping high-impact features for global clients while building a
              recognizable personal brand as {PERSON.name}.
            </motion.p>

            <motion.blockquote
              variants={fadeUp}
              style={{
                marginTop: 18,
                padding: "12px 20px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                fontSize: 13,
                fontStyle: "italic",
                color: "var(--text-secondary)",
              }}
            >
              “Clean code, fast UX, and reliable deployments — the foundation of
              every project I ship.”
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
                flexWrap: "wrap",
              }}
            >
              <a
                href={PERSON.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 18px",
                    borderRadius: 8,
                    border: "1px solid white",
                    background: "white",
                    color: "black",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <FileText size={14} aria-hidden />
                  Download Resume
                </button>
              </a>

              <button
                type="button"
                onClick={scrollToPortfolio}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  borderRadius: 8,
                  border: "1px solid white",
                  background: "transparent",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <ArrowUpRight size={14} aria-hidden />
                View Projects
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={isMobile ? "mt-4" : ""}
            style={{
              width: isMobile ? "100%" : "42%",
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            <div
              style={{
                padding: 12,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                transform: isMobile ? "none" : "translateX(-60px)",
              }}
            >
              <Image
                src={PERSON.profileImage}
                alt={`${PERSON.name} — professional profile photo`}
                width={260}
                height={260}
                loading="lazy"
                className="rounded-full object-cover block"
                style={{ width: isMobile ? 200 : 240, height: isMobile ? 200 : 240 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
