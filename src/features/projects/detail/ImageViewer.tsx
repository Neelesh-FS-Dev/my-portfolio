import type { Screenshot } from "../../types";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface ImageViewerProps {
  screenshot: Screenshot | undefined;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function ImageViewer({
  screenshot,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: ImageViewerProps) {
  const isMobile = useIsMobile();

  if (!screenshot) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        padding: isMobile ? 16 : 24,
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Close button */}
      <button
        aria-label="Close image viewer"
        onClick={onClose}
        style={{
          position: "absolute",
          top: isMobile ? 16 : 24,
          right: isMobile ? 16 : 24,
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          transition: "all 0.2s ease",
          zIndex: 10001,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <FiX size={24} />
      </button>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? 12 : 24,
          maxWidth: isMobile ? "100%" : "90vw",
          maxHeight: "90vh",
          animation: "slideIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous button */}
        {hasPrev && (
          <button
            aria-label="Show previous screenshot"
            onClick={onPrev}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {/* Image container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            minWidth: 0,
            maxHeight: "90vh",
          }}
        >
          <img
            src={screenshot.url}
            alt={screenshot.label}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              borderRadius: 16,
              objectFit: "contain",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
            }}
          />
        </div>

        {/* Next button */}
        {hasNext && (
          <button
            aria-label="Show next screenshot"
            onClick={onNext}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Image label at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? 16 : 24,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255, 255, 255, 0.7)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {screenshot.label}
      </div>
    </div>
  );
}
