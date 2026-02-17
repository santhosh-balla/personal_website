"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        className={styles.hamburger}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div className={styles.overlay} onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <nav className={styles.navSection}>
          <Link href="/aboutme" className={styles.navLink} onClick={closeSidebar}>
            About Me
          </Link>
          <Link href="/projects" className={styles.navLink} onClick={closeSidebar}>
            Projects
          </Link>
          <Link href="/blog" className={styles.navLink} onClick={closeSidebar}>
            Blog
          </Link>
        </nav>

        <div className={styles.socialsSection}>
          <a
            href="https://www.linkedin.com/in/santhosh-balla5579/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src="/in-logo/LI-Logo.png" alt="LinkedIn" />
          </a>
          <a
            href="https://github.com/santhosh-balla"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img
              src="/GitHub_Logos/SVG/GitHub_Lockup_Black_Clearspace.svg"
              alt="GitHub"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
