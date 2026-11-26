import type { Contact } from "@/lib/site";

export function ContactSection({ contact }: { contact: Contact }) {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-2xl px-6 pb-24 text-center sm:text-left"
    >
      <h2 className="font-display text-3xl font-medium">Contact</h2>
      <div className="mt-4 flex flex-col items-center gap-2 font-sans text-base sm:items-start">
        <a
          href={`mailto:${contact.email}`}
          className="text-ink/80 underline underline-offset-2 hover:text-ink"
        >
          {contact.email}
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink/80 underline underline-offset-2 hover:text-ink"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
