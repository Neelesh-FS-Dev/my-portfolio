import experience from "./data/experience";
import { degrees } from "./data/education";
import { useIsMobile, useIsSmall } from "../../shared/hooks/useMediaQuery";
import SEO from "../../shared/components/ui/SEO";
import ExperienceHero from "./components/ExperienceHero";
import JobCard from "./components/JobCard";
import EducationSection from "./components/EducationSection";
import CertificationsSection from "./components/CertificationsSection";

export default function Experience() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const edu = degrees[0];

  return (
    <div>
      <SEO
        title="Experience — Neelesh Yadav | 3+ Years React Native & React"
        description="3+ years of professional experience as a React Native & React Developer. Work history, education, and certifications — Neelesh Yadav, Pune, India."
        path="/experience"
      />

      <ExperienceHero isMobile={isMobile} isSmall={isSmall} />

      {/* ─── TIMELINE ─── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div
            style={{ position: "relative", paddingLeft: isMobile ? 28 : 44 }}
          >
            {/* Glowing vertical line */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? 13 : 7,
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  "linear-gradient(180deg, var(--accent) 0%, var(--accent2) 40%, #ec4899 75%, transparent 100%)",
                borderRadius: 2,
                boxShadow: "0 0 12px rgba(59,130,246,0.3)",
                animation: "line-pulse 3s ease-in-out infinite",
              }}
            />
            {/* Traveling glow dot */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? 10 : 4,
                top: 0,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 18px var(--accent)",
                animation: "travel-dot 5s ease-in-out infinite",
                zIndex: 2,
              }}
            />

            {experience.map((job, idx) => (
              <JobCard
                key={idx}
                job={job}
                idx={idx}
                isMobile={isMobile}
                isSmall={isSmall}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATION + CERTIFICATIONS ─── */}
      <section
        style={{
          padding: "72px 0 100px",
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 880 }}>
          <EducationSection edu={edu} isMobile={isMobile} isSmall={isSmall} />
          <CertificationsSection isMobile={isMobile} isSmall={isSmall} />
        </div>
      </section>

      {/* ─── GLOBAL ANIMATION STYLES ─── */}
      <style>{`
        @keyframes ripple {
          0%  { transform: scale(1); opacity: 0.6; }
          100%{ transform: scale(3.2); opacity: 0; }
        }
        @keyframes pulse {
          0%,100%{ opacity:1; }
          50%     { opacity:0.3; }
        }
        @keyframes breathe {
          0%,100%{ transform: translateY(-50%) scale(1); opacity:1; }
          50%    { transform: translateY(-50%) scale(1.12); opacity:0.7; }
        }
        @keyframes float-particle {
          from { transform: translateY(0px) translateX(0px); opacity:0.4; }
          to   { transform: translateY(-12px) translateX(6px); opacity:1; }
        }
        @keyframes text-shimmer {
          0%,100%{ filter: brightness(1); }
          50%    { filter: brightness(1.25) drop-shadow(0 0 8px var(--accent2)); }
        }
        @keyframes line-pulse {
          0%,100%{ opacity:1; box-shadow:0 0 12px rgba(59,130,246,0.3); }
          50%    { opacity:0.7; box-shadow:0 0 20px rgba(59,130,246,0.5); }
        }
        @keyframes travel-dot {
          0%  { top: 0%;   opacity:1; }
          80% { top: 92%;  opacity:1; }
          95% { top: 96%;  opacity:0; }
          96% { top: 0%;   opacity:0; }
          100%{ top: 0%;   opacity:1; }
        }
        @keyframes icon-float {
          0%,100%{ transform: translateY(0px); }
          50%    { transform: translateY(-5px); }
        }
        @keyframes gradient-shift {
          0%  { background-position: 0% 0%; }
          100%{ background-position: 200% 0%; }
        }

        /* Tech pill hover */
        .tech-pill:hover {
          background: var(--surface) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }

        /* Badge hover lift */
        .badge-hover:hover {
          transform: translateY(-2px) scale(1.04) !important;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1) !important;
        }

        /* Cert card hover */
        .cert-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 6px 28px rgba(59,130,246,0.12) !important;
          transform: translateY(-2px) !important;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
        }
        .cert-card:hover .cert-icon {
          transform: rotate(-8deg) scale(1.15) !important;
          box-shadow: 0 4px 16px rgba(59,130,246,0.2) !important;
        }

        /* Card shimmer sweep */
        .card-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
          background-size: 200% 100%;
          background-position: -100% 0;
          pointer-events: none;
          border-radius: inherit;
          transition: background-position 0s;
        }
        div:hover > .card-shimmer {
          background-position: 200% 0;
          transition: background-position 0.6s ease;
        }
      `}</style>
    </div>
  );
}
