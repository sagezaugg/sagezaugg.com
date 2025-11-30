import React, { useEffect, useState } from "react";
import { BlogList } from "../components/Blog/BlogList";
import { getBlogPosts } from "../services/contentService";
import { BlogPostMetadata } from "../types/content";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
        setError(null);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
          Journal Entries
        </h2>
        <div className="text-center text-zelda-light-blue">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
          Journal Entries
        </h2>
        <div className="text-center text-zelda-light-blue">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Journal Entries
      </h2>
      <BlogList posts={posts} />
    </div>
  );
};

export default Blog;
