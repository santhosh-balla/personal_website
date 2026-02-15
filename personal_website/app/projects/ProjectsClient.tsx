"use client";

import { useState } from "react";
import type { Project } from "./projectInterface";
import styles from "./ProjectCard.module.css";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>("");

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openImageModal = (imageSrc: string) => {
    setModalImageSrc(imageSrc);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc("");
  };

  const getCardClassName = (index: number) => {
    if (index === currentIndex) {
      return `${styles.cardBase} ${styles.cardActive}`;
    } else if (index === currentIndex + 1 && currentIndex < projects.length - 1) {
      return `${styles.cardBase} ${styles.cardNext}`;
    } else {
      return `${styles.cardBase} ${styles.cardHidden}`;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <button 
          className={styles.prevButton} 
          disabled={currentIndex === 0} 
          onClick={handlePrev}
        >
          Previous
        </button>

        <div className={styles.slider}>
          {projects.map((project, index) => (
            <div key={project.id} className={getCardClassName(index)}>
              <div className={styles.cardHeader}>
                <h3 className={styles.title}>{project.title}</h3>
                <div className={styles.linkButtons}>
                  {project.github_link && (
                    <a 
                      href={project.github_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.githubButton}
                    >
                      GitHub
                    </a>
                  )}
                  {project.live_demo_link && (
                    <a 
                      href={project.live_demo_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.demoButton}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.date}>
                  <strong>Date</strong>
                  <p>
                    {project.date 
                      ? new Date(project.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })
                      : "No date"}
                  </p>
                </div>
                <div className={styles.techStack}>
                  <strong>Tech stack</strong>
                  <p>{project.tech_stack.join(", ")}</p>
                </div>
              </div>

              <div className={styles.description}>
                <strong>Description</strong>
                <p>{project.description}</p>
              </div>

              {project.image_url && (
                <div className={styles.imageContainer}>
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    onClick={() => openImageModal(project.image_url!)}
                    className={styles.clickableImage}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          className={styles.nextButton} 
          disabled={currentIndex === projects.length - 1} 
          onClick={handleNext}
        >
          Next →
        </button>
      </div>

      {isImageModalOpen && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div className={styles.imageModalContent}>
            <button className={styles.closeButton} onClick={closeImageModal}>
              ×
            </button>
            <img src={modalImageSrc} alt="Enlarged view" />
          </div>
        </div>
      )}
    </>
  );
}
