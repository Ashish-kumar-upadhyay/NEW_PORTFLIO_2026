import { PERSON, SITE_URL, SOCIAL } from "@/lib/site";

export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: SITE_URL,
    email: `mailto:${PERSON.email}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    sameAs: [SOCIAL.linkedin, SOCIAL.github, SOCIAL.instagram],
    knowsAbout: [
      "React.js",
      "Next.js",
      "JavaScript",
      "Firebase",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${PERSON.name} | Full Stack Developer Portfolio`,
    url: SITE_URL,
    description: PERSON.summary,
    author: {
      "@type": "Person",
      name: PERSON.name,
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
    },
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
