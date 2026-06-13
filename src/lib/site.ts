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
    "Ashish Kumar Upadhyay is a Freelance Full Stack Developer specializing in React.js, Next.js, JavaScript, Firebase, Node.js, Express.js, and MongoDB. Based in Indore, Madhya Pradesh, he delivers production-ready web applications for clients worldwide.",
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
  title: "Ashish Kumar Upadhyay | Full Stack Developer Portfolio",
  description:
    "Ashish Kumar Upadhyay — official Full Stack Developer portfolio from Indore, India. React.js, Next.js, Node.js, Firebase, MongoDB projects and freelance services.",
  keywords: [
    "Ashish Kumar Upadhyay",
    "ashish kumar upadhyay",
    "Ashish Kumar Upadhyay portfolio",
    "Ashish Kumar Upadhyay full stack developer",
    "Ashish Kumar Upadhyay developer Indore",
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
