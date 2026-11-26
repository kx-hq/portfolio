import { getAllProjects } from "@/lib/projects";
import { getAbout, getContact } from "@/lib/site";
import { FolderStack } from "@/components/FolderStack";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  const projects = getAllProjects();
  const about = getAbout();
  const contact = getContact();

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="font-display text-[clamp(3rem,12vw,8rem)] leading-none font-medium">
          Karen Xie
        </h1>
        <p className="mt-6 max-w-md font-sans text-lg text-ink/70">
          Strategy, AI, and creative work.
        </p>
      </div>

      <div className="px-6 pb-24">
        <FolderStack projects={projects} />
      </div>

      <AboutSection about={about} />
      <ContactSection contact={contact} />
    </main>
  );
}
