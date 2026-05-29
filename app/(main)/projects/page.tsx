import { Metadata } from "next";
import { mockProjectVisions } from "@/types";
import { ProjectFeed } from "@/components/project/ProjectFeed";
import { ProjectsHeader } from "@/components/project/ProjectsHeader";

export const metadata: Metadata = {
  title: "Explore Project Visions — Workwyn",
  description:
    "Browse project visions from local entrepreneurs and pitch how you can contribute. Find the project that excites you and propose your role.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <ProjectsHeader />
      <ProjectFeed projects={mockProjectVisions} />
    </div>
  );
}
