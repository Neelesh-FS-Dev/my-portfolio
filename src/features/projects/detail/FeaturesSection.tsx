import type { Project } from "../../types";
import { useIsMobile, useIsSmall } from "../../hooks/useMediaQuery";
import { featureIconMap } from "../../utils/featureIcons";

export interface FeaturesSectionProps {
  project: Project;
  accentColor: string;
}

export default function FeaturesSection({
  project,
  accentColor,
}: FeaturesSectionProps) {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  if (!project.features || project.features.length === 0) return null;

  return (
    <div style={{ marginBottom: 60 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: isSmall ? 20 : 24,
          marginBottom: 8,
        }}
      >
        Technical Breakdown
      </h2>
      <p
        style={{
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          marginBottom: 32,
        }}
      >
        Feature areas & implementation details
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : isMobile ? "1fr" : "1fr 1fr",
          gap: 16,
        }}
      >
        {project.features.map((feat, fi) => (
          <div
            key={fi}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: isSmall ? "20px" : "26px",
              transition: "border-color .3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = accentColor + "30")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  flexShrink: 0,
                  background: accentColor + "15",
                  border: `1px solid ${accentColor}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: accentColor,
                }}
              >
                {featureIconMap[feat.icon] ?? feat.icon}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: isSmall ? 14 : 16,
                }}
              >
                {feat.title}
              </span>
            </div>
            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {feat.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      color: accentColor,
                      fontSize: 8,
                      marginTop: 5,
                      flexShrink: 0,
                    }}
                  >
                    ▸
                  </span>
                  <span
                    style={{
                      color: "var(--text2)",
                      fontSize: isSmall ? 12 : 13,
                      lineHeight: 1.65,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
