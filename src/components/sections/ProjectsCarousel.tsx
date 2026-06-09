'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import PortfolioCard from './PortfolioCard'
import { consumePortfolioReturnProjectId } from '@/lib/introState'

export type CarouselProject = {
  id: string
  title: string
  description: string
  image?: string
  live_url?: string
  github?: string
  tech?: string[]
}

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const AUTO_PLAY_MS = 5500

function getWrappedOffset(index: number, current: number, total: number) {
  let diff = index - current
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

type Props = {
  projects: CarouselProject[]
}

export default function ProjectsCarousel({ projects }: Props) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const total = projects.length

  const paginate = useCallback(
    (direction: number) => {
      setCurrent((prev) => (prev + direction + total) % total)
    },
    [total]
  )

  useEffect(() => {
    if (projects.length === 0) return

    const returnProjectId = consumePortfolioReturnProjectId()
    if (!returnProjectId) return

    const index = projects.findIndex((p) => p.id === returnProjectId)
    if (index >= 0) {
      setCurrent(index)
      setIsPaused(true)
    }
  }, [projects])

  useEffect(() => {
    if (total <= 1 || isPaused || isHovering) return
    const id = setInterval(() => paginate(1), AUTO_PLAY_MS)
    return () => clearInterval(id)
  }, [total, isPaused, isHovering, paginate, current])

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    if (offset.x < -60 || velocity.x < -400) paginate(1)
    else if (offset.x > 60 || velocity.x > 400) paginate(-1)
  }

  if (total === 0) return null

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] max-w-3xl h-[55%] bg-gradient-to-r from-white/[0.04] via-white/[0.07] to-white/[0.04] blur-[90px] rounded-full pointer-events-none" />

      <motion.div
        className="relative overflow-hidden py-6 md:py-10 touch-pan-y"
        onPanEnd={handlePanEnd}
      >
        <div className="relative flex items-center justify-center h-[460px] sm:h-[500px] md:h-[520px]">
          {projects.map((project, index) => {
            const offset = getWrappedOffset(index, current, total)
            const isActive = offset === 0
            const isVisible = Math.abs(offset) <= 1

            if (!isVisible) return null

            return (
              <motion.div
                key={project.id}
                className="absolute w-[90%] max-w-[540px] sm:w-[85%] md:w-[52%] md:max-w-[500px] px-2"
                animate={{
                  x: `${offset * 108}%`,
                  scale: isActive ? 1 : 0.86,
                  opacity: isActive ? 1 : 0.32,
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  filter: isActive ? 'blur(0px)' : 'blur(2px)',
                }}
                transition={{ duration: 0.7, ease: smoothEase }}
                onClick={() => !isActive && setCurrent(index)}
                style={{ cursor: isActive ? 'default' : 'pointer' }}
              >
                <div
                  className={`rounded-[28px] transition-shadow duration-500 ${
                    isActive
                      ? 'shadow-[0_0_70px_rgba(255,255,255,0.1)] ring-1 ring-white/20'
                      : 'hover:opacity-60'
                  }`}
                >
                  <PortfolioCard
                    title={project.title}
                    description={project.description}
                    index={index}
                    id={project.id}
                    image={project.image}
                    live_url={project.live_url}
                    github={project.github}
                    tech={project.tech}
                    inCarousel
                    isActive={isActive}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous project"
            className="absolute left-0 sm:left-1 top-[42%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 hover:border-white/25 transition-all duration-300 group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next project"
            className="absolute right-0 sm:right-1 top-[42%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 hover:border-white/25 transition-all duration-300 group"
          >
            <ChevronRight
              size={20}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-1">
            <div className="flex items-center gap-2">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to ${project.title}`}
                  aria-current={i === current ? 'true' : undefined}
                  className="group p-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      i === current
                        ? 'w-9 sm:w-10 bg-white'
                        : 'w-1.5 bg-white/25 group-hover:bg-white/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition"
            >
              {isPaused ? <Play size={11} /> : <Pause size={11} />}
            </button>
          </div>

          <p className="text-center text-[11px] sm:text-[12px] text-white/35 mt-3 tracking-[0.2em] font-mono">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </>
      )}
    </div>
  )
}
