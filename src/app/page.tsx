'use client'

import { useCallback, useLayoutEffect, useState } from 'react'
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
import { useWelcomeIntro } from '@/hooks/useWelcomeIntro'

import {
  hasPlayedIntro,
  setIntroPlayed,
  consumeReturnToPortfolio,
  peekReturnToPortfolio,
  handleFreshDocumentLoad,
} from '@/lib/introState'

function scrollToPortfolioSection() {
  document.getElementById('portfolio')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showApp, setShowApp] = useState(false)
  const [portfolioVisible, setPortfolioVisible] = useState(false)

  const finishIntro = useCallback(() => {
    setIntroPlayed()
    setShowApp(true)
    setPortfolioVisible(true)
    setShowWelcome(false)
  }, [])

  useWelcomeIntro({
    enabled: showWelcome,
    onComplete: finishIntro,
  })

  useLayoutEffect(() => {
    const currentHash = window.location.hash
    const pathname = window.location.pathname
    const returningFromProject = peekReturnToPortfolio()

    if (returningFromProject || currentHash === '#portfolio') {
      consumeReturnToPortfolio()
      setShowWelcome(false)
      setShowApp(true)
      setPortfolioVisible(true)
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
      sessionStorage.removeItem('heroPlayed')

      if (window.location.hash) {
        history.replaceState(null, '', '/')
      }

      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    if (!hasPlayedIntro()) {
      setShowWelcome(true)
      setShowApp(false)
      setPortfolioVisible(false)
      return
    }

    setShowWelcome(false)
    setShowApp(true)
    setPortfolioVisible(true)
  }, [])

  return (
    <>
      <main className="relative overflow-hidden">
        <AnimatedBackground />

        <motion.div
          className="relative z-[2]"
          initial={false}
          animate={{
            opacity: portfolioVisible ? 1 : 0,
            scale: portfolioVisible ? 1 : 0.985,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Navbar />
          <Hero showApp={showApp} />
          <About />
          <Skills />
          <PortfolioShowcase />
          <Experience />
          <SeoContent />
          <SocialMedia />
          <ContactSection />
        </motion.div>

        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
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
