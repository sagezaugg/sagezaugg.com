import { BlogPost, BlogPostMetadata, Project, ProjectMetadata } from "../types/content";

const CONTENT_BASE_URL =
  process.env.REACT_APP_CONTENT_BASE_URL || "/content";

// Cache for storing fetched content
const contentCache = new Map<string, any>();

/**
 * Simple frontmatter parser for browser environment
 * Parses YAML frontmatter from markdown files
 */
function parseFrontmatter(content: string): { data: any; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatter = match[1];
  const body = match[2];

  // Simple YAML parser for basic key-value pairs
  const data: any = {};
  const lines = frontmatter.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse boolean values
    if (value === 'true' || value === 'True') {
      data[key] = true;
    } else if (value === 'false' || value === 'False') {
      data[key] = false;
    }
    // Parse arrays (simple format: ["item1", "item2"])
    else if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent
        .split(',')
        .map(item => item.trim().replace(/^["']|["']$/g, ''))
        .filter(item => item.length > 0);
    } else {
      data[key] = value;
    }
  }

  return { data, content: body };
}

/**
 * Fetches a markdown file from the content service and parses it
 */
async function fetchMarkdownFile(path: string): Promise<string> {
  const cacheKey = `markdown:${path}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  try {
    const response = await fetch(`${CONTENT_BASE_URL}/${path}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const content = await response.text();
    
    // Check if the response is HTML (error page) instead of markdown
    if (contentType.includes('text/html') || content.trim().startsWith('<!')) {
      throw new Error(`Invalid content type for ${path}: received HTML instead of markdown`);
    }
    
    contentCache.set(cacheKey, content);
    return content;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    throw error;
  }
}

/**
 * Fetches a JSON file from the content service
 */
async function fetchJsonFile(path: string): Promise<any> {
  const cacheKey = `json:${path}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  try {
    const response = await fetch(`${CONTENT_BASE_URL}/${path}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }

    const data = await response.json();
    contentCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    throw error;
  }
}

/**
 * Fetches all blog posts metadata from the index file
 */
export async function getBlogPosts(): Promise<BlogPostMetadata[]> {
  try {
    const index = await fetchJsonFile("blog/index.json");
    const posts = index.posts || [];
    // Filter out hidden posts
    return posts.filter((post: BlogPostMetadata) => !post.hidden);
  } catch (error) {
    console.error("Error fetching blog posts index:", error);
    return [];
  }
}

/**
 * Fetches a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const markdown = await fetchMarkdownFile(`blog/${slug}.md`);
    const parsed = parseFrontmatter(markdown);
    
    // Validate that we have required fields (slug should match)
    if (!parsed.data.title || !parsed.data.slug) {
      console.warn(`Blog post ${slug} is missing required metadata`);
      return null;
    }
    
    // Validate that the slug matches (prevents accessing wrong posts)
    if (parsed.data.slug !== slug) {
      console.warn(`Blog post slug mismatch: expected ${slug}, got ${parsed.data.slug}`);
      return null;
    }
    
    // Check if content looks like HTML (error page)
    if (parsed.content.trim().startsWith('<!') || parsed.content.includes('<html')) {
      console.warn(`Blog post ${slug} appears to be HTML instead of markdown`);
      return null;
    }
    
    const post = {
      ...(parsed.data as BlogPostMetadata),
      body: parsed.content,
    };
    
    // Return null if post is hidden
    if (post.hidden) {
      return null;
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches all projects metadata from the index file
 */
export async function getProjects(): Promise<ProjectMetadata[]> {
  try {
    const index = await fetchJsonFile("projects/index.json");
    return index.projects || [];
  } catch (error) {
    console.error("Error fetching projects index:", error);
    return [];
  }
}

/**
 * Fetches a single project by slug (filename without extension)
 */
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const markdown = await fetchMarkdownFile(`projects/${slug}.md`);
    const parsed = parseFrontmatter(markdown);
    
    return {
      ...(parsed.data as ProjectMetadata),
      body: parsed.content || "",
    };
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

/**
 * Clears the content cache (useful for development)
 */
export function clearContentCache(): void {
  contentCache.clear();
}

