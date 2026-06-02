export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "freelance",
    period: "2024 — Present",
    title: "Freelance Full Stack Developer",
    organization: "Independent · Madhya Pradesh, India",
    description:
      "Ashish Kumar Upadhyay delivers end-to-end web solutions for clients — from UI/UX to deployment on Vercel and Firebase.",
    highlights: [
      "Built and shipped LearnX, Noamani, Spylt, Mojito, and Room Booking App",
      "React.js & Next.js frontends with Node.js, Express.js, and MongoDB backends",
      "Payment integrations, auth flows, and responsive production deployments",
    ],
  },
  {
    id: "fullstack",
    period: "2023 — Present",
    title: "Full Stack Development",
    organization: "Masai School · Personal Projects",
    description:
      "Trained full stack developer focused on modern JavaScript ecosystems, clean architecture, and recruiter-ready deliverables.",
    highlights: [
      "Specialized in React.js, Next.js, TypeScript, and REST APIs",
      "Firebase authentication, real-time data, and cloud hosting",
      "1+ year of hands-on freelance and client project experience",
    ],
  },
  {
    id: "client-projects",
    period: "2024 — 2026",
    title: "Client & Product Projects",
    organization: "E-commerce · EdTech · Hospitality",
    description:
      "Led development of production-grade apps used by real users — e-commerce, learning platforms, and booking systems.",
    highlights: [
      "Noamani Perfume — premium e-commerce with secure checkout",
      "LearnX — learning platform with auth and structured content",
      "Room Booking App — reservation flows and admin-ready UX",
    ],
  },
];
