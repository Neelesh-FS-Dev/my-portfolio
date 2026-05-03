import type { Project } from "../../types";
import { BsApple } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";

export interface StoreButtonsProps {
  project: Project;
  accentColor: string;
  isSmall: boolean;
}

export default function StoreButtons({
  project,
  accentColor,
  isSmall,
}: StoreButtonsProps) {
  const isWeb = project.type === "web";
  const showStore = !isWeb && (project.appStoreUrl || project.playStoreUrl);
  const hasAnything = showStore || project.githubUrl;
  if (!hasAnything) return null;

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
      {!isWeb && project.appStoreUrl && (
        <a
          href={project.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: isSmall ? "10px 16px" : "12px 22px",
            borderRadius: 14,
            background: "#000",
            border: "1px solid rgba(255,255,255,0.15)",
            textDecoration: "none",
            transition: "all .25s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          {/* Apple icon */}
          <BsApple size={isSmall ? 18 : 22} color="#fff" />
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              DOWNLOAD ON THE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: isSmall ? 13 : 15,
                  color: "#fff",
                }}
              >
                App Store
              </span>
            </div>
          </div>
        </a>
      )}

      {!isWeb && project.playStoreUrl && (
        <a
          href={project.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: isSmall ? "10px 16px" : "12px 22px",
            borderRadius: 14,
            background: "#000",
            border: "1px solid rgba(255,255,255,0.15)",
            textDecoration: "none",
            transition: "all .25s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          {/* Google Play colored SVG icon */}
          <svg
            width={isSmall ? 18 : 22}
            height={isSmall ? 18 : 22}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3.18 23.76c.3.17.64.24.99.2l12.52-11.5L13.44 9.2 3.18 23.76z"
              fill="#EA4335"
            />
            <path
              d="M20.54 10.27L17.38 8.5l-3.94 3.96 3.94 3.96 3.19-1.8c.91-.51.91-1.84-.03-2.35z"
              fill="#FBBC04"
            />
            <path
              d="M3.18.24C2.82.6 2.6 1.17 2.6 1.9v20.2c0 .73.22 1.3.58 1.66l.09.08 11.32-11.32v-.27L3.27.16l-.09.08z"
              fill="#4285F4"
            />
            <path
              d="M16.7 12.46L13.44 9.2 3.18.24c.44-.25.97-.27 1.44-.03l12.08 6.84-3.94 3.96 3.94-.55z"
              fill="#34A853"
            />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              GET IT ON
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: isSmall ? 13 : 15,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              Google Play
            </div>
          </div>
        </a>
      )}

      {/* {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: isSmall ? "10px 16px" : "12px 22px",
            borderRadius: 14,
            background: "transparent",
            border: `1px solid ${accentColor}35`,
            textDecoration: "none",
            transition: "all .25s",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: isSmall ? 13 : 14,
            color: accentColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${accentColor}12`;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
<FiExternalLink size={15} style={{ marginRight: 6 }} /> Visit Website
        </a>
      )} */}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: isSmall ? "10px 16px" : "12px 22px",
            borderRadius: 14,
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.15)",
            textDecoration: "none",
            transition: "all .25s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          <FiGithub size={isSmall ? 18 : 22} color="#fff" />
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              VIEW SOURCE ON
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: isSmall ? 13 : 15,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              GitHub
            </div>
          </div>
        </a>
      )}
    </div>
  );
}
