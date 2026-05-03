import type { Project } from "../types";
import { useIsMobile, useIsSmall } from "../../../shared/hooks/useMediaQuery";
import AppScreenshot from "./AppScreenshot";

export interface ScreenshotsSectionProps {
  project: Project;
  accentColor: string;
  onOpenImage: (index: number) => void;
}

export default function ScreenshotsSection({
  project,
  accentColor,
  onOpenImage,
}: ScreenshotsSectionProps) {
  const isSmall = useIsSmall();
  const isMobile = useIsMobile();

  const screenshots = project.screenshots?.filter((s) => s.url) ?? [];
  if (screenshots.length === 0) return null;

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
        App Screenshots
      </h2>
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          gridTemplateColumns: isMobile ? undefined : "repeat(6, 1fr)",
          gap: isSmall ? 12 : 20,
          overflowX: isMobile ? "auto" : "visible",
          paddingBottom: isMobile ? 12 : 0,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {screenshots.map((shot, i) => (
          <AppScreenshot
            key={i}
            screenshot={shot}
            accentColor={accentColor}
            index={i}
            onOpen={onOpenImage}
          />
        ))}
      </div>
    </div>
  );
}
