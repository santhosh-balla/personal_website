import styles from "./Layout.module.css";

export default function PageWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {children}
    </main>
  );
}
