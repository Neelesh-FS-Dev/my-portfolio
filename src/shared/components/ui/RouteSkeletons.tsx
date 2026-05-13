import { memo } from "react";
import { useIsMobile, useIsSmall } from "../../hooks/useMediaQuery";

interface BarProps {
  w: number | string;
  h?: number;
  r?: number;
  mb?: number;
  maxW?: number;
}
function Bar({ w, h = 14, r = 8, mb = 0, maxW }: BarProps) {
  return (
    <div
      className="skeleton"
      style={{
        width: w,
        height: h,
        borderRadius: r,
        marginBottom: mb,
        maxWidth: maxW,
      }}
    />
  );
}

function PageMain({ children }: { children: React.ReactNode }) {
  return (
    <div aria-busy="true" aria-label="Loading page">
      {children}
    </div>
  );
}

/**
 * Mirrors the bg2 + grid-bg hero panel used by Projects, Blogs, Experience,
 * Contact, and Uses. The section padding matches their real values so the
 * skeleton lines up with the loaded content.
 */
interface HeroSkeletonProps {
  label?: number;
  titleLines?: 1 | 2;
  paragraphLines?: number;
}
function HeroSkeleton({
  label = 140,
  titleLines = 2,
  paragraphLines = 2,
}: HeroSkeletonProps) {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const titleH = isSmall ? 30 : 52;
  return (
    <section
      style={{
        padding: isMobile ? "40px 0 52px" : "60px 0 80px",
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <Bar w={label} h={isSmall ? 14 : 16} mb={isSmall ? 14 : 18} r={6} />
        <Bar w={isSmall ? "75%" : "55%"} h={titleH} mb={titleLines === 2 ? 8 : 14} />
        {titleLines === 2 && (
          <Bar w={isSmall ? "55%" : "40%"} h={titleH} mb={14} />
        )}
        {Array.from({ length: paragraphLines }).map((_, i) => (
          <Bar
            key={i}
            w={i === paragraphLines - 1 ? (isSmall ? "70%" : 440) : isSmall ? "95%" : 520}
            h={14}
            mb={i === paragraphLines - 1 ? 0 : 8}
            maxW={560}
          />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Home --------------------------------- */

// Blank full-viewport placeholder — the CinematicHero owns the whole intro,
// so a structural skeleton would flash a layout that doesn't match.
function HomeSkeletonBase() {
  return (
    <PageMain>
      <div
        aria-hidden
        style={{
          width: "100%",
          height: "100vh",
          background: "var(--bg)",
        }}
      />
    </PageMain>
  );
}
export const HomeSkeleton = memo(HomeSkeletonBase);

/* ------------------------------- Projects ------------------------------- */

function ProjectsSkeletonBase() {
  const isSmall = useIsSmall();
  const cards = isSmall ? 4 : 6;

  return (
    <PageMain>
      <HeroSkeleton label={120} />
      {/* Sticky filter bar: domain tabs + category chips */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(9,12,16,0.96)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 0,
              paddingTop: 10,
              borderBottom: "1px solid var(--border)",
            }}
          >
            {[110, 110, 130].map((w, i) => (
              <div
                key={i}
                style={{
                  padding: isSmall ? "8px 14px" : "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Bar w={w} h={14} r={6} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
            {[60, 80, 70, 100, 90].map((w, i) => (
              <Bar key={i} w={w} h={28} r={100} />
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
              gap: 16,
            }}
          >
            {/* Featured spans the full row on desktop */}
            {!isSmall && <Bar w="100%" h={isSmall ? 240 : 360} r={14} />}
            {Array.from({ length: cards }).map((_, i) => (
              <Bar
                key={i}
                w="100%"
                h={isSmall ? 240 : 320}
                r={14}
                mb={0}
              />
            ))}
          </div>
        </div>
      </section>
    </PageMain>
  );
}
export const ProjectsSkeleton = memo(ProjectsSkeletonBase);

/* ----------------------------- ProjectDetail ----------------------------- */

function ProjectDetailSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <PageMain>
      <section style={{ paddingTop: isMobile ? 40 : 60, paddingBottom: 40 }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            <Bar w={70} h={12} />
            <Bar w={10} h={12} />
            <Bar w={120} h={12} />
          </div>

          <Bar w={120} h={26} r={100} mb={14} />
          <Bar w={isSmall ? "85%" : "65%"} h={isSmall ? 32 : 56} mb={8} />
          <Bar w={180} h={14} mb={22} />

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 28,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Bar w={70} h={26} mb={6} />
                <Bar w={50} h={10} />
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 32,
            }}
          >
            {[80, 70, 95, 65, 110].map((w, i) => (
              <Bar key={i} w={w} h={26} r={100} />
            ))}
          </div>

          {/* Hero image */}
          <Bar w="100%" h={isSmall ? 220 : 380} r={14} mb={32} />

          {/* Description */}
          {[100, 95, 90, 88, 70].map((w, i) => (
            <Bar key={i} w={`${w}%`} h={14} mb={10} maxW={780} />
          ))}
        </div>
      </section>
    </PageMain>
  );
}
export const ProjectDetailSkeleton = memo(ProjectDetailSkeletonBase);

/* ------------------------------ Experience ------------------------------ */

function ExperienceSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const cardCount = 3;

  return (
    <PageMain>
      <HeroSkeleton label={170} />

      {/* Timeline: vertical rail with cards. Mirrors src/shared/components/ui/Timeline.tsx */}
      <section className="section">
        <div className="container" style={{ maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 40 : 56,
              position: "relative",
            }}
          >
            {/* Vertical rail */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: isMobile ? 18 : 24,
                top: 12,
                bottom: 12,
                width: 1,
                background: "var(--border)",
              }}
            />
            {Array.from({ length: cardCount }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: isMobile ? 16 : 28,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Icon dot */}
                <div style={{ flexShrink: 0 }}>
                  <Bar w={isMobile ? 36 : 48} h={isMobile ? 36 : 48} r={100} />
                </div>
                {/* Card */}
                <div
                  style={{
                    flex: 1,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: isSmall ? 18 : 24,
                  }}
                >
                  <Bar w="55%" h={20} mb={8} />
                  <Bar w="35%" h={12} mb={18} />
                  <Bar w="100%" h={12} mb={8} />
                  <Bar w="94%" h={12} mb={8} />
                  <Bar w="78%" h={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education + certifications band */}
      <section
        style={{
          padding: isMobile ? "40px 0 80px" : "72px 0 100px",
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 20,
            }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: isSmall ? 18 : 24,
                }}
              >
                <Bar w={120} h={12} mb={10} />
                <Bar w="65%" h={20} mb={10} />
                <Bar w="80%" h={12} mb={6} />
                <Bar w="55%" h={12} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageMain>
  );
}
export const ExperienceSkeleton = memo(ExperienceSkeletonBase);

/* -------------------------------- Blogs --------------------------------- */

function BlogsSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const cards = isSmall ? 3 : 5;

  return (
    <PageMain>
      <HeroSkeleton label={120} />

      {/* Sticky BlogFiltersBar: domain tabs + search + tag chips */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(9,12,16,0.95)",
        }}
      >
        <div className="container">
          {/* Domain tabs row */}
          <div style={{ display: "flex", gap: 0 }}>
            {[110, 110, 110].map((w, i) => (
              <div
                key={i}
                style={{
                  padding: isSmall ? "12px 14px" : "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Bar w={w} h={14} r={6} />
              </div>
            ))}
          </div>
          {/* Search input row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: isSmall ? "10px 0 8px" : "12px 0 10px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <Bar w="100%" h={isSmall ? 36 : 38} r={100} />
            <Bar w={60} h={12} />
          </div>
          {/* Tag chips row */}
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "0 0 10px",
              flexWrap: "wrap",
            }}
          >
            {[70, 90, 100, 80, 110, 75, 95].map((w, i) => (
              <Bar key={i} w={w} h={26} r={100} />
            ))}
          </div>
        </div>
      </div>

      {/* Content area: featured card + bento grid */}
      <section className="section">
        <div className="container">
          {/* Featured */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 0,
              marginBottom: 18,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 0,
              overflow: "hidden",
            }}
          >
            {!isMobile && (
              <div
                style={{
                  padding: 48,
                  background: "var(--bg2)",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bar w={120} h={120} r={100} />
              </div>
            )}
            <div style={{ padding: isSmall ? 18 : 36 }}>
              <Bar w={170} h={11} mb={12} />
              <Bar w="90%" h={22} mb={10} />
              <Bar w="75%" h={22} mb={14} />
              <Bar w="100%" h={12} mb={6} />
              <Bar w="92%" h={12} mb={6} />
              <Bar w="84%" h={12} mb={14} />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[60, 80, 70].map((w, i) => (
                  <Bar key={i} w={w} h={20} r={100} />
                ))}
              </div>
            </div>
          </div>

          {/* Bento-ish grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isSmall ? "1fr" : "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {Array.from({ length: cards }).map((_, i) => {
              const spanPattern: (1 | 2)[] = [2, 1, 1, 2, 1, 1, 1];
              const span = isSmall ? 1 : spanPattern[i % spanPattern.length];
              return (
                <div
                  key={i}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: isSmall ? 16 : 20,
                    gridColumn: `span ${span}`,
                    minHeight: isSmall ? 180 : 240,
                  }}
                >
                  <Bar w={100} h={11} mb={12} />
                  <Bar w="90%" h={18} mb={8} />
                  <Bar w="65%" h={18} mb={14} />
                  <Bar w="100%" h={12} mb={6} />
                  <Bar w="88%" h={12} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageMain>
  );
}
export const BlogsSkeleton = memo(BlogsSkeletonBase);

/* ------------------------------ BlogDetail ------------------------------ */

function BlogDetailSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <PageMain>
      <section
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 72px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            <Bar w={60} h={12} />
            <Bar w={10} h={12} />
            <Bar w={140} h={12} />
          </div>

          {/* Icon + meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <Bar w={isSmall ? 52 : 64} h={isSmall ? 52 : 64} r={14} />
            <div style={{ display: "flex", gap: 8 }}>
              <Bar w={70} h={12} />
              <Bar w={10} h={12} />
              <Bar w={70} h={12} />
            </div>
          </div>

          {/* Title */}
          <Bar w="100%" h={isSmall ? 28 : 44} mb={10} />
          <Bar w={isSmall ? "85%" : "70%"} h={isSmall ? 28 : 44} mb={20} />

          {/* Excerpt */}
          <Bar w="100%" h={16} mb={8} />
          <Bar w="92%" h={16} mb={28} />

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[60, 80, 70, 90].map((w, i) => (
              <Bar key={i} w={w} h={26} r={100} />
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: isMobile ? "40px 0 80px" : "60px 0 100px" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Bar w="100%" h={16} mb={8} />
          <Bar w="98%" h={16} mb={8} />
          <Bar w="94%" h={16} mb={28} />
          <Bar w="40%" h={22} mb={14} />
          <Bar w="100%" h={14} mb={8} />
          <Bar w="92%" h={14} mb={8} />
          <Bar w="88%" h={14} mb={20} />
          <Bar w="100%" h={120} r={12} mb={20} />
          <Bar w="100%" h={14} mb={8} />
          <Bar w="78%" h={14} />
        </div>
      </section>
    </PageMain>
  );
}
export const BlogDetailSkeleton = memo(BlogDetailSkeletonBase);

/* ------------------------------- Contact -------------------------------- */

function ContactSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <PageMain>
      <HeroSkeleton label={130} paragraphLines={1} />

      {/* Real layout is ContactInfo (1fr) + ContactForm (1.4fr) — info first */}
      <section className="section">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: isMobile ? 40 : 72,
            alignItems: "start",
          }}
        >
          {/* Info card */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: isSmall ? 20 : 28,
            }}
          >
            <Bar w={120} h={14} mb={20} />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ marginBottom: 22, display: "flex", gap: 12 }}>
                <Bar w={36} h={36} r={10} />
                <div style={{ flex: 1 }}>
                  <Bar w={80} h={11} mb={8} />
                  <Bar w="80%" h={14} />
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {[36, 36, 36, 36].map((s, i) => (
                <Bar key={i} w={s} h={s} r={100} />
              ))}
            </div>
          </div>

          {/* Form card */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: isSmall ? 20 : 28,
            }}
          >
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <Bar w={70} h={11} mb={8} />
                <Bar w="100%" h={42} r={10} />
              </div>
            ))}
            <Bar w={70} h={11} mb={8} />
            <Bar w="100%" h={120} r={10} mb={20} />
            <Bar w={160} h={46} r={100} />
          </div>
        </div>
      </section>
    </PageMain>
  );
}
export const ContactSkeleton = memo(ContactSkeletonBase);

