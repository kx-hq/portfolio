import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectColor = "grey" | "blush" | "sand" | "peach";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectFrontmatter {
  title: string;
  tabLabel: string;
  color: ProjectColor;
  order: number;
  role: string;
  dates: string;
  summary: string;
  tags: string[];
  links: ProjectLink[];
  coverImage: string;
  featured: boolean;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  body: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  const filenames = fs
    .readdirSync(PROJECTS_DIR)
    .filter((filename) => filename.endsWith(".md"));

  const projects = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      body: content,
      ...(data as ProjectFrontmatter),
    };
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}
