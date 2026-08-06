import { PERSON, SITE_URL, SOCIAL } from "@/lib/site";
import type { ChatEngine, ChatMessage, SuggestedQuestion } from "./types";

export const WELCOME_MESSAGE = `👋 Hi, I'm **Ashish AI**.

I can answer anything about **Ashish Kumar Upadhyay** including:

• Skills
• Projects
• Experience
• Resume
• Education
• Freelancing
• Tech Stack
• Availability
• Contact Details
• Pricing
• Hiring Questions

Ask me anything.`;

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { label: "Tell me about Ashish", prompt: "Tell me about Ashish Kumar Upadhyay" },
  { label: "Show his projects", prompt: "Show me his projects" },
  { label: "What technologies does he know?", prompt: "What technologies does Ashish use?" },
  { label: "Can I hire him?", prompt: "Can I hire Ashish for a project?" },
  { label: "Download Resume", prompt: "How can I download his resume?" },
  { label: "Contact Details", prompt: "What are his contact details?" },
  { label: "Experience", prompt: "Tell me about his experience" },
  { label: "Education", prompt: "What is his education background?" },
  { label: "Latest Work", prompt: "What is his latest work?" },
  { label: "Availability", prompt: "Is Ashish available for work?" },
  { label: "Freelancing", prompt: "Does Ashish take freelance projects?" },
  { label: "Open Source", prompt: "Does Ashish contribute to open source?" },
  { label: "GitHub", prompt: "Share his GitHub profile" },
  { label: "LinkedIn", prompt: "Share his LinkedIn profile" },
];

export const KNOWLEDGE = {
  personal: {
    name: PERSON.name,
    location: PERSON.location,
    role: "Freelance Full Stack Developer",
    specialization: [
      "React.js",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Firebase",
      "TypeScript",
      "Tailwind CSS",
    ],
    clients: ["International Clients", "Indian Clients"],
    availability: ["Remote", "Freelance", "Full-time", "Contract"],
  },
  about: `Ashish Kumar Upadhyay is a Full Stack Developer focused on building scalable, responsive, and modern web applications. He specializes in React.js, Next.js, Node.js, MongoDB, Firebase, Tailwind CSS, and TypeScript. He has delivered production-ready solutions for clients, businesses, and startups with a strong focus on UI/UX, performance, SEO, and clean architecture.`,
  education: [
    { degree: "Bachelor of Computer Applications (BCA)", school: "" },
    { degree: "Full Stack Development", school: "Masai School" },
  ],
  skills: {
    frontend: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind",
      "Framer Motion",
      "Redux",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "REST APIs",
      "Authentication",
      "JWT",
      "Git",
      "GitHub",
    ],
    deployment: ["Vercel", "Netlify", "Render"],
    seo: [
      "Technical SEO",
      "Schema",
      "Performance Optimization",
      "Core Web Vitals",
    ],
  },
  projects: [
    {
      name: "Portfolio Website",
      highlights: [
        "Modern premium portfolio",
        "Next.js",
        "SEO optimized",
        "Animations",
        "Responsive",
        "Performance optimized",
      ],
      url: SITE_URL,
    },
    {
      name: "Dr. Rajat Maheshwari — Doctor Website",
      highlights: [
        "Medical Website",
        "Appointment System",
        "SEO Optimized",
        "Google Search Console",
        "Schema Markup",
        "Responsive",
      ],
      url: "https://drrajatmaheshwari.dpdns.org",
    },
    {
      name: "Noamani",
      highlights: [
        "Luxury Perfume Store",
        "Dubai Client",
        "Next.js",
        "MongoDB",
        "Admin Dashboard",
        "Payment Ready",
        "Responsive",
      ],
      url: "https://www.noamani.com/",
    },
    {
      name: "LearnX LMS",
      highlights: [
        "Student Dashboard",
        "Teacher Dashboard",
        "Admin Dashboard",
        "Attendance",
        "Assignments",
        "Analytics",
        "Authentication",
      ],
      url: "https://learnxplatform.qzz.io/",
    },
    {
      name: "Movie Booking App",
      highlights: [
        "MERN Stack",
        "Authentication",
        "Booking",
        "Dashboard",
        "CRUD",
      ],
    },
    {
      name: "DocTime — Doctor Appointment",
      highlights: ["Next.js", "Firebase", "100+ doctors", "Time-slot booking"],
      url: "https://doctor-slot.vercel.app/",
    },
    {
      name: "Employee Task Management",
      highlights: ["React", "Firebase", "Gamification", "Analytics"],
      url: "https://update-emoplyee-task-mang.vercel.app/",
    },
    {
      name: "Room Booking App",
      highlights: ["React", "Supabase", "Admin Dashboard", "Real-time booking"],
      url: "https://room-booking-ebon.vercel.app/",
    },
  ],
  services: [
    "Website Development",
    "Landing Pages",
    "Portfolio Websites",
    "Business Websites",
    "Doctor Websites",
    "Dashboard Development",
    "Admin Panels",
    "SEO Optimization",
    "Performance Optimization",
    "Website Redesign",
    "Bug Fixes",
    "API Integration",
    "Deployment",
    "Maintenance",
  ],
  whyHire: [
    "Production Ready Code",
    "Modern UI",
    "Clean Architecture",
    "Fast Delivery",
    "SEO Friendly",
    "Responsive",
    "Performance Focused",
    "Good Communication",
    "Long Term Support",
  ],
  contact: {
    email: PERSON.email,
    phone: PERSON.phone,
    portfolio: SITE_URL,
    github: SOCIAL.github,
    linkedin: SOCIAL.linkedin,
    resume: PERSON.resumeUrl,
  },
  experienceYears: "1+ years of freelance and production project experience",
} as const;

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreIntent(query: string, keywords: string[], weight = 1) {
  const q = normalize(query);
  let score = 0;
  for (const kw of keywords) {
    if (q.includes(normalize(kw))) score += weight;
  }
  return score;
}

