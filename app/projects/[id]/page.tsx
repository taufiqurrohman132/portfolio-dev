import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/sub/project-detail";
import { RECENT_PROJECTS, getProjectById } from "@/constants";
import { getRepoData } from "@/lib/github";

/** Re-sync GitHub repo metadata at most once an hour (ISR). */
export const revalidate = 3600;

type ProjectPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return RECENT_PROJECTS.map(({ id }) => ({ id: String(id) }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectById(params.id);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Taufiq R`,
    description: project.des,
    openGraph: {
      title: project.title,
      description: project.des,
      images: [project.img],
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id);
  if (!project) notFound();

  const repo = await getRepoData(project.sourceCode);

  return <ProjectDetail project={project} repo={repo} />;
}
