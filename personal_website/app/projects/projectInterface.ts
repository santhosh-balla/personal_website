interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_link: string | null;
  live_demo_link: string | null;
  image: string | null;
  date: string;
}

export type {Project}