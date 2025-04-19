import React from "react";
import { useParams } from "react-router-dom";
import { BLOG_POSTS } from "../utils/blogConstants";
import ReactMarkdown from "react-markdown";

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = BLOG_POSTS[parseInt(postId || "0")];

  if (!post) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-4xl font-serif text-zelda-gold mb-4">
          Post Not Found
        </h2>
        <p className="text-zelda-light-blue">
          The blog post you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-slate-800/20 backdrop-blur-[1px] -z-10" />

      <article className="sheikah-border p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-zelda-light-blue">{post.date}</span>
          <span className="text-zelda-gold">{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-serif text-zelda-gold mb-6">
          {post.title}
        </h1>

        <div className="mb-6">
          <span className="px-3 py-1 text-sm bg-zelda-dark/25 text-zelda-light-blue rounded-full">
            {post.category}
          </span>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-zelda-light-blue mb-8">{post.excerpt}</p>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
