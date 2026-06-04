'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import useComments from '@/hooks/useComments'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

export default function CommentsSection() {
  const { comments, loading, likeComment, refreshComments } = useComments()

  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim()) return

    setIsLoading(true)
    setStatus('')

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          comment,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('Comment posted successfully!')
        setName('')
        setComment('')
        await refreshComments()
      } else {
        setStatus(result.error || 'Failed to post comment')
      }
    } catch (error) {
      setStatus('Failed to post comment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: smoothEase,
      }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] md:rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-8 h-full w-full flex flex-col min-h-[100%]"
    >
      {/* HEADER */}
      <div className="mb-5 md:mb-6">
        <h3 className="text-xl md:text-2xl font-semibold mb-1">
          Comments
        </h3>

        <p className="text-xs md:text-sm text-white/40">
          Leave your thoughts here
        </p>
      </div>

      {/* FORM */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="flex-1 flex flex-col space-y-3 md:space-y-4 min-h-0"
      >
        <motion.input
          variants={itemVariants}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full shrink-0 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 md:py-4 outline-none focus:border-white"
        />

        <motion.textarea
          variants={itemVariants}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your Comment"
          className="w-full flex-1 min-h-[200px] lg:min-h-0 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 md:py-4 outline-none resize-none focus:border-white"
        />

        {/* STATUS MESSAGE */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm text-center p-3 rounded-xl mb-4 ${
              status.includes('success') 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
          >
            {status}
          </motion.div>
        )}

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading || isLoading}
          className="w-full shrink-0 mt-auto rounded-2xl py-3 md:py-4 bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(loading || isLoading) ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Posting...
            </>
          ) : (
            'Post Comment'
          )}
        </motion.button>
      </motion.div>

    </motion.div>
  )
}