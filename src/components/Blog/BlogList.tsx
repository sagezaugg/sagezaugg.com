import { BlogPost } from "../../utils/blogConstants";
import BlogPostCard from "./BlogPostCard";

export interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => (
  <div className="max-w-4xl mx-auto space-y-8">
    {posts.map((post, index) => (
      <BlogPostCard key={index} post={post} index={index} />
    ))}
  </div>
);
