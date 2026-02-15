import ProjectsClient from "./ProjectsClient";
import type {Project} from "./projectInterface"; 
import PageWrapper from "../PageWrapper";



async function getProjects(): Promise<Project[]> {
  const res = await fetch("http://localhost:8000/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <PageWrapper title="PROJECTS">
      <ProjectsClient projects={projects} />
    </PageWrapper>
  );
} 