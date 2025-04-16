import React from 'react';
import { motion } from 'framer-motion';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "The Art of Clean Code",
    date: "March 15, 2023",
    excerpt: "Exploring the principles of writing maintainable and elegant code...",
    readTime: "5 min read",
    category: "Development"
  },
  {
    title: "Building Scalable Systems",
    date: "February 28, 2023",
    excerpt: "A deep dive into architectural patterns for scalable applications...",
    readTime: "8 min read",
    category: "Architecture"
  },
  {
    title: "The Future of Web Development",
    date: "January 10, 2023",
    excerpt: "Predictions and insights about upcoming web technologies...",
    readTime: "6 min read",
    category: "Technology"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Journal Entries
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        {blogPosts.map((post, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="sheikah-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-zelda-light-blue">{post.date}</span>
              <span className="text-zelda-gold">{post.readTime}</span>
            </div>
            
            <h3 className="text-2xl font-serif text-zelda-gold mb-2">
              {post.title}
            </h3>
            
            <p className="text-zelda-light-blue mb-4">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-sm bg-zelda-teal/20 text-zelda-light-blue rounded-full">
                {post.category}
              </span>
              <button className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300">
                Read More →
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog; 