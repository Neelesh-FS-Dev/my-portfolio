import { memo } from "react";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";

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

/* --------------------------------- Home --------------------------------- */

function HomeSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <PageMain>
      <section
        style={{
          minHeight: "100vh",
          paddingTop: isMobile ? 80 : 96,
          paddingBottom: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: isMobile ? 0 : 48,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <Bar w={170} h={30} r={100} mb={isSmall ? 20 : 28} />
            <Bar
              w={isSmall ? "90%" : "75%"}
              h={isSmall ? 40 : isMobile ? 52 : 88}
              mb={12}
            />
            <Bar
              w={isSmall ? "65%" : "50%"}
              h={isSmall ? 40 : isMobile ? 52 : 88}
              mb={isSmall ? 22 : 28}
            />
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 22,
                flexWrap: "wrap",
              }}
            >
              {[110, 90, 130].map((w) => (
                <Bar key={w} w={w} h={28} r={100} />
              ))}
            </div>
            {[100, 96, 88].map((w, i) => (
              <Bar key={i} w={`${w}%`} maxW={540} h={14} mb={10} />
            ))}
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: isSmall ? 24 : 32,
                marginBottom: isSmall ? 32 : 48,
                flexWrap: "wrap",
              }}
            >
              <Bar w={160} h={46} r={100} />
              <Bar w={180} h={46} r={100} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmall ? "1fr 1fr" : "repeat(4,auto)",
                gap: isSmall ? "14px 20px" : "0 32px",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Bar w={56} h={26} mb={6} />
                  <Bar w={70} h={10} />
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div
              style={{
                display: "flex",
                gap: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="skeleton"
                style={{
                  width: 220,
                  height: 440,
                  borderRadius: 36,
                  opacity: 0.55,
                  transform: "translateX(-20px) rotate(-8deg)",
                }}
              />
              <div
                className="skeleton"
                style={{
                  width: 220,
                  height: 440,
                  borderRadius: 36,
                  marginLeft: -40,
                  transform: "translateY(-10px)",
                }}
              />
            </div>
          )}
        </div>
      </section>
    </PageMain>
  );
}
export const HomeSkeleton = memo(HomeSkeletonBase);

/* ------------------------------- Projects ------------------------------- */

function ProjectsSkeletonBase() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const cols = isSmall ? "1fr" : isMobile ? "1fr 1fr" : "1fr 1fr";
  const cards = isSmall ? 4 : 6;

  return (
    <PageMain>
      <section style={{ paddingTop: isMobile ? 80 : 96, paddingBottom: 40 }}>
        <div className="container">
          <Bar w={150} h={20} mb={16} />
          <Bar
            w={isSmall ? "80%" : "55%"}
            h={isSmall ? 36 : 56}
            mb={20}
          />
          <Bar w={isSmall ? "100%" : 540} h={14} mb={10} />
          <Bar w={isSmall ? "85%" : 460} h={14} mb={36} />

          {/* Filter bar */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            {[80, 90, 110, 100, 95].map((w, i) => (
              <Bar key={i} w={w} h={36} r={100} />
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: cols,
              gap: 16,
            }}
          >
            {Array.from({ length: cards }).map((_, i) => (
              <Bar
                key={i}
                w="100%"
                h={isSmall ? 240 : 320}
                r={14}
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
      <section style={{ paddingTop: isMobile ? 80 : 96, paddingBottom: 40 }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            <Bar w={70} h={12} />
            <Bar w={10} h={12} />
            <Bar w={120} h={12} />
          </div>

          <Bar w={120} h={26} r={100} mb={14} />
          <Bar
            w={isSmall ? "85%" : "65%"}
            h={isSmall ? 32 : 56}
            mb={8}
          />
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
          <Bar
            w="100%"
            h={isSmall ? 220 : 380}
            r={14}
            mb={32}
          />

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

  return (
    <PageMain>
      <section style={{ paddingTop: isMobile ? 80 : 96, paddingBottom: 40 }}>
        <div className="container">
          <Bar w={170} h={20} mb={16} />
          <Bar w={isSmall ? "75%" : "50%"} h={isSmall ? 36 : 56} mb={36} />

          {/* Job cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: isSmall ? 18 : 24,
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: 20,
                }}
              >
                <Bar w={isMobile ? 56 : 64} h={isMobile ? 56 : 64} r={12} />
                <div style={{ flex: 1 }}>
                  <Bar w="40%" h={20} mb={8} />
                  <Bar w="60%" h={14} mb={14} />
                  <Bar w="100%" h={12} mb={8} />
                  <Bar w="92%" h={12} mb={8} />
                  <Bar w="78%" h={12} />
                </div>
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
  const cols = isSmall ? "1fr" : isMobile ? "1fr 1fr" : "1fr 1fr 1fr";
  const cards = isSmall ? 3 : 6;

  return (
    <PageMain>
      <section style={{ paddingTop: isMobile ? 80 : 96, paddingBottom: 40 }}>
        <div className="container">
          <Bar w={140} h={20} mb={16} />
          <Bar w={isSmall ? "75%" : "50%"} h={isSmall ? 36 : 56} mb={20} />
          <Bar w={isSmall ? "100%" : 520} h={14} mb={10} maxW={520} />
          <Bar w={isSmall ? "85%" : 440} h={14} mb={28} maxW={520} />

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {[80, 80, 80].map((w, i) => (
              <Bar key={i} w={w} h={32} r={100} />
            ))}
          </div>

          {/* Featured */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: isSmall ? 18 : 24,
              marginBottom: 18,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 20,
            }}
          >
            <Bar w="100%" h={isSmall ? 140 : 200} r={12} />
            <div>
              <Bar w={120} h={12} mb={12} />
              <Bar w="90%" h={22} mb={10} />
              <Bar w="75%" h={22} mb={14} />
              <Bar w="100%" h={12} mb={6} />
              <Bar w="92%" h={12} mb={6} />
              <Bar w="84%" h={12} />
            </div>
          </div>

          {/* Grid */}
          <div
            style={{ display: "grid", gridTemplateColumns: cols, gap: 14 }}
          >
            {Array.from({ length: cards }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: isSmall ? 16 : 20,
                }}
              >
                <Bar w={100} h={11} mb={12} />
                <Bar w="90%" h={18} mb={8} />
                <Bar w="65%" h={18} mb={14} />
                <Bar w="100%" h={12} mb={6} />
                <Bar w="88%" h={12} />
              </div>
            ))}
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
          padding: isMobile ? "80px 0 52px" : "96px 0 72px",
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
            <Bar
              w={isSmall ? 52 : 64}
              h={isSmall ? 52 : 64}
              r={14}
            />
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
      <section style={{ paddingTop: isMobile ? 80 : 96, paddingBottom: 40 }}>
        <div className="container">
          <Bar w={140} h={20} mb={16} />
          <Bar w={isSmall ? "75%" : "50%"} h={isSmall ? 36 : 56} mb={36} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
              gap: 24,
            }}
          >
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
              <Bar w={140} h={46} r={100} />
            </div>

            {/* Info card */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: isSmall ? 20 : 28,
              }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ marginBottom: 22 }}>
                  <Bar w={80} h={11} mb={8} />
                  <Bar w="80%" h={16} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageMain>
  );
}
export const ContactSkeleton = memo(ContactSkeletonBase);

/* ------------------------------- Generic -------------------------------- */

function GenericSkeletonBase() {
  return (
    <PageMain>
      <section style={{ paddingTop: 96, paddingBottom: 40 }}>
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
