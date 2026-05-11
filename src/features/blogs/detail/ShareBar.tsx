import { memo, useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiCopy, FiLinkedin, FiTwitter } from "react-icons/fi";
import {
  hoverLift,
  hoverLiftTarget,
  tapTarget,
} from "../../../shared/components/motion";

export interface ShareBarProps {
  url: string;
  title: string;
}

function ShareBarBase({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — fall back silently
    }
  };

  return (
    <div
      role="group"
      aria-label="Share this article"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        margin: "32px 0 8px",
        padding: "16px 0 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text3)",
          marginRight: 4,
        }}
      >
        Share
      </span>
      <ShareLink
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        label="Share on X / Twitter"
      >
        <FiTwitter size={14} aria-hidden /> X
      </ShareLink>
      <ShareLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        label="Share on LinkedIn"
      >
        <FiLinkedin size={14} aria-hidden /> LinkedIn
      </ShareLink>
      <motion.button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        whileHover={hoverLiftTarget}
        whileTap={tapTarget}
        transition={hoverLift}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          borderRadius: 100,
          border: "1px solid var(--border)",
          background: copied ? "rgba(34,197,94,0.08)" : "transparent",
          color: copied ? "#22c55e" : "var(--text2)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.02em",
          cursor: "pointer",
          willChange: "transform",
        }}
      >
        {copied ? <FiCheck size={14} aria-hidden /> : <FiCopy size={14} aria-hidden />}
        {copied ? "Copied" : "Copy link"}
      </motion.button>
    </div>
  );
}

interface ShareLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function ShareLink({ href, label, children }: ShareLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={hoverLiftTarget}
      whileTap={tapTarget}
      transition={hoverLift}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        borderRadius: 100,
        border: "1px solid var(--border)",
        color: "var(--text2)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.02em",
        textDecoration: "none",
        willChange: "transform",
      }}
    >
      {children}
    </motion.a>
  );
}

export default memo(ShareBarBase);
