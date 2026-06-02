'use client'

import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import CommentsSection from './CommentsSection'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full max-w-[1500px] mx-auto 
      px-5 sm:px-6 md:px-10 lg:px-20
      pt-20 sm:pt-24 lg:pt-28 
      pb-24 sm:pb-28 lg:pb-32 
      text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12 sm:mb-14 lg:mb-16"
      >
        <h2
          id="contact-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
        >
          Contact Ashish Kumar Upadhyay
        </h2>

        <p className="text-white/60 text-sm sm:text-base max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
          Have a project, role, or collaboration in mind? Reach out via the form
          or connect on LinkedIn, GitHub, and Instagram.
        </p>
      </motion.div>

      <div
        className="
        grid 
        grid-cols-1 
        lg:grid-cols-[420px_1fr] 
        gap-6 sm:gap-8 md:gap-10 lg:gap-12
      "
      >
        <div className="w-full">
          <ContactForm />
        </div>

        <div className="w-full">
          <CommentsSection />
        </div>
      </div>
    </section>
  )
}
