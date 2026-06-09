"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  index: number;
  id?: string;
  image?: string;
  live_url?: string;
  github?: string;
  tech?: string[];
  inCarousel?: boolean;
  isActive?: boolean;
};

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
  github,
  tech = [],
  inCarousel = false,
  isActive = true,
}: Props) {
  const router = useRouter();
  const isExternalImage =
    image?.startsWith("http://") || image?.startsWith("https://");

  return (
    <motion.article
      initial={
        inCarousel
          ? false
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }
      }
      whileInView={inCarousel ? undefined : { opacity: 1, x: 0, y: 0 }}
      transition={inCarousel ? undefined : { duration: 0.75, delay: index * 0.06 }}
      viewport={inCarousel ? undefined : { once: true }}
      whileHover={isActive ? { y: -4 } : undefined}
      className={`group relative rounded-[26px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col min-h-[380px] ${
        inCarousel && isActive ? "bg-white/[0.07]" : ""
      }`}
    >
      <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] mb-4 relative">
        {image ? (
          isExternalImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={`${title} project screenshot`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <Image
              src={image}
              alt={`${title} project screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          )
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white/30 text-sm"
            aria-hidden
          >
            Preview
          </div>
        )}
      </div>

      <h3 className="text-[19px] font-semibold mb-2 leading-tight">{title}</h3>

      <p className="text-[14px] text-white/60 leading-relaxed line-clamp-3 min-h-[48px] mb-3">
        {description}
      </p>

      {tech.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Technologies used">
          {tech.slice(0, 6).map((t) => (
            <li
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/55"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
        {live_url ? (
          <a
            href={live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] text-white/75 hover:text-white transition-all"
          >
            Live Demo
            <ArrowUpRight size={14} aria-hidden />
          </a>
        ) : (
          <span className="text-[13px] text-white/35">No live link</span>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] text-white/75 hover:text-white transition-all"
            aria-label={`${title} on GitHub`}
          >
            <FaGithub size={14} aria-hidden />
            GitHub
          </a>
        )}

        {id && (
          <button
            type="button"
            onClick={() => router.push(`/portfolio/${id}`)}
            className="ml-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2 text-[14px]"
          >
            Details
            <ArrowRight size={13} aria-hidden />
          </button>
        )}
      </div>
    </motion.article>
  );
}
