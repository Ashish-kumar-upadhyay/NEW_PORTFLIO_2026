import { PERSON } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const formattedAddress = `${PERSON.address.addressLocality}, ${PERSON.address.addressRegion}, India ${PERSON.address.postalCode}`;

  return (
    <footer
      className="w-full border-t border-white/10 py-10 px-6 text-center"
      role="contentinfo"
    >
      <nav
        aria-label="Site sections"
        className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6"
      >
        {navLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="text-xs font-mono text-white/50 hover:text-white transition tracking-wide"
          >
            {label}
          </a>
        ))}
      </nav>

      <p className="text-sm text-white/70 font-semibold mb-2">
        {PERSON.name} © {year}
      </p>
      <p className="text-xs text-white/45 font-mono tracking-wide mb-2">
        {PERSON.name} — Full Stack Developer Portfolio | React.js | Next.js | Firebase
      </p>
      <p className="text-xs text-white/40 mb-1">{formattedAddress}</p>
      <p className="text-xs text-white/40">
        Phone:{" "}
        <a href={`tel:${PERSON.phone.replace(/\s/g, "")}`} className="hover:text-white/70">
          {PERSON.phone}
        </a>
      </p>
    </footer>
  );
}
