export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ashishupadhyay.qzz.io";

export const PERSON = {
  name: "Ashish Kumar Upadhyay",
  jobTitle: "Freelance Full Stack Developer",
  location: "Indore, Madhya Pradesh, India",
  address: {
    streetAddress: "Indore",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "453441",
    addressCountry: "IN",
  },
  email: "ashishkumarupadhyay0328@gmail.com",
  phone: "+91 7987665254",
  summary:
    "Ashish Kumar Upadhyay is a Freelance Full Stack Developer specializing in React.js, Next.js, JavaScript, Firebase, Node.js, Express.js, and MongoDB. Based in Indore, Madhya Pradesh, he delivers production-ready web applications for clients worldwide.",
  resumeUrl:
    "https://drive.google.com/file/d/1K_ENQEWvcDYr4RY7j83oSt6vI1nCMsSw/view?usp=sharing",
  profileImage: "/assets/PP.png",
  ogImage: "/assets/PP.png",
} as const;

export const WHATSAPP_URL = `https://wa.me/${PERSON.phone.replace(/\D/g, "")}`;

export const SOCIAL = {
  linkedin:
    "https://www.linkedin.com/in/ashish-kumar-upadhyay-071499284",
  github: "https://github.com/Ashish-kumar-upadhyay",
  instagram: "https://www.instagram.com/ashish.kumar.upadhyay",
} as const;

export const SEO = {
  title: "Ashish Kumar Upadhyay | Freelance Next.js & Firebase Developer",
  description:
    "Freelance Full Stack Developer Ashish Kumar Upadhyay — React.js, Next.js, Firebase & Node.js expert. Hire for web apps, APIs & portfolio projects.",
  keywords: [
    "Ashish Kumar Upadhyay",
    "Freelance Full Stack Developer",
    "Freelance developer India",
    "Full Stack Developer",
    "React.js developer",
    "Next.js developer",
    "NextJS developer",
    "Firebase developer",
    "Indore developer",
    "Madhya Pradesh developer",
    "portfolio",
    "JavaScript developer",
    "MongoDB developer",
  ],
} as const;
