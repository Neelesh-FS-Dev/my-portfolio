import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "../shared/hooks/useMediaQuery";

export default function NotFound() {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: isMobile ? 40 : 48,
      }}
    >
      <Helmet>
        <title>404 — Page Not Found | Neelesh Yadav</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <h1
          style={{
            fontSize: isMobile ? 80 : 120,
            fontWeight: 800,
            background:
              "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: isMobile ? 18 : 22,
            color: "var(--text1)",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Page not found
        </p>
        <p
          style={{
            fontSize: isMobile ? 14 : 16,
            color: "var(--text2)",
            maxWidth: 400,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            borderRadius: 10,
            background:
              "linear-gradient(135deg, var(--accent), var(--accent2))",
            color: "#000000",
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
