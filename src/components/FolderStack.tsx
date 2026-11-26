"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";

// Vertical offsets so tabs stagger left-to-right like real index tabs,
// instead of sitting in a flat row. Cycles if there are more projects.
const STAGGER_Y = [0, 28, 10, 36, 4, 24, 14, 38];

export function FolderStack({ projects }: { projects: Project[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center sm:gap-4">
      {projects.map((project, index) => {
        const offsetY = STAGGER_Y[index % STAGGER_Y.length];
        return (
          <motion.div
            key={project.slug}
            className="sm:mt-(--stagger) sm:self-start"
            style={{ "--stagger": `${offsetY}px` } as React.CSSProperties}
            whileHover={prefersReducedMotion ? undefined : { y: -6 }}
            whileTap={prefersReducedMotion ? undefined : { y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block w-56 px-5 py-4 text-center font-sans text-sm font-medium text-ink shadow-md transition-shadow hover:shadow-lg sm:w-44"
              style={{
                backgroundColor: `var(--color-paper-${project.color})`,
                clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0% 100%)",
              }}
            >
              {project.tabLabel}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
