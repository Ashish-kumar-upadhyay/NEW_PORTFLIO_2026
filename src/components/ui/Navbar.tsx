'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const NAVBAR_OFFSET = 90
const SCROLL_DURATION = 900

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const scrollAnimationRef = useRef<number | null>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      if (isScrollingRef.current) return

      const sections = [
        'home',
        'about',
        'skills',
        'portfolio',
        'experience',
        'contact',
      ]

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (!section) continue

        const rect = section.getBoundingClientRect()

        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    handleResize()
    handleScroll()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const navbarPlayed = sessionStorage.getItem('navbarPlayed')

    if (navbarPlayed) {
      setShowNavbar(true)
      return
    }

    const timer = setTimeout(() => {
      setShowNavbar(true)
      sessionStorage.setItem('navbarPlayed', 'true')
    }, 3800)

    return () => clearTimeout(timer)
  }, [])

  const smoothScrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault()

      const target = document.querySelector(targetId)
      if (!target) return

      const sectionId = targetId.replace('#', '')
      setActiveSection(sectionId)
      setOpen(false)

      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current)
        scrollAnimationRef.current = null
      }

      const html = document.documentElement
      const previousScrollBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET

      const startPosition = window.scrollY
      const distance = targetPosition - startPosition

      if (Math.abs(distance) < 2) {
        html.style.scrollBehavior = previousScrollBehavior
        history.replaceState(null, '', targetId)
        return
      }

      isScrollingRef.current = true
      let startTime: number | null = null

      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime

        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / SCROLL_DURATION, 1)
        const ease = easeOutQuart(progress)

        window.scrollTo(0, startPosition + distance * ease)

        if (progress < 1) {
          scrollAnimationRef.current = requestAnimationFrame(animation)
        } else {
          scrollAnimationRef.current = null
          isScrollingRef.current = false
          html.style.scrollBehavior = previousScrollBehavior
          history.replaceState(null, '', targetId)
        }
      }

      scrollAnimationRef.current = requestAnimationFrame(animation)
    },
    []
  )

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current)
      }
    }
  }, [])

  if (!mounted) return null

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'portfolio' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{
        opacity: showNavbar ? 1 : 0,
        y: showNavbar ? 0 : -40,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed top-5 z-50 ${isMobile ? 'left-5 right-5' : 'left-[60px] right-[60px]'}`}
    >
      <div
        className={`flex justify-between items-center py-2.5 px-[30px] w-full rounded-full backdrop-blur-[12px] border border-[var(--border)] ${
          scrolled ? 'bg-[rgba(13,13,13,0.85)]' : 'bg-[rgba(13,13,13,0.5)]'
        }`}
      >
        <a
          href="#home"
          onClick={(e) => smoothScrollTo(e, '#home')}
          className="font-['DM_Mono',monospace] text-[13px] text-[var(--text-secondary)] tracking-[0.06em] no-underline"
          aria-label="Ashish Kumar Upadhyay — Home"
        >
          Ashish Kumar Upadhyay
        </a>

        {!isMobile && (
          <div className="flex gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                  className={`relative font-['DM_Mono',monospace] text-[13px] no-underline tracking-[0.08em] cursor-pointer pb-1 transition-colors duration-[250ms] ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-px bg-white origin-left transition-transform duration-[250ms] ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            })}
          </div>
        )}

        {isMobile && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1 cursor-pointer bg-transparent border-0 p-0"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="w-5 h-0.5 bg-white" />
            <span className="w-5 h-0.5 bg-white" />
            <span className="w-5 h-0.5 bg-white" />
          </button>
        )}
      </div>

      {isMobile && open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-2.5 rounded-2xl bg-[rgba(13,13,13,0.9)] border border-[var(--border)] backdrop-blur-[12px] p-5 flex flex-col gap-[18px]"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                className={`font-['DM_Mono',monospace] text-[13px] no-underline ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </motion.div>
      )}
    </motion.nav>
  )
}
