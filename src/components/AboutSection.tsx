import type { About } from "@/lib/site";

export function AboutSection({ about }: { about: About }) {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-2xl px-6 py-24 text-center sm:text-left"
    >
      <h2 className="font-display text-3xl font-medium">About</h2>
      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {about.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={about.photo}
            alt={about.name}
            className="h-32 w-32 shrink-0 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-sans text-base leading-relaxed whitespace-pre-line text-ink/80">
            {about.bio}
          </p>
          {about.resumeUrl && (
            <a
              href={about.resumeUrl}
              className="mt-4 inline-block font-sans text-sm font-medium text-accent underline underline-offset-2"
              download
            >
              Download résumé
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
