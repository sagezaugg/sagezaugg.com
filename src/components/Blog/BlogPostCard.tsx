import React from "react";
import { Link } from "react-router-dom";
import { BlogPostMetadata } from "../../types/content";
import { Card } from "../common/Card";

interface BlogPostCardProps {
  post: BlogPostMetadata;
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index }) => (
  <Card index={index} className="p-6">
    <div className="flex items-center justify-between mb-4">
      <span className="text-zelda-light-blue">{post.date}</span>
      <span className="text-zelda-gold">{post.readTime}</span>
    </div>

    <h3 className="text-2xl font-serif text-zelda-gold mb-2">{post.title}</h3>

    <p className="text-zelda-light-blue mb-4">{post.excerpt}</p>

    <div className="flex items-center justify-between">
      <span className="px-3 py-1 text-sm bg-zelda-dark/25 text-zelda-light-blue rounded-full">
        {post.category}
      </span>
      <Link
        to={`/blog/${post.slug}`}
        className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
      >
        Read More →
      </Link>
    </div>
  </Card>
);

export default BlogPostCard;
