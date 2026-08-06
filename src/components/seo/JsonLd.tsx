import { PERSON, SEO, SITE_NAME, SITE_URL, SOCIAL } from "@/lib/site";

export default function JsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const profilePageId = `${SITE_URL}/#profilepage`;
  const webPageId = `${SITE_URL}/#webpage`;

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
          "ashish kumar upadhyay",
          "Ashish kumar upadhyay",
          "Ashish Kumar Upadhyay Full Stack Developer",
          "Ashish Kumar Upadhyay Developer",
          "Ashish Kumar Upadhyay Freelance Developer",
        ],
        jobTitle: "Full Stack Developer",
        url: SITE_URL,
        mainEntityOfPage: { "@id": webPageId },
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}${PERSON.profileImage}`,
          caption: SITE_NAME,
        },
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
          "ashish kumar upadhyay",
          "Ashish kumar upadhyay",
          "Ashish Kumar Upadhyay Official Website",
          "Ashish Kumar Upadhyay Full Stack Developer",
          "Ashish Kumar Upadhyay Portfolio",
          "ashishupadhyay.qzz.io",
        ],
        url: `${SITE_URL}/`,
        description: SEO.description,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
        author: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SEO.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${PERSON.profileImage}`,
        },
        inLanguage: "en-IN",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#home h1", "#about-heading", "#services-heading"],
        },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: SITE_URL,
        name: SITE_NAME,
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
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Ashish Kumar Upadhyay?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ashish Kumar Upadhyay is a Freelance Full Stack Developer based in Indore, Madhya Pradesh, India. He builds modern web applications using React.js, Next.js, Node.js, Firebase, and MongoDB for clients worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "What is the official website of Ashish Kumar Upadhyay?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `The official website of Ashish Kumar Upadhyay is ${SITE_URL}. It includes his portfolio, projects, skills, experience, and contact information.`,
            },
          },
          {
            "@type": "Question",
            name: "What services does Ashish Kumar Upadhyay offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ashish Kumar Upadhyay offers freelance full stack web development — Next.js applications, React.js frontends, Firebase and MongoDB backends, SEO-optimized websites, and production deployment on Vercel.",
            },
          },
        ],
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
