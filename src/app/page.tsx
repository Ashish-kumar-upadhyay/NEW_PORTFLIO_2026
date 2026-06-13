'use client'

import { useLayoutEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import AnimatedBackground from '@/components/AnimatedBackground'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import Experience from '@/components/sections/Experience'
import SocialMedia from '@/components/sections/SocialMedia'
import ContactSection from '@/components/sections/contact/ContactSection'
import SeoContent from '@/components/sections/SeoContent'
import Footer from '@/components/sections/Footer'
import WelcomeScreen from '@/components/WelcomeScreen'

import {
  hasPlayedIntro,
  setIntroPlayed,
  consumeReturnToPortfolio,
  peekReturnToPortfolio,
  handleFreshDocumentLoad,
} from '@/lib/introState'

function getInitialShowWelcome() {
  if (typeof window === 'undefined') return false
  if (peekReturnToPortfolio()) return false
  if (window.location.hash === '#portfolio') return false
  return !hasPlayedIntro()
}

function scrollToPortfolioSection() {
  document.getElementById('portfolio')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(getInitialShowWelcome)
  const [showApp, setShowApp] = useState(() => !getInitialShowWelcome())

  useLayoutEffect(() => {
    const currentHash = window.location.hash
    const pathname = window.location.pathname
    const returningFromProject = peekReturnToPortfolio()

    if (returningFromProject || currentHash === '#portfolio') {
      consumeReturnToPortfolio()
      setShowWelcome(false)
      setShowApp(true)
      setIntroPlayed()

      requestAnimationFrame(() => {
        scrollToPortfolioSection()
        setTimeout(scrollToPortfolioSection, 350)
        setTimeout(scrollToPortfolioSection, 900)
      })
      return
    }

    const isNewDocument = handleFreshDocumentLoad()
    const navEntries = performance.getEntriesByType('navigation')
    const navigationType =
      navEntries.length > 0
        ? (navEntries[0] as PerformanceNavigationTiming).type
        : null

    const isReload = navigationType === 'reload'

    if (isNewDocument && isReload && pathname === '/') {
      sessionStorage.removeItem('introPlayed')
      sessionStorage.removeItem('heroPlayed')

      if (window.location.hash) {
        history.replaceState(null, '', '/')
      }

      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    if (!hasPlayedIntro()) {
      setShowWelcome(true)
      setShowApp(false)

      const timer = setTimeout(() => {
        setShowWelcome(false)
        setShowApp(true)
        setIntroPlayed()
      }, 2800)

      return () => clearTimeout(timer)
    }

    setShowWelcome(false)
    setShowApp(true)
  }, [])

  return (
    <>
      <main className="relative overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-[2]">
          <Navbar />
          <Hero showApp={showApp} />
          <About />
          <Skills />
          <PortfolioShowcase />
          <Experience />
          <SeoContent />
          <SocialMedia />
          <ContactSection />
        </div>

        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              onAnimationStart={(definition) => {
                if (definition === 'exit') {
                  setShowApp(true)
                }
              }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="fixed inset-0 z-[9999]"
            >
              <WelcomeScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
