import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PitchDeckBuilder } from "@/components/project/PitchDeckBuilder";
import { mockProjectVisions } from "@/types";
import { ArrowLeft, Presentation } from "lucide-react";

function getProject(id: string) {
  return mockProjectVisions.find((p) => p.id === id) ?? null;
}

export async function generateStaticParams() {
  return mockProjectVisions.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[id]/pitch">
): Promise<Metadata> {
  const { id } = await props.params;
  const project = getProject(id);
  if (!project) return { title: "Project Not Found — Workwyn" };
  return {
    title: `Pitch Deck for ${project.title} — Workwyn`,
    description: `Build your pitch deck to propose how you can contribute to "${project.title}".`,
  };
}

export default async function PitchDeckPage(
  props: PageProps<"/projects/[id]/pitch">
) {
  const { id } = await props.params;
  const project = getProject(id);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] bg-[#FAFAFA]">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <PitchDeckBuilder project={project} />
      </div>
    </div>
  );
}
