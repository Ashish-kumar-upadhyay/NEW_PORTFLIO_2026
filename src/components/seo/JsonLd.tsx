import { PERSON, SITE_NAME, SITE_URL, SOCIAL } from "@/lib/site";

export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: SITE_URL,
    telephone: PERSON.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: PERSON.address.streetAddress,
      addressLocality: PERSON.address.addressLocality,
      addressRegion: PERSON.address.addressRegion,
      postalCode: PERSON.address.postalCode,
      addressCountry: PERSON.address.addressCountry,
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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${PERSON.name} — Freelance Full Stack Development`,
    description: PERSON.summary,
    url: SITE_URL,
    telephone: PERSON.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: PERSON.address.streetAddress,
      addressLocality: PERSON.address.addressLocality,
      addressRegion: PERSON.address.addressRegion,
      postalCode: PERSON.address.postalCode,
      addressCountry: PERSON.address.addressCountry,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    priceRange: "$$",
    sameAs: [SOCIAL.linkedin, SOCIAL.github, SOCIAL.instagram],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: [
      "Ashish kumar upadhyay",
      "Ashish Kumar Upadhyay Full Stack Developer",
      "ashishupadhyay.qzz.io",
    ],
    url: `${SITE_URL}/`,
    description: PERSON.summary,
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
