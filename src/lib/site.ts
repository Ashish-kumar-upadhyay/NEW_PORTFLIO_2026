export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ashishupadhyay.qzz.io";

/** Preferred Google Search site name (concise brand, not a tagline). */
export const SITE_NAME = "Ashish Kumar Upadhyay";

export const PERSON = {
  name: SITE_NAME,
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
    "Ashish Kumar Upadhyay is the official portfolio of a Freelance Full Stack Developer based in Indore, Madhya Pradesh, India. Specializing in React.js, Next.js, JavaScript, Firebase, Node.js, Express.js, and MongoDB, Ashish Kumar Upadhyay delivers production-ready web applications for clients worldwide.",
  resumeUrl:
    "https://drive.google.com/file/d/1K_ENQEWvcDYr4RY7j83oSt6vI1nCMsSw/view?usp=sharing",
  profileImage: "/assets/PP.png",
  ogImage: "/assets/PP.png",
} as const;

export const WHATSAPP_URL = `https://wa.me/${PERSON.phone.replace(/\D/g, "")}`;

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-NG8S7Z3K6B";

export const SOCIAL = {
  linkedin:
    "https://www.linkedin.com/in/ashish-kumar-upadhyay-071499284",
  github: "https://github.com/Ashish-kumar-upadhyay",
  instagram: "https://www.instagram.com/ashish.kumar.upadhyay",
} as const;

export const SEO = {
  title: "Ashish Kumar Upadhyay — Official Website & Portfolio",
  description:
    "Ashish Kumar Upadhyay — official website and Full Stack Developer portfolio. Freelance web developer from Indore, India. React.js, Next.js, Node.js, Firebase, MongoDB projects, skills, and contact.",
  keywords: [
    "Ashish Kumar Upadhyay",
    "ashish kumar upadhyay",
    "Ashish Kumar Upadhyay official website",
    "Ashish Kumar Upadhyay portfolio",
    "Ashish Kumar Upadhyay full stack developer",
    "Ashish Kumar Upadhyay developer Indore",
    "Ashish Kumar Upadhyay freelance developer",
    "who is Ashish Kumar Upadhyay",
    "Freelance Full Stack Developer",
    "Full Stack Developer",
    "React.js developer",
    "Next.js developer",
    "Firebase developer",
    "Indore developer",
    "Madhya Pradesh developer",
    "JavaScript developer",
    "MongoDB developer",
  ],
} as const;
