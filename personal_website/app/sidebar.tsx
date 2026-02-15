import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navSection}>
        <Link href="/blog" className={styles.navLink}>
          Blog
        </Link>
        <Link href="/projects" className={styles.navLink}>
          Projects
        </Link>
        <Link href="/aboutme" className={styles.navLink}>
          About Me
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
  );
}
