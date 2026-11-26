import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface About {
  name: string;
  photo: string;
  resumeUrl: string;
  bio: string;
}

export interface Contact {
  email: string;
  linkedin: string;
}

export function getAbout(): About {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "about.md"), "utf8");
  const { data, content } = matter(raw);
  return {
    name: data.name,
    photo: data.photo,
    resumeUrl: data.resumeUrl,
    // Collapse single line-wraps from the source file into spaces,
    // but keep intentional blank-line paragraph breaks.
    bio: content.trim().replace(/\n(?!\n)/g, " "),
  };
}

export function getContact(): Contact {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "contact.md"), "utf8");
  const { data } = matter(raw);
  return {
    email: data.email,
    linkedin: data.linkedin,
  };
}
