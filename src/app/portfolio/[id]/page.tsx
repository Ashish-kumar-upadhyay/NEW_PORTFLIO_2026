'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { getProjectDetail, type ProjectDetail } from '@/data/projectDetails'
import { setReturnToPortfolio } from '@/lib/introState'
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Sparkles,
  Code2,
  Layers,
  Box,
  BookOpen,
  Shield,
  Database,
  FolderTree,
  Target,
  Briefcase,
} from 'lucide-react'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

type DbProject = {
  title: string
  description: string
  technologies: string
  key_features: string
  image_url: string
  live_url: string
  github_url: string
}

function DetailSection({
  icon: Icon,
  title,
  items,
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  items: string[]
  delay?: number
}) {
  if (!items.length) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: smoothEase }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101010] to-[#171717] p-5 md:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={15} className="text-white/70" />
        <h2 className="text-sm md:text-base font-semibold">{title}</h2>
      </div>
      <ul className="space-y-2.5 text-[12px] md:text-[13px] text-white/65 leading-6">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + i * 0.03, duration: 0.4 }}
            className="flex gap-3"
          >
            <span className="text-white/35 shrink-0">•</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  )
}

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const local = getProjectDetail(String(id))
      if (local) {
        setProject(local)
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        const db = data as DbProject
        setProject({
          id: String(id),
          title: db.title,
          overview: db.description,
          image: db.image_url,
          link: db.live_url,
          github: db.github_url,
          keyFeatures: (db.key_features || '')
            .split(',')
            .map((f) => f.trim())
            .filter(Boolean),
          technicalImplementation: [],
          technologies: (db.technologies || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          learningOutcomes: [],
          projectSignificance: db.description,
        })
      }
      setLoading(false)
    }

    load()
  }, [id])

  const handleBack = () => {
    setReturnToPortfolio(String(id))
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/50">
        Loading project details...
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4 px-6">
        <p className="text-white/60">Project not found.</p>
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </button>
      </div>
    )
  }

  const isExternalImage =
    project.image?.startsWith('http://') || project.image?.startsWith('https://')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white px-6 md:px-10 lg:px-16 py-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#1a1a1a_0%,#0a0a0a_35%,#050505_100%)]" />
      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[140px] -z-10" />
      <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-white/[0.04] blur-[160px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-all duration-300 mb-8"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </motion.button>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            {project.subtitle && (
              <p className="text-xs md:text-sm text-white/45 font-mono tracking-wide mb-2 uppercase">
                {project.subtitle}
              </p>
            )}
            <h1 className="text-[28px] md:text-[42px] font-bold leading-tight tracking-tight mb-4">
              {project.title}
            </h1>
            <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-white/40 to-white/5 mb-5" />

            <p className="text-[13px] md:text-[14px] leading-7 text-white/65 text-justify mb-6">
              {project.overview}
            </p>

            {project.stats && project.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {project.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center"
                  >
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-[10px] text-white/40 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  <Code2 size={15} />
                </div>
                <div>
                  <p className="text-base font-semibold">{project.technologies.length}</p>
                  <p className="text-[10px] text-white/40">Technologies</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  <Layers size={15} />
                </div>
                <div>
                  <p className="text-base font-semibold">{project.keyFeatures.length}</p>
                  <p className="text-[10px] text-white/40">Key Features</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all text-sm"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              ) : null}
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 transition-all text-sm"
                >
                  <GitBranch size={14} />
                  GitHub
                </a>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="relative rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#111] to-[#171717]"
          >
            {project.image ? (
              isExternalImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[240px] md:h-[320px] lg:h-[360px] object-cover"
                />
              ) : (
                <div className="relative w-full h-[240px] md:h-[320px] lg:h-[360px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )
            ) : (
              <div className="w-full h-[240px] md:h-[320px] flex items-center justify-center text-white/30">
                No preview
              </div>
            )}
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={14} className="text-white/70" />
            <h2 className="text-sm font-semibold">Technologies Used</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.03 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-white/75"
              >
                <Box size={11} className="text-white/40" />
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 pb-16">
          <DetailSection
            icon={Sparkles}
            title="Key Features"
            items={project.keyFeatures}
            delay={0.2}
          />
          <DetailSection
            icon={Target}
            title="Technical Implementation"
            items={project.technicalImplementation}
            delay={0.25}
          />
          {project.projectStructure && (
            <DetailSection
              icon={FolderTree}
              title="Project Structure"
              items={project.projectStructure}
              delay={0.3}
            />
          )}
          {project.databaseArchitecture && (
            <DetailSection
              icon={Database}
              title="Database Architecture"
              items={project.databaseArchitecture}
              delay={0.32}
            />
          )}
          {project.securityFeatures && (
            <DetailSection
              icon={Shield}
              title="Security Features"
              items={project.securityFeatures}
              delay={0.34}
            />
          )}
          <DetailSection
            icon={BookOpen}
            title="Learning Outcomes"
            items={project.learningOutcomes}
            delay={0.36}
          />
          {project.role && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: smoothEase }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101010] to-[#171717] p-5 md:p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={15} className="text-white/70" />
                <h2 className="text-sm md:text-base font-semibold">Your Role</h2>
              </div>
              <p className="text-[12px] md:text-[13px] text-white/65 leading-6">
                {project.role}
              </p>
            </motion.section>
          )}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
            className="md:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 md:p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={15} className="text-white/70" />
              <h2 className="text-sm md:text-base font-semibold">Project Significance</h2>
            </div>
            <p className="text-[12px] md:text-[13px] text-white/65 leading-7">
              {project.projectSignificance}
            </p>
          </motion.section>
        </div>
      </div>
    </motion.div>
  )
}
