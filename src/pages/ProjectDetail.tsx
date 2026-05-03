import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Project } from "../types";
import { projects } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import SEO, { SITE_URL } from "../components/SEO";

import ImageViewer from "../components/projectDetail/ImageViewer";
import ProjectHero from "../components/projectDetail/ProjectHero";
import VideoSection from "../components/projectDetail/VideoSection";
import ScreenshotsSection from "../components/projectDetail/ScreenshotsSection";
import FeaturesSection from "../components/projectDetail/FeaturesSection";
import OtherProjects from "../components/projectDetail/OtherProjects";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  // Image viewer state
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const screenshots = project?.screenshots?.filter((s) => s.url) ?? [];

  const handleOpenImage = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleCloseImage = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : screenshots.length - 1,
    );
  }, [screenshots.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null && prev < screenshots.length - 1 ? prev + 1 : 0,
    );
  }, [screenshots.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") handleCloseImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handleCloseImage, handlePrevImage, handleNextImage]);

  if (!project)
    return (
      <div style={{ paddingTop: 200, textAlign: "center" }}>
        <p style={{ color: "var(--text2)", marginBottom: 24 }}>
          Project not found
        </p>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );

  const accentColor = "#3b82f6";

  // Enhanced Project Schema
  const projectSchema = {
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
    ...((project as Project & { startDate?: string }).startDate
      ? {
          datePublished: (project as Project & { startDate?: string })
            .startDate,
        }
      : {}),
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
        name: "Projects",
        item: `${SITE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/projects/${project.id}`,
      },
    ],
  };

  return (
    <div>
      <SEO
        title={`${project.title} — Neelesh Yadav`}
        description={project.description}
        path={`/projects/${project.id}`}
        image={project.screenshots?.[0]?.url || `${SITE_URL}/logo.png`}
        schema={[projectSchema, breadcrumbSchema]}
      />

      <ProjectHero project={project} accentColor={accentColor} />

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          {/* Video Demo */}
          {project.videoUrl && (
            <VideoSection project={project} accentColor={accentColor} />
          )}
          {project.screenshots &&
            project.screenshots.filter((s) => s.url).length > 0 && (
              <>
                <ScreenshotsSection
                  project={project}
                  accentColor={accentColor}
                  onOpenImage={handleOpenImage}
                />
                <div className="divider" style={{ marginBottom: 52 }} />
              </>
            )}

          {/* About + Highlights */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
              gap: isMobile ? 40 : 56,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: isSmall ? 20 : 24,
                  marginBottom: 18,
                }}
              >
                About the Project
              </h2>
              {(project.longDescription || project.description || "")
                .split("\n\n")
                .map((para, i) => (
                  <p
                    key={i}
                    style={{
                      color: "var(--text2)",
                      lineHeight: 1.85,
                      marginBottom: 16,
                      fontSize: isSmall ? 14 : 15,
                    }}
                  >
                    {para}
                  </p>
                ))}
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isSmall ? 17 : 20,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Key Highlights
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      padding: "12px 14px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  >
                    <span
                      style={{
                        color: accentColor,
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      ▸
                    </span>
                    <span
                      style={{
                        color: "var(--text2)",
                        fontSize: isSmall ? 12 : 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Breakdown */}
          {project.features && project.features.length > 0 && (
            <>
              <div className="divider" style={{ margin: "52px 0" }} />
              <FeaturesSection project={project} accentColor={accentColor} />
            </>
          )}

          {/* Other projects */}
          <OtherProjects currentId={project.id} />
        </div>
      </section>

      {/* Image Viewer Modal */}
      {selectedImageIndex !== null && (
        <ImageViewer
          screenshot={screenshots[selectedImageIndex]}
          onClose={handleCloseImage}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          hasPrev={selectedImageIndex > 0}
          hasNext={selectedImageIndex < screenshots.length - 1}
        />
      )}
    </div>
  );
}
