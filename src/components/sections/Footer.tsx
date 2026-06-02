import { PERSON } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-white/10 py-10 px-6 text-center"
      role="contentinfo"
    >
      <p className="text-sm text-white/70 font-semibold mb-2">
        {PERSON.name} © {year}
      </p>
      <p className="text-xs text-white/45 font-mono tracking-wide">
        Full Stack Developer | React.js | Next.js | JavaScript
      </p>
      <p className="sr-only">
        {PERSON.name} is a Full Stack Developer based in Madhya Pradesh, India.
      </p>
    </footer>
  );
}
