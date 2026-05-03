import { useParams, Link } from "react-router-dom";
import { blogs as blogDetails } from "../data";
import { useIsMobile } from "../hooks/useMediaQuery";
import SEO, { SITE_URL } from "../components/SEO";
import {
  getBlogContentText,
  getIsoMonthDate,
  getReadTimeMinutes,
} from "../utils/blogHelpers";
import BlogHero from "../components/blogDetail/BlogHero";
import BlogContent from "../components/blogDetail/BlogContent";
import BlogAuthor from "../components/blogDetail/BlogAuthor";
import MoreArticles from "../components/blogDetail/MoreArticles";

export default function BlogDetail() {
  const { id } = useParams();
  const isMobile = useIsMobile();

  const post = blogDetails.find(
    (b) => b.id === parseInt(id ?? "", 10) || b.slug === id,
  );

  if (!post)
    return (
      <div style={{ paddingTop: 200, textAlign: "center" }}>
        <p style={{ color: "var(--text2)", marginBottom: 24 }}>
          Blog post not found
        </p>
        <Link to="/blogs" className="btn btn-primary">
          Back to Blogs
        </Link>
      </div>
    );

  const otherPosts = blogDetails.filter((b) => b.id !== post.id);
  const articleBody = getBlogContentText(post.content);
  const readTimeMinutes = getReadTimeMinutes(post.readTime);

  // Enhanced Blog Schema
  const postExtras = post as typeof post & {
    image?: string;
    updatedDate?: string;
    category?: string;
  };
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: postExtras.image || `${SITE_URL}/logo.png`,
    url: `${SITE_URL}/blogs/${post.slug || post.id}`,
    author: {
      "@type": "Person",
      name: "Neelesh Yadav",
      url: SITE_URL,
    },
    datePublished: getIsoMonthDate(post.date),
    dateModified: getIsoMonthDate(postExtras.updatedDate || post.date),
    keywords: post.tags?.join(", "),
    articleBody: articleBody.substring(0, 500) || post.excerpt,
    wordCount: articleBody ? articleBody.split(/\s+/).length : 0,
    articleSection: postExtras.category || "Technology",
    timeRequired: `PT${readTimeMinutes}M`,
    publisher: {
      "@type": "Organization",
      name: "Neelesh Yadav",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${post.slug || post.id}`,
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${SITE_URL}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blogs/${post.slug || post.id}`,
      },
    ],
  };

  return (
    <div>
      <SEO
        title={`${post.title} — Neelesh Yadav`}
        description={post.excerpt}
        path={`/blogs/${post.slug || post.id}`}
        type="article"
        schema={[blogSchema, breadcrumbSchema]}
      />

      <BlogHero post={post} />

      {/* Article body */}
      <article style={{ padding: isMobile ? "52px 0 80px" : "80px 0 120px" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <BlogContent post={post} />
          <BlogAuthor />
        </div>
      </article>

      <MoreArticles posts={otherPosts} />
    </div>
  );
}