function formatProjectList(limit = 6) {
  return KNOWLEDGE.projects
    .slice(0, limit)
    .map(
      (p) =>
        `**${p.name}**${"url" in p && p.url ? `\n→ ${p.url}` : ""}\n${p.highlights.map((h) => `• ${h}`).join("\n")}`
    )
    .join("\n\n");
}

function formatSkills() {
  const { frontend, backend, deployment, seo } = KNOWLEDGE.skills;
  return `**Frontend:** ${frontend.join(", ")}

**Backend:** ${backend.join(", ")}

**Deployment:** ${deployment.join(", ")}

**SEO:** ${seo.join(", ")}`;
}

function formatServices() {
  return KNOWLEDGE.services.map((s) => `• ${s}`).join("\n");
}

function formatWhyHire() {
  return KNOWLEDGE.whyHire.map((w) => `✓ ${w}`).join("\n");
}

function formatContact() {
  const c = KNOWLEDGE.contact;
  return `**Email:** [${c.email}](mailto:${c.email})
**Phone:** [${c.phone}](tel:${c.phone.replace(/\s/g, "")})
**Portfolio:** [${c.portfolio}](${c.portfolio})
**GitHub:** [${c.github}](${c.github})
**LinkedIn:** [${c.linkedin}](${c.linkedin})
**Resume:** [Download Resume](${c.resume})`;
}

function formatEducation() {
  return KNOWLEDGE.education
    .map((e) =>
      e.school
        ? `• **${e.degree}** — ${e.school}`
        : `• **${e.degree}**`
    )
    .join("\n");
}

function formatExperience() {
  return `**Role:** ${KNOWLEDGE.personal.role}
**Duration:** 2024 — Present
**Location:** ${KNOWLEDGE.personal.location}

Ashish works with **international and Indian clients**, delivering end-to-end web solutions — from UI/UX design to deployment on Vercel and Firebase.

**Highlights:**
• Built LearnX LMS, Noamani e-commerce, Dr. Rajat Maheshwari medical site, and more
• React.js & Next.js frontends with Node.js, Express.js, and MongoDB backends
• Payment integrations, auth flows, and production deployments
• Masai School Full Stack Development training (1000+ hours)

**Experience:** ${KNOWLEDGE.experienceYears}`;
}

