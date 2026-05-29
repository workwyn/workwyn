import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockProjectVisions } from "@/types";
import { ProjectDetailClient } from "@/components/project/ProjectDetailClient";

function getProject(id: string) {
  return mockProjectVisions.find((p) => p.id === id) ?? null;
}

export async function generateStaticParams() {
  return mockProjectVisions.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const project = getProject(id);
  if (!project) return { title: "Project Not Found — Workwyn" };
  return {
    title: `${project.title} — Workwyn`,
    description: project.vision_story.slice(0, 160),
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[id]">
) {
  const { id } = await props.params;
  const project = getProject(id);

  if (!project) notFound();

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD]">
      <ProjectDetailClient project={project} />
    </div>
  );
}