/* --------------------------------- Uses --------------------------------- */

function UsesSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const sections = isSmall ? 4 : 6;

  return (
    <PageMain>
      <HeroSkeleton label={120} paragraphLines={2} />

      <section className="section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {Array.from({ length: sections }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: isSmall ? 18 : 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingBottom: 12,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <Bar w={36} h={36} r={10} />
                  <Bar w={140} h={16} />
                </div>
                {[0, 1, 2, 3].map((j) => (
                  <div key={j}>
                    <Bar w={120} h={13} mb={6} />
                    <Bar w="100%" h={11} mb={4} />
                    <Bar w="86%" h={11} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageMain>
  );
}
export const UsesSkeleton = memo(UsesSkeletonBase);

/* ------------------------------- Generic -------------------------------- */

function GenericSkeletonBase() {
  const isMobile = useIsMobile();
  return (
    <PageMain>
      <section style={{ paddingTop: isMobile ? 40 : 60, paddingBottom: 40 }}>
        <div className="container">
          <Bar w={140} h={20} mb={16} />
          <Bar w="60%" h={48} mb={28} />
          <Bar w="100%" h={16} mb={8} />
          <Bar w="92%" h={16} mb={8} />
          <Bar w="80%" h={16} />
        </div>
      </section>
    </PageMain>
  );
}
export const GenericSkeleton = memo(GenericSkeletonBase);
