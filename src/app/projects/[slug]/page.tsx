import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Karen Xie`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main
      className="flex-1 px-6 py-16 sm:px-12"
      style={{ backgroundColor: `var(--color-paper-${project.color})` }}
    >
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="font-sans text-sm text-ink/60 transition-colors hover:text-ink"
        >
          ← Back
        </Link>

        <h1 className="mt-6 font-display text-4xl font-medium sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-xl font-sans text-lg text-ink/80">
          {project.summary}
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 font-sans text-sm">
          <div>
            <dt className="text-xs tracking-wide text-ink/50 uppercase">
              Role
            </dt>
            <dd className="mt-1 text-ink/80">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-ink/50 uppercase">
              Dates
            </dt>
            <dd className="mt-1 text-ink/80">{project.dates}</dd>
          </div>
        </dl>

        {project.links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-medium text-accent underline underline-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <article
          className="mt-10 max-w-none font-sans text-ink/90
            [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:first:mt-0
            [&_p]:mt-4 [&_p]:leading-relaxed"
        >
          <ReactMarkdown>{project.body}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
