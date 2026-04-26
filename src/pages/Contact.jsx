import { useState, useRef, useEffect, useCallback } from "react";
import { personal } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import {
  FiMail,
  FiGithub,
  FiInstagram,
  FiMapPin,
  FiPhone,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import SEO from "../components/SEO";

/* ── Hook: triggers once when element enters viewport ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Hook: magnetic tilt on hover ── */
function useMagnetic() {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * 8;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(4px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/* ── Contact info row ── */
function ContactRow({ item, idx, visible, isSmall }) {
  return (
    <div
      className="contact-row"
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        padding: isSmall ? "14px 16px" : "16px 18px",
        borderRadius: 14,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${0.08 + idx * 0.07}s,
                     transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.08 + idx * 0.07}s,
                     border-color 0.2s, box-shadow 0.2s`,
        cursor: item.href ? "pointer" : "default",
        willChange: "transform, opacity",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,229,255,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="contact-icon"
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          flexShrink: 0,
          background: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          transition:
            "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s",
        }}
      >
        {item.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          {item.label}
        </div>
        {item.href ? (
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isSmall ? 12 : 14,
              color: "var(--accent)",
              wordBreak: "break-all",
              transition: "opacity .2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = ".7")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {item.value}
          </a>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isSmall ? 12 : 14,
              color: "var(--text2)",
            }}
          >
            {item.value}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Animated input with label float effect ── */
function AnimatedField({ label, children, idx, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s ease ${0.1 + idx * 0.07}s, transform 0.5s ease ${0.1 + idx * 0.07}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  const [headerRef, headerVisible] = useReveal(0.05);
  const [infoRef, infoVisible] = useReveal(0.08);
  const [formRef, formVisible] = useReveal(0.08);
  const [availRef, availVisible] = useReveal(0.1);
  const formMagnetic = useMagnetic();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
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

  const inputBase = {
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

  const labelStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--text3)",
    display: "block",
    marginBottom: 8,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "color 0.2s",
  };

  const linkedInHandle = personal.linkedin.replace(/^https?:\/\/(www\.)?/, "");
  const githubHandle = personal.github.replace(/^https?:\/\/(www\.)?/, "");
  const instagramHandle = personal.instagram
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\/$/, "");

  const contactItems = [
    {
      icon: <FiMail size={18} />,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: <FiPhone size={18} />,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      icon: <FiMapPin size={18} />,
      label: "Location",
      value: personal.location,
      href: null,
    },
    {
      icon: <FiLinkedin size={18} />,
      label: "LinkedIn",
      value: linkedInHandle,
      href: personal.linkedin,
    },
    {
      icon: <FiGithub size={18} />,
      label: "GitHub",
      value: githubHandle,
      href: personal.github,
    },
    {
      icon: <FiInstagram size={18} />,
      label: "Instagram",
      value: instagramHandle,
      href: personal.instagram,
    },
  ];

  /* Floating particles */
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 55 + Math.sin(i * 137.5) * 38,
    y: 15 + Math.cos(i * 97.3) * 70,
    size: 1.5 + (i % 3) * 1.2,
    delay: (i * 0.35) % 3,
    dur: 3 + (i % 4) * 0.8,
  }));

  return (
    <div>
      <SEO
        title="Contact — Neelesh Yadav | Hire a React Native Developer"
        description="Get in touch with Neelesh Yadav for freelance projects, full-time roles, or collaboration. React Native & React Developer based in Pune, India."
        path="/contact"
      />
      {/* ─── HEADER ─── */}
      <section
        ref={headerRef}
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        {/* Breathing radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "8%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,229,255,0.08) 0%,transparent 70%)",
            pointerEvents: "none",
            animation: "breathe 5s ease-in-out infinite",
          }}
        />
        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(0,229,255,${0.2 + (p.id % 3) * 0.15})`,
              animation: `float-particle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container">
          <div
            className="section-label"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
            }}
          >
            Get In Touch
          </div>
          <h1
            className="section-title"
            style={{
              marginBottom: 14,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible
                ? "translateY(0) skewY(0deg)"
                : "translateY(20px) skewY(1deg)",
              transition:
                "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            Let's Build
            <br />
            <span
              style={{
                color: "var(--accent)",
                display: "inline-block",
                animation: headerVisible
                  ? "text-shimmer 4s ease-in-out infinite"
                  : "none",
              }}
            >
              Together
            </span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 460,
              lineHeight: 1.75,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.55s ease 0.22s, transform 0.55s ease 0.22s",
            }}
          >
            I'm open to React Native roles, freelance projects, and interesting
            collaborations. Let's talk.
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="section">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: isMobile ? 40 : 72,
            alignItems: "start",
          }}
        >
          {/* ── Contact Info ── */}
          <div ref={infoRef}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isSmall ? 20 : 24,
                fontWeight: 700,
                marginBottom: 24,
                opacity: infoVisible ? 1 : 0,
                transform: infoVisible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
              }}
            >
              Contact Info
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 28,
              }}
            >
              {contactItems.map((item, idx) => (
                <ContactRow
                  key={item.label}
                  item={item}
                  idx={idx}
                  visible={infoVisible}
                  isSmall={isSmall}
                />
              ))}
            </div>

            {/* Availability badge */}
            <div
              ref={availRef}
              style={{
                padding: "20px",
                borderRadius: 16,
                background:
                  "linear-gradient(135deg,rgba(0,255,136,0.08) 0%,rgba(0,229,255,0.05) 100%)",
                border: "1px solid rgba(0,255,136,0.2)",
                opacity: availVisible ? 1 : 0,
                transform: availVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(16px) scale(0.97)",
                transition:
                  "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--green)",
                      boxShadow: "0 0 8px var(--green)",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      border: "1px solid var(--green)",
                      opacity: 0.4,
                      animation: "ripple-sm 2s ease-out infinite",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: isSmall ? 14 : 16,
                  }}
                >
                  Available Now
                </span>
              </div>
              <p
                style={{
                  color: "var(--text2)",
                  fontSize: isSmall ? 13 : 14,
                  lineHeight: 1.65,
                }}
              >
                Open to full-time React Native roles, freelance projects, and
                consulting. Response within 24 hours.
              </p>
            </div>
          </div>

          {/* ── Form ── */}
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
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.25)",
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
                    transform: formVisible
                      ? "translateY(0)"
                      : "translateY(10px)",
                    transition:
                      "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
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
                              ? "0 0 0 3px rgba(0,229,255,0.08)"
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
                              ? "0 0 0 3px rgba(0,229,255,0.08)"
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
                            ? "0 0 0 3px rgba(0,229,255,0.08)"
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
                            ? "0 0 0 3px rgba(0,229,255,0.08)"
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
                      transform: formVisible
                        ? "translateY(0)"
                        : "translateY(12px)",
                      transition:
                        "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
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
                          Send Message{" "}
                          <FiSend size={14} className="send-icon" />
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
        </div>
      </section>

      <style>{`
        @keyframes pulse       { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes breathe     { 0%,100%{transform:translateY(-50%) scale(1); opacity:1} 50%{transform:translateY(-50%) scale(1.12); opacity:.7} }
        @keyframes float-particle { from{transform:translateY(0) translateX(0); opacity:.4} to{transform:translateY(-12px) translateX(6px); opacity:1} }
        @keyframes text-shimmer { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.25) drop-shadow(0 0 8px var(--accent))} }
        @keyframes gradient-shift { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        @keyframes icon-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes ripple-sm   { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(3);opacity:0} }
        @keyframes success-pop { 0%{opacity:0;transform:scale(0.9) translateY(12px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin        { to{transform:rotate(360deg)} }
        @keyframes send-fly    { 0%{transform:translateX(0) translateY(0) rotate(0deg); opacity:1} 100%{transform:translateX(20px) translateY(-20px) rotate(30deg); opacity:0} }

        input::placeholder, textarea::placeholder { color: var(--text3); }

        /* Contact row icon lift on hover */
        .contact-row:hover .contact-icon {
          transform: rotate(-8deg) scale(1.15) !important;
          background: rgba(0,229,255,0.14) !important;
        }

        /* Spinner */
        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Send icon wiggle on button hover */
        .submit-btn:hover .send-icon {
          animation: send-fly 0.4s ease forwards;
        }
        .submit-btn:active {
          transform: scale(0.97) !important;
        }

        /* Shimmer sweep on submit button */
        .btn-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
          background-size: 200% 100%;
          background-position: -100% 0;
          pointer-events: none;
          border-radius: inherit;
          transition: background-position 0s;
        }
        .submit-btn:hover .btn-shimmer {
          background-position: 200% 0;
          transition: background-position 0.6s ease;
        }
      `}</style>
    </div>
  );
}