function formatAvailability() {
  return `Ashish is **available** for:

• **Remote** work worldwide
• **Freelance** projects
• **Full-time** opportunities
• **Contract** engagements

He works with startups, businesses, and individual clients. For urgent projects, reach out directly:

${formatContact()}`;
}

function formatPricing() {
  return `Website and app pricing depends on **scope and complexity**. Here are realistic ranges Ashish typically works within:

| Project Type | Estimated Range (INR) |
|---|---|
| Landing Page | ₹8,000 – ₹25,000 |
| Portfolio / Business Website | ₹15,000 – ₹50,000 |
| Doctor / Service Website + SEO | ₹25,000 – ₹75,000 |
| Dashboard / Admin Panel | ₹40,000 – ₹1,20,000 |
| Full E-commerce / SaaS MVP | ₹80,000 – ₹3,00,000+ |

**Factors that affect cost:**
• Number of pages and features
• Custom design vs. template-based
• Backend, auth, payments, admin panel
• SEO, animations, and integrations

For an accurate quote, share your requirements via email or WhatsApp. Ashish offers transparent communication and milestone-based delivery.`;
}

function formatTimeline() {
  return `Typical delivery timelines:

| Project Type | Timeline |
|---|---|
| Landing Page | 3 – 7 days |
| Portfolio / Business Website | 1 – 3 weeks |
| Doctor / Service Website | 2 – 4 weeks |
| Dashboard / Admin Panel | 3 – 6 weeks |
| E-commerce / SaaS MVP | 6 – 12+ weeks |

Timelines depend on content readiness, revisions, and feature complexity. Ashish prioritizes **fast delivery** without compromising quality and keeps clients updated throughout the process.`;
}

function formatSalary() {
  return `For **full-time or contract roles**, Ashish's compensation expectations are flexible and depend on:

• Role scope and responsibilities
• Tech stack and team structure
• Location (remote/on-site) and work hours
• Project duration and growth opportunity

As a guideline for **Indian market full-time roles**, he typically considers offers in the **₹4 – 8 LPA** range depending on experience alignment, with room for discussion based on role seniority and benefits.

For the best approach, recruiters should share the **job description, budget range, and timeline** — Ashish responds professionally and promptly.`;
}

function formatAbout() {
  return `${KNOWLEDGE.about}

**Location:** ${KNOWLEDGE.personal.location}
**Role:** ${KNOWLEDGE.personal.role}
**Specialization:** ${KNOWLEDGE.personal.specialization.join(", ")}

${formatWhyHire()}`;
}

function formatLatestWork() {
  const latest = KNOWLEDGE.projects.slice(0, 3);
  return `Here is Ashish's **most recent work**:

${latest
  .map(
    (p) =>
      `### ${p.name}\n${p.highlights.map((h) => `• ${h}`).join("\n")}${"url" in p && p.url ? `\n🔗 ${p.url}` : ""}`
  )
  .join("\n\n")}

Explore all projects on his [portfolio](${SITE_URL}/#portfolio).`;
}

function formatHirePitch() {
  return `**Yes — Ashish is open for hire!** 🚀

He is a reliable Full Stack Developer who delivers **production-ready** solutions with modern UI, clean architecture, and SEO best practices.

**Why clients & teams choose Ashish:**
${formatWhyHire()}

**Services offered:**
${formatServices()}

**Availability:** Remote · Freelance · Full-time · Contract

Ready to start? ${formatContact()}`;
}

function formatNeedDeveloper() {
  return `You're in the right place! **Ashish Kumar Upadhyay** is a Freelance Full Stack Developer who builds modern, scalable web applications for clients worldwide.

Whether you need a **landing page**, **business website**, **dashboard**, **e-commerce store**, or **SaaS MVP** — Ashish can help from design to deployment.

**Tech stack:** React.js, Next.js, Node.js, MongoDB, Firebase, TypeScript, Tailwind CSS

**What you get:**
${formatWhyHire()}

Let's discuss your project:
${formatContact()}`;
}

