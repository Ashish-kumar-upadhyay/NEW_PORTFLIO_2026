export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ashishupadhyay.qzz.io";

export const PERSON = {
  name: "Ashish Kumar Upadhyay",
  jobTitle: "Full Stack Developer",
  location: "Madhya Pradesh, India",
  email: "ashishkumarupadhyay0328@gmail.com",
  summary:
    "Ashish Kumar Upadhyay is a Full Stack Developer specializing in React.js, Next.js, JavaScript, Firebase, Node.js, Express.js, and MongoDB. He has built multiple real-world applications including LearnX Learning Platform, Noamani Perfume E-commerce Website, Room Booking App, Spylt Modern Website, and Mojito Modern Website.",
  resumeUrl:
    "https://drive.google.com/file/d/1K_ENQEWvcDYr4RY7j83oSt6vI1nCMsSw/view?usp=sharing",
  profileImage: "/assets/PP.png",
  ogImage: "/assets/PP.png",
} as const;

export const SOCIAL = {
  linkedin:
    "https://www.linkedin.com/in/ashish-kumar-upadhyay-071499284",
  github: "https://github.com/Ashish-kumar-upadhyay",
  instagram: "https://www.instagram.com/ashish.kumar.upadhyay",
} as const;

export const SEO = {
  title: "Ashish Kumar Upadhyay | Full Stack Developer Portfolio",
  description:
    "Ashish Kumar Upadhyay is a Full Stack Developer skilled in React.js, Next.js, JavaScript, Firebase, Node.js, Express.js, and MongoDB. Explore projects, skills, experience, and contact information.",
  keywords: [
    "Ashish Kumar Upadhyay",
    "Full Stack Developer",
    "React.js developer",
    "Next.js developer",
    "Madhya Pradesh developer",
    "portfolio",
    "JavaScript developer",
    "MongoDB developer",
  ],
} as const;
