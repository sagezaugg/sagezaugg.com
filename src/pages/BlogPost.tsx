import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPost } from "../services/contentService";
import { BlogPost as BlogPostType } from "../types/content";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError("Invalid post slug");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const blogPost = await getBlogPost(slug);
        if (blogPost) {
          setPost(blogPost);
          setError(null);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 text-center"
      >
        <h2 className="text-4xl font-serif text-zelda-gold mb-4">
          Loading...
        </h2>
      </motion.div>
    );
  }

  if (error || !post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 text-center"
      >
        <h2 className="text-4xl font-serif text-zelda-gold mb-4">
          Post Not Found
        </h2>
        <p className="text-zelda-light-blue">
          {error || "The blog post you're looking for doesn't exist."}
        </p>
        <Link
          to="/blog"
          className="inline-block mt-4 text-zelda-light-blue hover:text-zelda-gold transition-colors duration-200"
        >
          Back to Blog Posts
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-6 sm:py-12 max-w-4xl mx-auto sm:px-6"
    >
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="sheikah-border p-4 sm:p-8 relative"
      >
        {/* Blurred background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-slate-800/20 backdrop-blur-[1px] rounded-lg -z-10"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <span className="text-zelda-light-blue">{post.date}</span>
          <span className="text-zelda-gold">{post.readTime}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-3xl sm:text-4xl font-serif text-zelda-gold mb-4 sm:mb-6"
        >
          {post.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6"
        >
          <span className="px-3 py-1 text-sm bg-zelda-dark/25 text-zelda-light-blue rounded-full">
            {post.category}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="prose prose-sm sm:prose-lg max-w-none [&_a]:text-zelda-light-blue [&_a:hover]:text-zelda-gold [&_a]:transition-colors [&_a]:duration-200"
        >
          <p className="text-zelda-light-blue mb-8">{post.excerpt}</p>
          <div className="prose prose-sm sm:prose-lg max-w-none [&_a]:text-zelda-light-blue [&_a:hover]:text-zelda-gold [&_a]:transition-colors [&_a]:duration-200">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 pt-6 border-t border-zelda-dark/25"
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-zelda-light-blue hover:text-zelda-gold transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog Posts
          </Link>
        </motion.div>
      </motion.article>
    </motion.div>
  );
};

export default BlogPost;