function formatOpenSource() {
  return `Ashish actively uses **GitHub** for project code, collaboration, and version control. You can explore his repositories and contributions here:

🔗 **GitHub:** [${SOCIAL.github}](${SOCIAL.github})

His portfolio includes production apps, client projects, and experimental builds. For collaboration or open-source inquiries, reach out via GitHub or email.`;
}

function formatResume() {
  return `You can view and download Ashish's resume here:

📄 **[Download Resume](${KNOWLEDGE.contact.resume})**

The resume includes his skills, projects, education, and experience as a Full Stack Developer. For a custom CV or referral, contact him directly at [${KNOWLEDGE.contact.email}](mailto:${KNOWLEDGE.contact.email}).`;
}

function formatPortfolio() {
  return `Explore Ashish's full portfolio here:

🌐 **[${SITE_URL}](${SITE_URL})**

**Featured projects:**
${formatProjectList(5)}

Scroll to the **Projects** section or browse individual case studies on the site.`;
}

function formatSaas() {
  return `**Yes — Ashish can build SaaS products.**

He has experience building full-stack platforms with:
• Multi-role dashboards (Student / Teacher / Admin in LearnX LMS)
• Authentication & authorization (JWT, Firebase)
• Real-time data, analytics, and admin panels
• REST APIs with Node.js / Express / MongoDB
• Modern React / Next.js frontends

From **MVP to production deployment** on Vercel — Ashish handles architecture, UI/UX, backend, and performance. Share your SaaS idea for a scoped proposal.`;
}

function formatDashboard() {
  return `**Yes — dashboard and admin panel development is a core strength.**

Examples:
• **LearnX LMS** — Student, Teacher & Admin dashboards with analytics
• **Noamani** — E-commerce admin with product & order management
• **Employee Task Management** — Admin analytics, leaderboards, reports
• **Room Booking App** — Admin dashboard for bookings & rooms

**Stack:** React, Next.js, TypeScript, Tailwind, charts, Firebase/Supabase/MongoDB

Ashish builds clean, responsive dashboards with role-based access and real-time data.`;
}

function formatEcommerce() {
  return `**Yes — Ashish builds e-commerce websites.**

**Noamani** (luxury perfume store for a Dubai client) includes:
• Product catalog & categories
• Shopping cart & checkout
• Razorpay payment integration
• Google OAuth authentication
• Admin dashboard & order management
• Premium Framer Motion UI

He can build similar stores with Next.js, MongoDB, payment gateways, and admin panels.`;
}

function formatSeo() {
  return `**Yes — SEO optimization is a key part of Ashish's workflow.**

**Skills:**
• Technical SEO (meta tags, sitemap, robots.txt)
• Schema.org structured data & JSON-LD
• Core Web Vitals & performance optimization
• Google Search Console integration
• Mobile-first responsive design

**Real example:** Dr. Rajat Maheshwari's medical website — fully SEO optimized with Schema Markup, Search Console, and improved indexing.

Ashish builds websites that rank and perform.`;
}

function formatRemote() {
  return `**Yes — Ashish works remotely** with clients across India and internationally.

He is experienced in:
• Async communication (email, WhatsApp, video calls)
• Milestone-based delivery
• Git-based collaboration
• Timezone-flexible scheduling

Based in **${KNOWLEDGE.personal.location}**, available for remote freelance, contract, and full-time roles.`;
}

function formatFullTime() {
  return `**Yes — Ashish is open to full-time opportunities** alongside freelance work.

He brings:
• 1+ years of production project experience
• React.js, Next.js, Node.js, MongoDB, Firebase expertise
• Masai School Full Stack training (1000+ hours)
• Strong UI/UX, SEO, and deployment skills

Recruiters can share JD and budget range. For salary discussions, Ashish responds professionally based on role scope.

${formatContact()}`;
}

