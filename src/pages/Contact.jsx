import { useState } from "react";
import { personal } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Hi Neelesh,\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`)}`;
    window.location.href = url;
    setSent(true);
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
    transition: "border-color .2s",
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
  };

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      {/* Header */}
      <section
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,229,255,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container">
          <div className="section-label">Get In Touch</div>
          <h1 className="section-title" style={{ marginBottom: 14 }}>
            Let's Build
            <br />
            <span style={{ color: "var(--accent)" }}>Together</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 460,
              lineHeight: 1.75,
            }}
          >
            I'm open to React Native roles, freelance projects, and interesting
            collaborations. Let's talk.
          </p>
        </div>
      </section>

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
          {/* Contact info */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isSmall ? 20 : 24,
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              Contact Info
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 32,
              }}
            >
              {[
                {
                  icon: "✉",
                  label: "Email",
                  value: personal.email,
                  href: `mailto:${personal.email}`,
                },
                {
                  icon: "☎",
                  label: "Phone",
                  value: personal.phone,
                  href: `tel:${personal.phone}`,
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: personal.location,
                  href: null,
                },
                {
                  icon: "⌥",
                  label: "GitHub",
                  value: "github.com/Neelesh-FS-Dev",
                  href: personal.github,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    padding: isSmall ? "14px 16px" : "16px 18px",
                    borderRadius: 14,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    transition: "border-color .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <div
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
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
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
              ))}
            </div>

            {/* Availability badge */}
            <div
              style={{
                padding: "20px",
                borderRadius: 16,
                background:
                  "linear-gradient(135deg,rgba(0,255,136,0.08) 0%,rgba(0,229,255,0.05) 100%)",
                border: "1px solid rgba(0,255,136,0.2)",
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
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--green)",
                    boxShadow: "0 0 8px var(--green)",
                    animation: "pulse 2s infinite",
                    flexShrink: 0,
                  }}
                />
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

          {/* Form */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 22,
              padding: isSmall ? "24px 20px" : isMobile ? "32px" : "40px",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>✅</div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  Email client opened!
                </h3>
                <p
                  style={{
                    color: "var(--text2)",
                    marginBottom: 24,
                    fontSize: 14,
                  }}
                >
                  Your message details are pre-filled. Send it from your email
                  app.
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
                  }}
                >
                  Send a Message
                </h2>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        style={inputBase}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--border)")
                        }
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        style={inputBase}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--border)")
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="React Native opportunity..."
                      style={inputBase}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
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
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      justifyContent: "center",
                      fontSize: 15,
                      marginTop: 4,
                      cursor: "pointer",
                    }}
                  >
                    Send Message ✉
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        input::placeholder,textarea::placeholder{color:var(--text3);}
      `}</style>
    </div>
  );
}
