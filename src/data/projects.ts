export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  github?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "learnx-lms",
    title: "LearnX Learning Platform",
    description:
      "A full-featured learning platform with authentication, structured courses, and a modern dashboard. Built for scalable education delivery with React.js and a robust backend.",
    image: "/assets/lms.png",
    tech: ["Next.js", "React.js", "Node.js", "MongoDB", "Firebase", "JavaScript"],
    link: "https://learnxplatform.qzz.io/",
    featured: true,
  },
  {
    id: "noamani-perfume",
    title: "Noamani Perfume E-commerce Website",
    description:
      "Premium perfume e-commerce with product catalog, filtering, cart, and secure checkout. Elegant UI designed for luxury retail and high conversion.",
    image: "/assets/noamani.png",
    tech: ["Next.js", "React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    link: "https://www.noamani.com/",
    featured: true,
  },
  {
    id: "spylt-modern",
    title: "Spylt Modern Website",
    description:
      "A sleek, animation-rich marketing site with responsive layouts and performance-focused delivery. Showcases modern front-end craft and brand storytelling.",
    image: "/assets/project-placeholder.svg",
    tech: ["React.js", "Next.js", "JavaScript", "CSS", "Vercel"],
    link: "https://spylt-modern-design.vercel.app/",
    featured: true,
  },
  {
    id: "mojito-modern",
    title: "Mojito Modern Website",
    description:
      "Contemporary landing experience with smooth interactions, mobile-first design, and fast Vercel deployment — ideal for product launches and portfolios.",
    image: "/assets/project-placeholder.svg",
    tech: ["React.js", "Next.js", "JavaScript", "HTML", "CSS", "Vercel"],
    link: "https://mojito-modern-website.vercel.app/",
    featured: true,
  },
  {
    id: "room-booking",
    title: "Room Booking App",
    description:
      "Hospitality booking application with availability flows, clean UX, and full stack integration. Built for real-world reservation use cases.",
    image: "/assets/project-placeholder.svg",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript"],
    link: "https://room-booking-ebon.vercel.app/",
    featured: true,
  },
];
