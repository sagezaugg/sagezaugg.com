import React from "react";
import { BLOG_POSTS } from "../utils/blogConstants";
import { BlogList } from "../components/Blog/BlogList";

const Blog: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Journal Entries
      </h2>
      <BlogList posts={BLOG_POSTS} />
    </div>
  );
};

export default Blog;
