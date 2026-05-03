import { useState } from "react";
import type { Project } from "../../types";
import { useIsMobile, useIsSmall } from "../../hooks/useMediaQuery";

export interface VideoSectionProps {
  project: Project;
  accentColor: string;
}

interface VideoSource {
  type: "embed" | "file";
  src: string;
}

export default function VideoSection({
  project,
  accentColor,
}: VideoSectionProps) {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);

  const getVideoSource = (url: string): VideoSource | null => {
    if (!url) return null;

    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    if (ytMatch) {
      return {
        type: "embed",
        src: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`,
      };
    }

    const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
    if (loomMatch) {
      return {
        type: "embed",
        src: `https://www.loom.com/embed/${loomMatch[1]}`,
      };
    }

    if (/\.(mp4|mov|webm|ogg)(\?.*)?$/i.test(url)) {
      return {
        type: "file",
        src: url,
      };
    }

    if (url.startsWith("http")) {
      return {
        type: "embed",
        src: url,
      };
    }

    return {
      type: "file",
      src: url,
    };
  };

  const videoSource = getVideoSource(project.videoUrl);
  const isPortraitVideo =
    videoSource?.type === "file" && videoAspectRatio && videoAspectRatio < 1;
  const videoWrapperWidth = isPortraitVideo
    ? isMobile
      ? "min(100%, 360px)"
      : "min(100%, 420px)"
    : "100%";
  const videoAspect = isPortraitVideo
    ? `${9} / ${16}`
    : videoAspectRatio && videoAspectRatio >= 1
      ? `${videoAspectRatio}`
      : "16 / 9";

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
        App Demo
      </h2>
      <p
        style={{
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          marginBottom: 24,
        }}
      >
        Watch the app in action
      </p>

      {videoSource ? (
        <div
          style={{
            display: "flex",
            justifyContent: isPortraitVideo ? "center" : "stretch",
          }}
        >
          <div
            style={{
              width: videoWrapperWidth,
              maxWidth: "100%",
              borderRadius: isPortraitVideo ? 28 : 20,
              overflow: "hidden",
              border: `1px solid ${accentColor}25`,
              background: "#000",
              aspectRatio: videoAspect,
              position: "relative",
              boxShadow: isPortraitVideo
                ? `0 24px 80px rgba(0,0,0,0.45), 0 0 40px ${accentColor}10`
                : `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${accentColor}10`,
            }}
          >
            {videoSource.type === "file" ? (
              <video
                src={videoSource.src}
                controls
                preload="metadata"
                playsInline
                onLoadedMetadata={(e) => {
                  const { videoWidth, videoHeight } = e.currentTarget;
                  if (videoWidth && videoHeight) {
                    setVideoAspectRatio(videoWidth / videoHeight);
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            ) : (
              <iframe
                src={videoSource.src}
                title={`${project.title} demo`}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      ) : (
        /* Placeholder — shows how to add a video */
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `1px dashed ${accentColor}30`,
            background: `linear-gradient(135deg, ${accentColor}06 0%, var(--surface) 100%)`,
            aspectRatio: "16/9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            ▶
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: isSmall ? 14 : 16,
                marginBottom: 8,
              }}
            >
              Add App Demo Video
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                lineHeight: 1.6,
              }}
            >
              Paste a YouTube, Loom, or local video path in{" "}
              <code
                style={{
                  color: accentColor,
                  background: `${accentColor}12`,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                projects.js → videoUrl
              </code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