function formatStartups() {
  return `**Absolutely — Ashish loves working with startups.**

He understands fast iteration, MVP delivery, and budget-conscious development. He has built products for ed-tech, e-commerce, healthcare, and hospitality clients.

**Startup-friendly approach:**
• MVP-first development
• Scalable architecture from day one
• Modern, investor-ready UI
• Fast turnaround without cutting quality

Let's build your startup product — ${formatContact()}`;
}

function formatRedesign() {
  return `**Yes — Ashish offers website redesign services.**

He can modernize outdated sites with:
• Premium UI/UX (glassmorphism, animations, dark themes)
• Mobile-first responsive layouts
• Performance & Core Web Vitals optimization
• SEO improvements & Schema markup
• Tech stack migration (to Next.js / React)

Share your current site and goals for a redesign quote.`;
}

function formatAdminPanels() {
  return formatDashboard();
}

function formatFreelancing() {
  return `**Yes — Ashish is an active freelance Full Stack Developer.**

**Engagement types:** Remote · Contract · Project-based · Retainer

**Services:**
${formatServices()}

**Clients:** International & Indian businesses, startups, doctors, and individual founders.

**Why hire Ashish for freelance work:**
${formatWhyHire()}

${formatContact()}`;
}

function formatFallback(query: string) {
  return `Great question! Here's a quick overview of **Ashish Kumar Upadhyay**:

${KNOWLEDGE.about}

**Quick links:**
${formatContact()}

**Popular topics I can help with:**
• Skills & tech stack
• Projects & portfolio
• Experience & education
• Hiring, pricing & timelines
• Contact & resume

Try asking: *"Show his projects"* or *"Can I hire him?"*

_(You asked: "${query}")_`;
}

type IntentHandler = { keywords: string[]; weight?: number; respond: () => string };

