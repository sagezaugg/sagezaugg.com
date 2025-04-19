import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BlogPost } from "../../utils/blogConstants";

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index }) => (
  <motion.article
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="sheikah-border p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-zelda-light-blue">{post.date}</span>
      <span className="text-zelda-gold">{post.readTime}</span>
    </div>

    <h3 className="text-2xl font-serif text-zelda-gold mb-2">{post.title}</h3>

    <p className="text-zelda-light-blue mb-4">{post.excerpt}</p>

    <div className="flex items-center justify-between">
      <span className="px-3 py-1 text-sm bg-zelda-teal/20 text-zelda-light-blue rounded-full">
        {post.category}
      </span>
      <Link
        to={`/blog/${index}`}
        className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
      >
        Read More →
      </Link>
    </div>
  </motion.article>
);

export default BlogPostCard;
