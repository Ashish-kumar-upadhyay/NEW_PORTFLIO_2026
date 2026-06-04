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
  {
    id: "masai-trainee",
    period: "Aug 2024 — Mar 2025",
    title: "Full Stack Development Trainee",
    organization: "Masai School, Bangalore",
    description:
      "Completed 1000+ hours of intensive, industry-style Full Stack Development training — building real applications, collaborating in teams, and strengthening engineering fundamentals alongside modern web technologies.",
    highlights: [
      "Trained in React.js, Next.js, Node.js, MongoDB, Firebase, and JavaScript with production-focused projects",
      "Developed and deployed end-to-end apps with authentication, database integration, and responsive UI",
      "Collaborated on team projects using Git, GitHub, and version-control workflows",
      "Applied debugging, performance optimization, and software engineering best practices",
      "Strengthened Data Structures & Algorithms and problem-solving through regular coding challenges",
    ],
  },
];
