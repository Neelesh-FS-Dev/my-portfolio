import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import projects from "../src/features/projects/data/projects.ts";
import blogs from "../src/features/blogs/data/blogs.ts";
import personal from "../src/shared/data/personal.ts";
import { degrees } from "../src/features/experience/data/education.ts";

export const SITE_URL = "https://neeleshyadav.vercel.app";
export const TWITTER_HANDLE = "@neeleshyadav25";

function resolveLastMod() {
  try {
    const date = execSync("git log -1 --format=%cs HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {
    // git unavailable — fall through
  }
  return new Date().toISOString().slice(0, 10);
}

export const LAST_MOD = resolveLastMod();

const __dirname = dirname(fileURLToPath(import.meta.url));
export const repoRoot = join(__dirname, "..");

const DEFAULT_TITLE =
  "Neelesh Yadav - React Native & React Developer | Pune, India";
const DEFAULT_DESCRIPTION =
  "React Native & React Developer with 3+ years building high-performance cross-platform mobile and web apps. Published 10+ apps on App Store & Play Store. TypeScript, Redux, Firebase, REST APIs. Based in Pune, India.";

export function absoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImageUrl(title, description) {
  return `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
}

function getBlogContentText(content = []) {
  return content
    .map((block) => block.text)
    .filter(Boolean)
    .join(" ");
}

function getIsoMonthDate(dateLabel) {
  const match = /^([A-Za-z]{3})\s+(\d{4})$/.exec(dateLabel || "");
  if (!match) return undefined;

  const month = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  }[match[1]];

  return month ? `${match[2]}-${month}-01` : undefined;
}

function getReadTimeMinutes(readTime) {
  const minutes = parseInt(readTime, 10);
  return Number.isNaN(minutes) ? 5 : minutes;
}

function homepageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Neelesh Yadav",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    jobTitle: "React Native & React Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    knowsAbout: [
      "React",
      "React Native",
      "TypeScript",
      "Redux",
      "Firebase",
      "REST APIs",
      "Mobile Development",
      "Web Development",
      "JavaScript",
      "Node.js",
      "Tailwind CSS",
      "App Store",
      "Google Play Store",
    ],
    sameAs: [personal.github, personal.linkedin, personal.instagram].filter(
      Boolean,
    ),
    email: personal.email,
    telephone: personal.phone,
    description: personal.summary,
    alumniOf: degrees.map((degree) => ({
      "@type": "EducationalOrganization",
      name: degree.institution,
    })),
  };
}

function projectSchema(project) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      image: project.screenshots?.[0]?.url || `${SITE_URL}/logo.png`,
      url: `${SITE_URL}/projects/${project.id}`,
      applicationCategory:
        project.type === "mobile" ? "MobileApplication" : "WebApplication",
      author: {
        "@type": "Person",
        name: "Neelesh Yadav",
        url: SITE_URL,
      },
      operatingSystem: project.type === "mobile" ? ["iOS", "Android"] : "Web",
      ...(project.startDate ? { datePublished: project.startDate } : {}),
      downloadUrl:
        project.playStoreUrl ||
        project.appStoreUrl ||
        project.liveUrl ||
        undefined,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    breadcrumbSchema([
      ["Home", "/"],
      ["Projects", "/projects"],
      [project.title, `/projects/${project.id}`],
    ]),
  ];
}

function blogSchema(post) {
  const articleBody = getBlogContentText(post.content);
  const path = `/blogs/${post.slug || post.id}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.image || `${SITE_URL}/logo.png`,
      url: `${SITE_URL}${path}`,
      author: {
        "@type": "Person",
        name: "Neelesh Yadav",
        url: SITE_URL,
      },
      datePublished: getIsoMonthDate(post.date),
      dateModified: getIsoMonthDate(post.updatedDate || post.date),
      keywords: post.tags?.join(", "),
      articleBody: articleBody.substring(0, 500) || post.excerpt,
      wordCount: articleBody ? articleBody.split(/\s+/).length : 0,
      articleSection: post.category || "Technology",
      timeRequired: `PT${getReadTimeMinutes(post.readTime)}M`,
      publisher: {
        "@type": "Organization",
        name: "Neelesh Yadav",
        url: SITE_URL,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}${path}`,
      },
    },
    breadcrumbSchema([
      ["Home", "/"],
      ["Blogs", "/blogs"],
      [post.title, path],
    ]),
  ];
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

export function getSeoRoutes() {
  return [
    {
      path: "/",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      priority: "1.0",
      changefreq: "monthly",
      schema: homepageSchema(),
    },
    {
      path: "/projects",
      title: "Projects - Neelesh Yadav | Mobile & Web Apps Portfolio",
      description:
        "Explore 10+ production mobile and web apps built by Neelesh Yadav - React Native, TypeScript, Redux, Firebase. Published on App Store & Play Store.",
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      path: "/experience",
      title: "Experience - Neelesh Yadav | 3+ Years React Native & React",
      description:
        "3+ years of professional experience as a React Native & React Developer. Work history, education, and certifications - Neelesh Yadav, Pune, India.",
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      path: "/blogs",
      title: "Blog - Neelesh Yadav | React Native & Web Development Insights",
      description:
        "Technical blog posts on React Native, TypeScript, performance optimization, WebSocket, app deployment, and mobile development best practices.",
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      path: "/contact",
      title: "Contact - Neelesh Yadav | Hire a React Native Developer",
      description:
        "Get in touch with Neelesh Yadav for freelance projects, full-time roles, or collaboration. React Native & React Developer based in Pune, India.",
      priority: "0.7",
      changefreq: "yearly",
    },
    ...projects.map((project) => ({
      path: `/projects/${project.id}`,
      title: `${project.title} - Neelesh Yadav`,
      description: project.description,
      image: project.screenshots?.[0]?.url || `${SITE_URL}/logo.png`,
      priority: "0.7",
      changefreq: "monthly",
      schema: projectSchema(project),
    })),
    ...blogs.map((post) => ({
      path: `/blogs/${post.slug || post.id}`,
      title: `${post.title} - Neelesh Yadav`,
      description: post.excerpt,
      type: "article",
      image: post.image || `${SITE_URL}/logo.png`,
      priority: "0.6",
      changefreq: "monthly",
      schema: blogSchema(post),
    })),
  ];
}

export async function writeTextFile(path, content) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

export async function readRepoFile(path) {
  return readFile(join(repoRoot, path), "utf8");
}
