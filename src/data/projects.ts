export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  link: string
  github?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'noamani-perfume',
    title: 'Noamani - Premium E-commerce Platform',
    description: 'A sophisticated e-commerce platform for luxury perfumes featuring advanced product filtering, secure payment gateway integration, and elegant user experience. Built with modern web technologies for optimal performance and scalability.',
    image: '/assets/noamani.png',
    tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    link: 'https://noamani.com',
    featured: true,
  },
  {
    id: 'learnx-lms',
    title: 'LearnX - Next-Gen School Management System',
    description: 'Comprehensive Learning Management System with cutting-edge features including GPS-based attendance tracking, advanced anti-cheating mechanisms, real-time collaboration tools, and seamless communication between students, teachers, and administrators.',
    image: '/assets/lms.png',
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Socket.io', 'GPS Integration'],
    link: 'https://learnxplatform.qzz.io/auth',
    featured: true,
  },
]
