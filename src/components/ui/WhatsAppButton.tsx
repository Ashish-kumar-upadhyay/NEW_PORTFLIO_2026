'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_URL } from '@/lib/site'

export default function WhatsAppButton() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[900] flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-shadow duration-300"
    >
      <FaWhatsapp className="text-[26px] sm:text-[30px]" aria-hidden />
    </motion.a>
  )
}
