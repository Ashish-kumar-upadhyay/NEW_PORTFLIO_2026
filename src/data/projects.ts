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
    id: "doctor-appointment",
    title: "DocTime — Doctor Appointment",
    description:
      "Next.js healthcare booking platform with Firebase auth, 100+ doctors across specialties, time-slot appointments, and full booking history.",
    image: "/assets/project/doctor.png",
    tech: ["Next.js", "Firebase", "TypeScript", "Tailwind CSS", "Authentication"],
    link: "https://doctor-slot.vercel.app/",
    featured: true,
  },
  {
    id: "employee-task-management",
    title: "Employee Task Management",
    description:
      "Team task management system with dual admin/employee dashboards, EmailJS notifications, gamification, leaderboards, and real-time analytics.",
    image: "/assets/project/emoplyee-task.png",
    tech: ["React", "TypeScript", "Firebase", "Supabase", "EmailJS", "Recharts", "Tailwind CSS"],
    link: "https://update-emoplyee-task-mang.vercel.app/",
    featured: true,
  },
  {
    id: "learnx-lms",
    title: "LearnX Learning Platform",
    description:
      "AI-powered full-stack LMS with role-based dashboards for Students, Teachers, and Admins — real-time sync, exams, attendance, and Gemini AI tutoring.",
    image: "/assets/project/lms.png",
    tech: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Gemini AI", "shadcn/ui"],
    link: "https://learnxplatform.qzz.io/",
    featured: true,
  },
  {
    id: "noamani-perfume",
    title: "Noamani Perfume E-commerce Website",
    description:
      "Luxury fragrance e-commerce with Razorpay payments, Google OAuth, admin dashboard, cart management, and premium Framer Motion animations.",
    image: "/assets/project/noamani.png",
    tech: ["Next.js", "MongoDB", "Razorpay", "Framer Motion", "Tailwind CSS", "Firebase"],
    link: "https://www.noamani.com/",
    featured: true,
  },
  {
    id: "spylt-modern",
    title: "Spylt Modern Website",
    description:
      "Awwwards-style smoothie brand clone with GSAP ScrollTrigger, SplitText animations, flavor slider, and clip-path video reveals.",
    image: "/assets/project/spylt-modern.png",
    tech: ["React", "GSAP", "Tailwind CSS", "Vite", "ScrollTrigger", "SplitText"],
    link: "https://spylt-modern-design.vercel.app/",
    featured: true,
  },
  {
    id: "mojito-modern",
    title: "Mojito Modern Website",
    description:
      "Immersive Awwwards-style cocktail brand site with GSAP timelines, parallax scrolling, pinned video sections, and SplitText reveals.",
    image: "/assets/project/mojito-modern.png",
    tech: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Vite", "ScrollTrigger"],
    link: "https://mojito-modern-website.vercel.app/",
    featured: true,
  },
  {
    id: "room-booking",
    title: "Room Booking App",
    description:
      "Full-stack hospitality booking app with Supabase auth, real-time reservations, admin dashboard, and shadcn/ui components.",
    image: "/assets/project/rrom-booking.png",
    tech: ["React", "TypeScript", "Supabase", "shadcn/ui", "TanStack Query", "Zod"],
    link: "https://room-booking-ebon.vercel.app/",
    featured: true,
  },
];
