'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Send, User, Mail, MessageSquare } from 'lucide-react'
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa'
import { PERSON, SOCIAL } from '@/lib/site'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
}

const contactLinks = [
  {
    label: 'Email',
    href: `mailto:${PERSON.email}`,
    value: PERSON.email,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: SOCIAL.linkedin,
    value: 'LinkedIn Profile',
    icon: FaLinkedinIn,
  },
  {
    label: 'GitHub',
    href: SOCIAL.github,
    value: 'GitHub Profile',
    icon: FaGithub,
  },
  {
    label: 'Instagram',
    href: SOCIAL.instagram,
    value: 'Instagram Profile',
    icon: FaInstagram,
  },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus(result.error || 'Failed to send message')
      }
    } catch {
      setStatus('Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-8 flex flex-col h-full"
    >
      <motion.div
        variants={fieldVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{PERSON.name}</h3>
        <p className="text-sm text-white/50 mb-5">
          {PERSON.jobTitle} · {PERSON.location}
        </p>
      </motion.div>

      <ul className="space-y-2 mb-6" aria-label="Contact links">
        {contactLinks.map((link) => {
          const Icon = link.icon
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/65 hover:text-white transition py-1.5"
              >
                <Icon size={16} className="shrink-0 text-white/40" aria-hidden />
                <span className="font-mono text-xs text-white/40 w-16 shrink-0">
                  {link.label}
                </span>
                <span className="truncate">{link.value}</span>
              </a>
            </li>
          )
        })}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1" noValidate>
        <motion.div variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" aria-hidden />
            <input
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="Your Name"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <label htmlFor="contact-email" className="sr-only">
            Your email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" aria-hidden />
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="Your Email"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <label htmlFor="contact-message" className="sr-only">
            Your message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-white/40" aria-hidden />
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Your Message"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none resize-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {status && (
          <p
            role="status"
            className={`text-sm text-center p-3 rounded-xl ${
              status.includes('success')
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
          >
            {status}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-2xl py-4 bg-white/10 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} aria-hidden />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
