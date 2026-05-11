import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportError } from "./sentry";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * App-root error boundary. Without it, a single runtime error in any child
 * component white-screens the whole page. With it, we render a graceful
 * fallback and forward the error to Sentry when configured.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, info);
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary] caught:", error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          color: "var(--text)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 12,
            }}
          >
            Something broke
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}
          >
            That page didn't load cleanly.
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: 14.5,
              lineHeight: 1.65,
              margin: "0 0 24px",
            }}
          >
            A runtime error stopped the render. The issue's been reported.
            Try reloading — most of the time that's all it takes.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              style={{ fontSize: 13, padding: "10px 22px" }}
            >
              Reload
            </button>
            <button
              type="button"
              onClick={this.handleReset}
              className="btn btn-outline"
              style={{ fontSize: 13, padding: "10px 22px", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }
}
