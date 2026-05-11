import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import AnimatedField from "./AnimatedField";
import {
  RevealStagger,
  fadeUp,
  scaleIn,
  hoverLift,
  hoverLiftTarget,
  tapTarget,
} from "../../../shared/components/motion";

export interface ContactFormProps {
  isMobile: boolean;
  isSmall: boolean;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  _honey: string;
}

export default function ContactForm({ isMobile, isSmall }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honey: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!mountedRef.current) return;
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "", _honey: "" });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      if (mountedRef.current) alert("Failed to send. Please try again.");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  // Memoised so changing `focusedField` (which triggers per-input re-renders)
  // doesn't allocate fresh style objects every keystroke.
  const inputBase = useMemo<CSSProperties>(
    () => ({
      width: "100%",
      padding: isSmall ? "12px 14px" : "14px 18px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      color: "var(--text)",
      fontFamily: "var(--font-body)",
      fontSize: isSmall ? 14 : 15,
      outline: "none",
      transition: "border-color .25s, box-shadow .25s",
      boxSizing: "border-box",
    }),
    [isSmall],
  );

  const labelStyle = useMemo<CSSProperties>(
    () => ({
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text3)",
      display: "block",
      marginBottom: 8,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      transition: "color 0.2s",
    }),
    [],
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={scaleIn}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 22,
        padding: isSmall ? "24px 20px" : isMobile ? "32px" : "40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient top bar with animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg, var(--accent), var(--accent2), #ec4899, var(--accent))",
          backgroundSize: "200%",
          animation: "gradient-shift 4s linear infinite",
        }}
      />

      {sent ? (
        /* ── Success state ── */
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ textAlign: "center", padding: "48px 0" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.1,
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              marginBottom: 20,
              animation: "icon-float 4s ease-in-out infinite",
            }}
          >
            <FiCheckCircle size={36} style={{ color: "var(--green)" }} />
          </motion.div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Message Sent!
          </h3>
          <p
            style={{
              color: "var(--text2)",
              marginBottom: 28,
              fontSize: 14,
              lineHeight: 1.65,
            }}
          >
            Thanks for reaching out. I'll get back to you within 24 hours.
          </p>
          <motion.button
            onClick={() => setSent(false)}
            className="btn btn-outline"
            whileHover={hoverLiftTarget}
            whileTap={tapTarget}
            transition={hoverLift}
            style={{ fontSize: 13, cursor: "pointer" }}
          >
            Send Another
          </motion.button>
        </motion.div>
      ) : (
        <RevealStagger stagger={0.07} delayChildren={0.2} amount={0.05}>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isSmall ? 18 : 21,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            Send a Message
          </motion.h2>
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Honeypot — hidden from users, irresistible to bots */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                overflow: "hidden",
                opacity: 0,
              }}
            >
              <label htmlFor="contact_honey">Leave this empty</label>
              <input
                id="contact_honey"
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                value={form._honey}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
                gap: 14,
              }}
            >
              <AnimatedField>
                <label
                  style={{
                    ...labelStyle,
                    color:
                      focusedField === "name"
                        ? "var(--accent)"
                        : "var(--text3)",
                  }}
                >
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  style={{
                    ...inputBase,
                    borderColor:
                      focusedField === "name"
                        ? "var(--accent)"
                        : "var(--border)",
                    boxShadow:
                      focusedField === "name"
                        ? "0 0 0 3px rgba(59,130,246,0.08)"
                        : "none",
                  }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </AnimatedField>
              <AnimatedField>
                <label
                  style={{
                    ...labelStyle,
                    color:
                      focusedField === "email"
                        ? "var(--accent)"
                        : "var(--text3)",
                  }}
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  style={{
                    ...inputBase,
                    borderColor:
                      focusedField === "email"
                        ? "var(--accent)"
                        : "var(--border)",
                    boxShadow:
                      focusedField === "email"
                        ? "0 0 0 3px rgba(59,130,246,0.08)"
                        : "none",
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </AnimatedField>
            </div>
            <AnimatedField>
              <label
                style={{
                  ...labelStyle,
                  color:
                    focusedField === "subject"
                      ? "var(--accent)"
                      : "var(--text3)",
                }}
              >
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="React Native opportunity..."
                style={{
                  ...inputBase,
                  borderColor:
                    focusedField === "subject"
                      ? "var(--accent)"
                      : "var(--border)",
                  boxShadow:
                    focusedField === "subject"
                      ? "0 0 0 3px rgba(59,130,246,0.08)"
                      : "none",
                }}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
              />
            </AnimatedField>
            <AnimatedField>
              <label
                style={{
                  ...labelStyle,
                  color:
                    focusedField === "message"
                      ? "var(--accent)"
                      : "var(--text3)",
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
                rows={5}
                style={{
                  ...inputBase,
                  resize: "vertical",
                  minHeight: 120,
                  borderColor:
                    focusedField === "message"
                      ? "var(--accent)"
                      : "var(--border)",
                  boxShadow:
                    focusedField === "message"
                      ? "0 0 0 3px rgba(59,130,246,0.08)"
                      : "none",
                }}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
            </AnimatedField>

            {/* Submit button */}
            <motion.div variants={fadeUp} style={{ marginTop: 4 }}>
              <motion.button
                type="submit"
                disabled={loading}
                className="btn btn-primary submit-btn"
                whileHover={loading ? undefined : { y: -2, scale: 1.01 }}
                whileTap={loading ? undefined : tapTarget}
                transition={hoverLift}
                style={{
                  justifyContent: "center",
                  fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  opacity: loading ? 0.75 : 1,
                  willChange: "transform",
                }}
              >
                {loading ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span className="spinner" /> Sending…
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    Send Message <FiSend size={14} className="send-icon" />
                  </span>
                )}
                {/* Shimmer sweep */}
                <span className="btn-shimmer" />
              </motion.button>
            </motion.div>
          </motion.form>
        </RevealStagger>
      )}
    </motion.div>
  );
}
