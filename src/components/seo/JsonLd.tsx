import { PERSON, SEO, SITE_NAME, SITE_URL, SOCIAL } from "@/lib/site";

export default function JsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const profilePageId = `${SITE_URL}/#profilepage`;

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        givenName: "Ashish Kumar",
        familyName: "Upadhyay",
        alternateName: [
          "Ashish kumar upadhyay",
          "Ashish Kumar Upadhyay Full Stack Developer",
          "Ashish Kumar Upadhyay Developer",
        ],
        jobTitle: "Full Stack Developer",
        url: SITE_URL,
        image: `${SITE_URL}${PERSON.profileImage}`,
        email: `mailto:${PERSON.email}`,
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
          "Full Stack Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        alternateName: [
          "Ashish kumar upadhyay",
          "Ashish Kumar Upadhyay Full Stack Developer",
          "Ashish Kumar Upadhyay | Full Stack Developer Portfolio",
          "ashishupadhyay.qzz.io",
        ],
        url: `${SITE_URL}/`,
        description: PERSON.summary,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: SITE_URL,
        name: SEO.title,
        description: SEO.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "ProfessionalService",
        name: `${SITE_NAME} — Full Stack Development`,
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
        founder: { "@id": personId },
        sameAs: [SOCIAL.linkedin, SOCIAL.github, SOCIAL.instagram],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
    />
  );
}
