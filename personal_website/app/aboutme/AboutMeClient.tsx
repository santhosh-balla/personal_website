"use client";

import { useState, useEffect } from "react";
import styles from "./AboutMe.module.css";

export default function AboutMeClient() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [gymPR, setGymPR] = useState(0);

  const targetReadingProgress = 380; // 65% through the book
  const targetGymPR = 195; // PR weight in lbs

  useEffect(() => {
    // Trigger reading progress animation
    const readingTimer = setTimeout(() => {
      setReadingProgress(targetReadingProgress);
    }, 1350);

    // Trigger gym PR count-up animation
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = targetGymPR / steps;
    let currentStep = 0;

    const gymInterval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setGymPR(Math.floor(increment * currentStep));
      } else {
        setGymPR(targetGymPR);
        clearInterval(gymInterval);
      }
    }, duration / steps);

    return () => {
      clearTimeout(readingTimer);
      clearInterval(gymInterval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.descriptionBox}>
          <p>
            I'm a CS gradute student at UNC Charlotte focusing on AI and ML. 
          </p>
          <p>
            When I'm not coding, you'll find me at the 🏋️ gym working on strength training
            or <span>&#x1F4D6;&#xFE0E;</span> reading fiction.
          </p>
          <p>
            I believe in doing your best and showing up every day, no matter what. 
          </p>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.profileImageContainer}>
          <img
            src="/profile_pic.jpeg"
            alt="Profile"
            className={styles.profileImage}
          />
        </div>

        <div className={styles.statSection}>
          <h3 className={styles.statTitle}>Currently Reading:</h3>
          <p>Words of Radiance by Brandon Sanderson</p>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${readingProgress}%` }}
            />
          </div>
          <p className={styles.statLabel}>{readingProgress}% complete</p>
        </div>

        <div className={styles.statSection}>
          <h3 className={styles.statTitle}>Bench PR</h3>
          <div className={styles.prNumber}>{gymPR} lbs</div>
        </div>
      </div>
    </div>
  );
}
