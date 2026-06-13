import { PERSON } from "@/lib/site";

export default function SeoContent() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full max-w-[1100px] mx-auto px-8 md:px-12 lg:px-20 py-16 md:py-20 text-white border-t border-white/5"
    >
      <p className="font-mono text-xs tracking-[0.2em] text-white/45 uppercase mb-3 text-center">
        Development Services
      </p>
      <h2
        id="services-heading"
        className="text-2xl md:text-4xl font-bold mb-6 text-center"
      >
        {PERSON.name} — Full Stack Development Services
      </h2>

      <div className="grid md:grid-cols-2 gap-8 text-sm md:text-base text-white/60 leading-relaxed">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Next.js Web Applications
          </h3>
          <p className="mb-4">
            {PERSON.name} builds fast, SEO-friendly web applications using
            Next.js and React.js — from landing pages and dashboards to
            full-scale SaaS products. Every project focuses on responsive
            design, server-side rendering, and optimized Core Web Vitals for
            better search rankings and user experience.
          </p>
          <p>
            Whether you need a portfolio, e-commerce store, or internal tool,
            Ashish delivers clean architecture with TypeScript, Tailwind CSS,
            and Vercel deployment pipelines that scale with your business.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Firebase & Backend Integration
          </h3>
          <p className="mb-4">
            With hands-on Firebase experience, {PERSON.name} implements secure
            authentication, realtime databases, cloud storage, and serverless
            functions. Combined with Node.js, Express.js, and MongoDB, he
            creates robust REST APIs and full-stack solutions for startups and
            established businesses across India.
          </p>
          <p>
            Based in {PERSON.address.addressLocality},{" "}
            {PERSON.address.addressRegion} ({PERSON.address.postalCode}),
            Ashish works as a freelance developer and is open to remote
            collaborations and contract-based projects worldwide. Explore the{" "}
            <a href="#portfolio" className="text-white/80 underline">
              project portfolio
            </a>
            ,{" "}
            <a href="#skills" className="text-white/80 underline">
              technical skills
            </a>
            , and{" "}
            <a href="#contact" className="text-white/80 underline">
              contact section
            </a>{" "}
            to get started.
          </p>
        </div>
      </div>
    </section>
  );
}
