interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
  image_url: string | null;
  social_media_link: string | null;
}

export type { Blog };
