export interface TechStack {
  id: string;
  name: string;
  logo_url: string;
  category: string;
}

const cdn = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export const techStack: TechStack[] = [
  {
    id: "html",
    name: "HTML",
    logo_url: cdn("html5/html5-original.svg"),
    category: "frontend",
  },
  {
    id: "css",
    name: "CSS",
    logo_url: cdn("css3/css3-original.svg"),
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    logo_url: cdn("javascript/javascript-original.svg"),
    category: "frontend",
  },
  {
    id: "typescript",
    name: "TypeScript",
    logo_url: "/assets/typescript.svg",
    category: "frontend",
  },
  {
    id: "react",
    name: "React.js",
    logo_url: "/assets/react.svg",
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    logo_url: "/assets/nextjs.svg",
    category: "frontend",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    logo_url: "/assets/tailwind.svg",
    category: "frontend",
  },
  {
    id: "firebase",
    name: "Firebase",
    logo_url: cdn("firebase/firebase-plain.svg"),
    category: "backend",
  },
  {
    id: "nodejs",
    name: "Node.js",
    logo_url: "/assets/nodejs.svg",
    category: "backend",
  },
  {
    id: "express",
    name: "Express.js",
    logo_url: cdn("express/express-original.svg"),
    category: "backend",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    logo_url: "/assets/mongodb.svg",
    category: "database",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    logo_url: "/assets/postgresql.svg",
    category: "database",
  },
  {
    id: "git",
    name: "Git",
    logo_url: "/assets/git.svg",
    category: "tools",
  },
  {
    id: "github",
    name: "GitHub",
    logo_url: cdn("github/github-original.svg"),
    category: "tools",
  },
  {
    id: "vercel",
    name: "Vercel",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    category: "tools",
  },
];
