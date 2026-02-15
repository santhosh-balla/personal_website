import PageWrapper from "../PageWrapper";
import BlogsClient from "./BlogsClient";
import type { Blog } from "./blogInterface";

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch("http://localhost:8000/api/blogs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <PageWrapper title="BLOG">
      <BlogsClient blogs={blogs} />
    </PageWrapper>
  );
}
