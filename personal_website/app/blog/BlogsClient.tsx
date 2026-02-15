"use client";

import { useState } from "react";
import type { Blog } from "./blogInterface";
import styles from "./Blog.module.css";

export default function BlogsClient({ blogs }: { blogs: Blog[] }) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const openBlogModal = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const closeBlogModal = () => {
    setSelectedBlog(null);
  };

  const openImageModal = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };

  const closeImageModal = () => {
    setExpandedImage(null);
  };

  return (
    <>
      <div className={styles.blogGrid}>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={styles.blogCard}
            onClick={() => openBlogModal(blog)}
          >
            <h3 className={styles.blogTitle}>{blog.title}</h3>
            <p className={styles.blogDate}>
              {blog.date
                ? new Date(blog.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "No date"}
            </p>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div className={styles.blogModal} onClick={closeBlogModal}>
          <div
            className={styles.blogModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeBlogModal}>
              ×
            </button>
            <h2 className={styles.modalTitle}>{selectedBlog.title}</h2>
            <p className={styles.modalDate}>
              {selectedBlog.date
                ? new Date(selectedBlog.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No date"}
            </p>
            <div className={styles.modalContent}>
              <p>{selectedBlog.content}</p>
            </div>
            {selectedBlog.image_url && (
              <div className={styles.imageContainer}>
                <img
                  src={selectedBlog.image_url}
                  alt={selectedBlog.title}
                  className={styles.clickableImage}
                  onClick={() => openImageModal(selectedBlog.image_url!)}
                />
              </div>
            )}
            {selectedBlog.social_media_link && (
              <a
                href={selectedBlog.social_media_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                View on Social Media
              </a>
            )}
          </div>
        </div>
      )}

      {expandedImage && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div className={styles.imageModalContent}>
            <button className={styles.imageCloseButton} onClick={closeImageModal}>
              ×
            </button>
            <img src={expandedImage} alt="Expanded view" />
          </div>
        </div>
      )}
    </>
  );
}
