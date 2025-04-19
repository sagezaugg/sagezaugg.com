export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "The Art of Clean Code",
    date: "March 15, 2023",
    excerpt:
      "Exploring the principles of writing maintainable and elegant code...",
    readTime: "5 min read",
    category: "Development",
  },
  {
    title: "Building Scalable Systems",
    date: "February 28, 2023",
    excerpt:
      "A deep dive into architectural patterns for scalable applications...",
    readTime: "8 min read",
    category: "Architecture",
  },
  {
    title: "The Future of Web Development",
    date: "January 10, 2023",
    excerpt: "Predictions and insights about upcoming web technologies...",
    readTime: "6 min read",
    category: "Technology",
  },
];