const INTENTS: IntentHandler[] = [
  {
    keywords: ["need a developer", "looking for developer", "hire developer", "find developer"],
    weight: 3,
    respond: formatNeedDeveloper,
  },
  {
    keywords: ["salary", "ctc", "compensation", "pay", "expecting", "lpa"],
    weight: 3,
    respond: formatSalary,
  },
  {
    keywords: ["cost", "price", "pricing", "how much", "budget", "charge", "rate", "fee"],
    weight: 3,
    respond: formatPricing,
  },
  {
    keywords: ["how long", "timeline", "duration", "deadline", "delivery time", "take to build"],
    weight: 3,
    respond: formatTimeline,
  },
  {
    keywords: ["resume", "cv", "curriculum"],
    weight: 3,
    respond: formatResume,
  },
  {
    keywords: ["github", "open source", "opensource", "repository", "repos"],
    weight: 3,
    respond: formatOpenSource,
  },
  {
    keywords: ["linkedin"],
    weight: 3,
    respond: () =>
      `Connect with Ashish on LinkedIn:\n\n🔗 [${SOCIAL.linkedin}](${SOCIAL.linkedin})\n\nHe shares project updates, professional milestones, and is open to collaborations.`,
  },
  {
    keywords: ["contact", "email", "phone", "reach", "whatsapp", "call"],
    weight: 2,
    respond: formatContact,
  },
  {
    keywords: ["portfolio", "website url", "site link"],
    weight: 2,
    respond: formatPortfolio,
  },
  {
    keywords: ["project", "work", "built", "showcase", "case study"],
    weight: 2,
    respond: () =>
      `Here are **Ashish Kumar Upadhyay's** key projects:\n\n${formatProjectList()}\n\nView all on his [portfolio](${SITE_URL}/#portfolio).`,
  },
  {
    keywords: ["latest", "recent", "new project", "last work"],
    weight: 3,
    respond: formatLatestWork,
  },
  {
    keywords: ["skill", "tech", "technology", "stack", "tools", "framework"],
    weight: 2,
    respond: () => `**Ashish's Tech Stack:**\n\n${formatSkills()}`,
  },
  {
    keywords: ["experience", "background", "career", "work history"],
    weight: 2,
    respond: formatExperience,
  },
  {
    keywords: ["education", "degree", "study", "masai", "bca", "college", "university"],
    weight: 2,
    respond: () => `**Education:**\n\n${formatEducation()}`,
  },
  {
    keywords: ["available", "availability", "free", "open for", "when can"],
    weight: 2,
    respond: formatAvailability,
  },
  {
    keywords: ["freelance", "freelancing", "contract", "part time"],
    weight: 2,
    respond: formatFreelancing,
  },
  {
    keywords: ["hire", "hiring", "work with", "collaborate", "engage"],
    weight: 2,
    respond: formatHirePitch,
  },
  {
    keywords: ["why hire", "why should", "why choose", "strength", "benefit"],
    weight: 3,
    respond: () =>
      `**Why hire Ashish Kumar Upadhyay?**\n\n${formatWhyHire()}\n\n${KNOWLEDGE.about}\n\n${formatContact()}`,
  },
  {
    keywords: ["saas", "software as a service", "mvp", "startup product"],
    weight: 2,
    respond: formatSaas,
  },
  {
    keywords: ["dashboard", "admin panel", "admin dashboard", "analytics panel"],
    weight: 2,
    respond: formatDashboard,
  },
  {
    keywords: ["ecommerce", "e-commerce", "online store", "shop", "store"],
    weight: 2,
    respond: formatEcommerce,
  },
  {
    keywords: ["seo", "search engine", "google ranking", "core web vitals"],
    weight: 2,
    respond: formatSeo,
  },
  {
    keywords: ["remote", "work from home", "wfh", "distributed"],
    weight: 2,
    respond: formatRemote,
  },
  {
    keywords: ["full time", "full-time", "fulltime", "join company", "on payroll"],
    weight: 2,
    respond: formatFullTime,
  },
  {
    keywords: ["startup", "start up", "founder", "early stage"],
    weight: 2,
    respond: formatStartups,
  },
  {
    keywords: ["redesign", "revamp", "modernize", "old website"],
    weight: 2,
    respond: formatRedesign,
  },
  {
    keywords: ["service", "offer", "what do you do", "what can he do"],
    weight: 2,
    respond: () =>
      `**Services Ashish offers:**\n\n${formatServices()}\n\n${formatContact()}`,
  },
  {
    keywords: ["who is", "about", "tell me about", "introduce", "who are you"],
    weight: 2,
    respond: formatAbout,
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    weight: 1,
    respond: () =>
      `Hello! 👋 I'm **Ashish AI**, the portfolio assistant for **Ashish Kumar Upadhyay**.

How can I help you today? I can tell you about his skills, projects, experience, availability, pricing, or how to get in touch.`,
  },
];

export function generateLocalResponse(
  message: string,
  _history: ChatMessage[] = []
): string {
  const trimmed = message.trim();
  if (!trimmed) {
    return "Please type a question and I'll help you learn about Ashish Kumar Upadhyay.";
  }

  let bestScore = 0;
  let bestResponse: (() => string) | null = null;

  for (const intent of INTENTS) {
    const s = scoreIntent(trimmed, intent.keywords, intent.weight ?? 1);
    if (s > bestScore) {
      bestScore = s;
      bestResponse = intent.respond;
    }
  }

  if (bestResponse && bestScore > 0) {
    return bestResponse();
  }

  return formatFallback(trimmed);
}

/** Default local engine — replace with OpenAI/Gemini adapter implementing ChatEngine */
export const localChatEngine: ChatEngine = {
  generateResponse: async (message, history) =>
    generateLocalResponse(message, history),
};

export async function* streamResponse(
  text: string,
  chunkSize = 2,
  delayMs = 12
): AsyncGenerator<string, void, unknown> {
  let i = 0;
  while (i < text.length) {
    const chunk = text.slice(i, i + chunkSize);
    i += chunkSize;
    yield chunk;
    await new Promise((r) => setTimeout(r, delayMs + Math.random() * 8));
  }
}
