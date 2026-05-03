import { useState } from "react";
import type { CSSProperties } from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import AnimatedField from "./AnimatedField";

export interface ContactFormProps {
  isMobile: boolean;
  isSmall: boolean;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm({ isMobile, isSmall }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formRef, formVisible] = useReveal<HTMLDivElement>(0.08);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch {
      alert("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase: CSSProperties = {
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
  };

  const labelStyle: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--text3)",
    display: "block",
    marginBottom: 8,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "color 0.2s",
  };

  return (
    <div
      ref={formRef}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 22,
        padding: isSmall ? "24px 20px" : isMobile ? "32px" : "40px",
        opacity: formVisible ? 1 : 0,
        transform: formVisible
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.98)",
        transition:
          "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
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
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
            animation: "success-pop 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
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
          </div>
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
          <button
            onClick={() => setSent(false)}
            className="btn btn-outline"
            style={{ fontSize: 13, cursor: "pointer" }}
          >
            Send Another
          </button>
        </div>
      ) : (
        <>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isSmall ? 18 : 21,
              fontWeight: 700,
              marginBottom: 24,
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
            }}
          >
            Send a Message
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
                gap: 14,
              }}
            >
              <AnimatedField idx={0} visible={formVisible}>
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
              <AnimatedField idx={1} visible={formVisible}>
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
            <AnimatedField idx={2} visible={formVisible}>
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
            <AnimatedField idx={3} visible={formVisible}>
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
            <div
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
                marginTop: 4,
              }}
            >
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary submit-btn"
                style={{
                  justifyContent: "center",
                  fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  opacity: loading ? 0.75 : 1,
                  transition: "opacity 0.2s, transform 0.2s",
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
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
