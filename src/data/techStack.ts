export interface TechStack {
  id: string
  name: string
  logo_url: string
  category: string
}

export const techStack: TechStack[] = [
  {
    id: 'react',
    name: 'React.js',
    logo_url: '/assets/react.svg',
    category: 'frontend'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    logo_url: '/assets/nextjs.svg',
    category: 'frontend'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    logo_url: '/assets/typescript.svg',
    category: 'frontend'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    logo_url: '/assets/tailwind.svg',
    category: 'frontend'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    logo_url: '/assets/nodejs.svg',
    category: 'backend'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    logo_url: '/assets/mongodb.svg',
    category: 'database'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    logo_url: '/assets/postgresql.svg',
    category: 'database'
  },
  {
    id: 'socketio',
    name: 'Socket.io',
    logo_url: '/assets/socketio.svg',
    category: 'backend'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo_url: '/assets/stripe.svg',
    category: 'payment'
  },
  {
    id: 'git',
    name: 'Git',
    logo_url: '/assets/git.svg',
    category: 'tools'
  },
]
