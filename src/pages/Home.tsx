import { lazy, Suspense } from "react";
import { personal, degrees } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import SEO, { SITE_URL } from "../components/SEO";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Skills from "../components/home/Skills";
import FeaturedProjects from "../components/home/FeaturedProjects";
import GetInTouch from "../components/home/GetInTouch";

const GitHubGraph = lazy(() => import("../components/GitHubGraph"));

// Homepage JSON-LD Schema for better SEO
function getHomepageSchema() {
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
    alumniOf: degrees.map((deg) => ({
      "@type": "EducationalOrganization",
      name: deg.institution,
    })),
  };
}

export default function Home() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <>
      <SEO path="/" schema={getHomepageSchema()} />
      <Hero isMobile={isMobile} isSmall={isSmall} />
      <About isMobile={isMobile} isSmall={isSmall} />
      <Skills isMobile={isMobile} isSmall={isSmall} />
      <Suspense
        fallback={
          <section
            className="section"
            style={{
              background: "var(--bg2)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="container">
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text2)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Loading GitHub Activity...
              </div>
            </div>
          </section>
        }
      >
        <GitHubGraph />
      </Suspense>
      <FeaturedProjects isMobile={isMobile} isSmall={isSmall} />
      <GetInTouch isSmall={isSmall} />
    </>
  );
}
