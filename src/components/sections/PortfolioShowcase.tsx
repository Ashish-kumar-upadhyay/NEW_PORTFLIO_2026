'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
} from 'lucide-react'
import usePortfolio from '@/hooks/usePortfolio'
import ProjectsCarousel from './ProjectsCarousel'
import { projects as localProjects } from '@/data/projects'
import { certificates as localCertificates } from '@/data/certificates'
import { techStack as localTechStack } from '@/data/techStack'

export default function PortfolioShowcase() {
  const {
    projects,
    certificates,
    techStacks,
    loading,
  } = usePortfolio()

  const localProjectIds = new Set(localProjects.map((p) => String(p.id)))
  const dbOnlyProjects = projects.filter(
    (p) => !localProjectIds.has(String(p.id))
  )
  const allProjects = [...localProjects, ...dbOnlyProjects]

  const localCertIds = new Set(localCertificates.map((c) => String(c.id)))
  const dbOnlyCerts = certificates.filter(
    (c) => !localCertIds.has(String(c.id))
  )
  const allCertificates = [...localCertificates, ...dbOnlyCerts]

  const localTechIds = new Set(localTechStack.map((t) => String(t.id)))
  const dbOnlyTech = techStacks.filter(
    (t) => !localTechIds.has(String(t.id))
  )
  const allTechStack = [...localTechStack, ...dbOnlyTech]

  const hasProjects = allProjects.length > 0

  const [activeTab, setActiveTab] =
    useState('projects')

  const [previewOpen, setPreviewOpen] =
    useState(false)

  const [previewImage, setPreviewImage] =
    useState('')

  const carouselProjects = allProjects.map((item) => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    image: item.image_url || item.image,
    live_url: item.live_url || item.link,
    github: item.github_url || item.github,
    tech:
      item.tech ||
      (item.technologies
        ? String(item.technologies)
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
        : []),
  }))

  return (
    <>
      {/* PREVIEW */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center px-6"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>

            <motion.img
              initial={{
                scale: 0.92,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.92,
                opacity: 0,
              }}
              transition={{ duration: 0.35 }}
              src={previewImage}
              className="max-w-[88vw] max-h-[88vh] rounded-3xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="portfolio"
        className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 pt-16 pb-24 text-white"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            Featured Projects
          </h2>

          <p className="text-white/55 max-w-xl mx-auto text-sm md:text-base">
            Real-world applications built by Ashish Kumar Upadhyay — e-commerce,
            ed-tech, hospitality, and modern brand websites.
          </p>
        </motion.div>

        {/* TAB */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-3xl rounded-full border border-white/10 bg-white/5 p-2 flex gap-2 backdrop-blur-xl">
            {[
              'projects',
              'certificates',
              'techstack',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-full py-3 text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab === 'projects'
                  ? 'Projects'
                  : tab === 'certificates'
                  ? 'Certificates'
                  : 'Tech Stack'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
          >
            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                {loading && !hasProjects && (
                  <div className="text-center text-white/50 py-16">
                    Loading projects...
                  </div>
                )}
                {hasProjects && (
                  <ProjectsCarousel projects={carouselProjects} />
                )}
              </div>
            )}

            {/* CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div className="flex justify-center">
                <div className="grid md:grid-cols-2 gap-8 px-1 max-w-5xl w-full">
                  {allCertificates.length === 0 && loading && (
                    <div className="col-span-full text-center text-white/50 py-16">
                      Loading certificates...
                    </div>
                  )}
                  {allCertificates.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          y: 25,
                          scale: 0.96,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.04,
                        }}
                        whileHover={{ y: -4 }}
                        onClick={() => {
                          setPreviewImage(
                            item.image
                          )
                          setPreviewOpen(true)
                        }}
                        className="group cursor-pointer rounded-[26px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col items-center"
                      >
                        <div className="w-fit max-w-full mx-auto rounded-2xl overflow-hidden border border-white/10 mb-4 bg-black/10">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="block w-auto h-auto max-h-[360px] max-w-full object-contain group-hover:scale-[1.02] transition duration-500"
                          />
                        </div>

                        <h3 className="text-[19px] font-semibold mb-3 text-center text-white/90 w-full">
                          {item.title}
                        </h3>
                        
                        <div className="text-sm text-white/60 text-center">
                          <p>{item.issuer}</p>
                          <p className="mt-1">{item.date}</p>
                        </div>
                        
                        {item.credential_id && (
                          <p className="text-xs text-white/40 text-center mt-3">
                            {item.credential_id}
                          </p>
                        )}

                        {item.credential_url && (
                          <a
                            href={item.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white transition"
                          >
                            View Certificate
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* TECH STACK */}
            {activeTab === 'techstack' && (
              <div className="min-h-[360px] flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl w-full">
                  {allTechStack?.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          y: 20,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.04,
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.04,
                        }}
                        className="group rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center gap-3 h-[125px] w-[125px] mx-auto"
                      >
                        <div className="relative flex items-center justify-center">
                          {/* GLOW */}
                          <div className="absolute w-[70px] h-[70px] rounded-full bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

                          {item.logo_url ? (
                            <img
                              src={item.logo_url}
                              alt={item.name}
                              className="relative z-10 w-[56px] h-[56px] object-contain"
                            />
                          ) : (
                            <div className="relative z-10 w-[56px] h-[56px] rounded-2xl bg-white/10" />
                          )}
                        </div>

                        <p className="text-[11px] text-white/80 text-center leading-tight px-2 line-clamp-1">
                          {item.name}
                        </p>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}