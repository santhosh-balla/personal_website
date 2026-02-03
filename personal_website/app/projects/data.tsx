/*

create a dict object with structure 
title: str
date: data(datatype)
img: optional (img datatype)
git: optional (link)
tech stack: string
description: string


created dummy objects that i need to render 



*/

interface Project {
  title: string;
  date: Date;
  img?: string;
  git: string;
  techStack: string;
  description: string;
}

const project: Project = {
  title: "Django Gym App MVP",
  date: new Date(2025, 2, 1),
  img: "/globe.svg",
  git: "https://github.com/yourusername/gym-app",
  techStack: "Django, Python, HTML, CSS, SQLite",
  description:
    "A full-stack gym tracking application focused on progressive overload. The app allows users to manage workout splits, select workout days, log exercises with sets, reps, and RIR/RPE, and view their training contextually by date. Built as an MVP with Django, emphasizing clean architecture, user authentication, and beginner-friendly explanations of gym concepts.",
};

const project2: Project = {
  title: "Hate Speech Detection with LLMs",
  date: new Date(2024, 8, 1),
  img: "/globe.svg",
  git: "https://github.com/yourusername/hate-speech-detection",
  techStack: "Python, NLP, Transformers, TinyLLM, Data Analysis",
  description:
    "A research-oriented project replicating the ideas from Detecting Hate Speech with GPT-3 on a smaller scale. The project explored prompt-based hate speech detection without fine-tuning, focusing on flexibility, inclusion, and evaluation against labeled datasets. Emphasis was placed on understanding model behavior rather than just accuracy.",
};

const project3: Project = {
  title: "Goblin Enemy AI (Platform Fighter)",
  date: new Date(2025, 2, 1),
  img: "/globe.svg",
  git: "https://github.com/yourusername/platform-fighter-ai",
  techStack: "GameMaker Studio 2, GML, Finite State Machines",
  description:
    "Designed and implemented enemy AI for a platform fighter game using a finite state machine. The goblin enemy features idle, alert, and aggressive states, with probabilistic decision-making for actions like attacking, lunging, blocking, and countering based on player behavior. The project focused on readable AI logic and extensibility.",
};

const project4: Project = {
  title: "Probabilistic Roadmap Motion Planner",
  date: new Date(2025, 2, 1),
  img: "/globe.svg",
  git: "https://github.com/yourusername/prm-motion-planning",
  techStack: "ROS2, Python, FCL, Robotics Algorithms",
  description:
    "Implemented probabilistic roadmap (PRM) motion planning for robotic navigation using ROS2. The project involved collision checking with the Flexible Collision Library (FCL), configuration space sampling, and path validation. This work reinforced core robotics concepts such as motion planning, configuration spaces, and real-world feasibility.",
};

const project5: Project = {
  title: "Java Social Media Platform",
  date: new Date(2024, 8, 1),
  img: "/globe.svg",
  git: "https://github.com/yourusername/social-media-platform",
  techStack: "Java, MySQL, JDBC",
  description:
    "A backend-focused social media platform implementing user accounts, posts, and database persistence using MySQL. The project emphasized object-oriented design, SQL integration, and clean separation between application logic and data storage. Built to strengthen backend fundamentals and database interaction skills.",
};

export const projects = [project, project2, project3, project4, project5].sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);
