'use client'

import { motion } from 'framer-motion'
import { Code2, User, Globe } from 'lucide-react'
import { INTRO_EASE, introTiming } from '@/lib/introTiming'

type WelcomeScreenProps = {
  /** Gates animation start so audio + motion begin together */
  started?: boolean
}

export default function WelcomeScreen({ started = true }: WelcomeScreenProps) {
  const icons = [Code2, User, Globe]
  const t = introTiming

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: t.container.duration,
          ease: INTRO_EASE,
        }}
        style={{
          textAlign: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        {/* ICONS */}
        <motion.div
          initial="hidden"
          animate={started ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: t.icons.stagger,
              },
            },
          }}
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.3,
                  rotate: -140,
                  y: 60,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: 0,
                },
              }}
              transition={{
                duration: t.icons.duration,
                ease: INTRO_EASE,
              }}
              animate={
                started
                  ? {
                      y: [0, -6, 0],
                      rotate: [0, 2, -2, 0],
                    }
                  : undefined
              }
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Icon size={18} color="white" />
            </motion.div>
          ))}
        </motion.div>

        {/* TEXT */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            {/* Welcome */}
            <motion.span
              initial={{ opacity: 0, x: 120 }}
              animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 }}
              transition={{
                delay: t.welcome.delay,
                duration: t.welcome.duration,
                ease: INTRO_EASE,
              }}
              style={{
                fontSize: 'clamp(18px, 3vw, 30px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
              }}
            >
              Welcome
            </motion.span>

            {/* to my */}
            <motion.span
              initial={{ opacity: 0, x: -120 }}
              animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
              transition={{
                delay: t.toMy.delay,
                duration: t.toMy.duration,
                ease: INTRO_EASE,
              }}
              style={{
                fontSize: 'clamp(18px, 3vw, 30px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
              }}
            >
              to my
            </motion.span>
          </div>

          {/* Portfolio */}
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
            transition={{
              delay: t.portfolio.delay,
              duration: t.portfolio.duration,
              ease: INTRO_EASE,
            }}
            style={{
              fontSize: 'clamp(18px, 3vw, 30px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.15,
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Portfolio Website
          </motion.h1>
        </div>

        {/* DOMAIN CAPSULE */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
          transition={{
            delay: t.domain.delay,
            duration: t.domain.duration,
            ease: INTRO_EASE,
          }}
          style={{
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
            fontSize: '12px',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          ashishupadhyay.qzz.io
        </motion.div>
      </motion.div>
    </div>
  )
}
