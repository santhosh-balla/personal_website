"use client";

import NavBar from "../navbar";
import { projects } from "./data";
import { useState } from "react";

export function SingleProject({
  title,
  date,
  img,
  git,
  techStack,
  description,
}: {
  title: string;
  date: Date;
  img?: string;
  git: string;
  techStack: string;
  description: string;
}) {
  const [showImage, setShowImage] = useState(false);

  const onMouseEnter = () => {
    setShowImage(true);
  };
  const onMouseLeave = () => {
    setShowImage(false);
  };

  return (
    <>
      <h3>{title}</h3>
      <h5>{date ? date.toLocaleDateString() : "No date"}</h5>
      <p>
        {techStack}
        {description}
        {git}
      </p>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <img
          src={showImage === true ? img : undefined}
          alt="Hover over me :)"
          width={70}
        ></img>
      </div>
    </>
  );
}

export default function Projects() {
  const [project, setProject] = useState(0);
  const handleNext = () => {
    projects.length - 1 !== project && setProject(project + 1);
  };
  const handlePrev = () => {
    project > 0 && setProject(project - 1);
  };

  return (
    <>
      <h2>This is the project page</h2>
      <NavBar></NavBar>
      <button disabled={project === 0} onClick={handlePrev}>
        {" "}
        Previous{" "}
      </button>
      <button disabled={projects.length - 1 === project} onClick={handleNext}>
        {" "}
        Next{" "}
      </button>
      <SingleProject {...projects[project]}></SingleProject>
    </>
  );
}
