import { useEffect, useState, useRef } from "react";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import {
  FiGithub,
  FiGitCommit,
  FiGitPullRequest,
  FiAlertCircle,
  FiLock,
} from "react-icons/fi";

// Compute color level (0–4) from count
function getLevel(count, max) {
  if (count === 0) return 0;
  if (max === 0) return 0;
  const ratio = count / max;
  if (ratio < 0.15) return 1;
  if (ratio < 0.35) return 2;
  if (ratio < 0.65) return 3;
  return 4;
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function GitHubGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load contributions");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Compute max contributions in a day for color scaling
  const maxCount = data
    ? Math.max(
        ...data.calendar.weeks.flatMap((w) =>
          w.contributionDays.map((d) => d.contributionCount),
        ),
      )
    : 0;

  // Build month label positions from weeks
  const monthPositions = [];
  if (data) {
    let lastMonth = null;
    data.calendar.weeks.forEach((week, wi) => {
      const month = new Date(week.contributionDays[0]?.date).getMonth();
      if (month !== lastMonth) {
        monthPositions.push({ wi, label: MONTH_LABELS[month] });
        lastMonth = month;
      }
    });
  }

  // Derive year range from calendar data (last 365 days spans two calendar years)
  const calendarYearRange = (() => {
    if (!data) return null;
    const allDays = data.calendar.weeks.flatMap((w) => w.contributionDays);
    const dates = allDays
      .map((d) => d.date)
      .filter(Boolean)
      .sort();
    if (!dates.length) return null;
    const startYear = new Date(dates[0]).getUTCFullYear();
    const endYear = new Date(dates[dates.length - 1]).getUTCFullYear();
    return startYear === endYear ? `${startYear}` : `${startYear} – ${endYear}`;
  })();

  // Which day-of-week indices (0=Sun…6=Sat) have any contributions
  const daysWithActivity = data
    ? new Set(
        data.calendar.weeks
          .flatMap((w) => w.contributionDays)
          .filter((d) => d.contributionCount > 0)
          .map((d) => new Date(d.date).getDay()),
      )
    : new Set();

  // Days we want to label (all except Thu to match GitHub style)
  const LABELED_DAYS = new Set([0, 1, 2, 3, 4, 5, 6]); // Sun Mon Tue Wed Thu Fri Sat

  const totalPrivate = data
    ? data.accounts.reduce((a, acc) => a + (acc.privateCount || 0), 0)
    : 0;

  const totalCommits = data
    ? data.accounts.reduce((a, acc) => a + acc.commits, 0)
    : 0;

  const totalPRs = data ? data.accounts.reduce((a, acc) => a + acc.prs, 0) : 0;

  const totalIssues = data
    ? data.accounts.reduce((a, acc) => a + acc.issues, 0)
    : 0;

  return (
    <section
      ref={containerRef}
      className="section"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <FiGithub size={20} color="var(--accent)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--accent)",
                letterSpacing: "0.1em",
              }}
            >
              CONTRIBUTIONS
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "8px",
            }}
          >
            GitHub Activity
          </h2>
          <p style={{ color: "var(--text2)", fontSize: "15px" }}>
            Combined contributions across personal & company accounts —
            including private repositories.
          </p>
        </div>

        {/* Account Badges */}
        {data && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            {data.accounts.map((acc, i) => (
              <div
                key={acc.username}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  background: "var(--surface)",
                  border: "1px solid var(--border-bright)",
                  borderRadius: "10px",
                  borderLeft: `3px solid ${i === 0 ? "var(--accent)" : "var(--accent2)"}`,
                }}
              >
                <img
                  src={acc.avatar}
                  alt={acc.name}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "2px solid var(--border-bright)",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: i === 0 ? "var(--accent)" : "var(--accent2)",
                      fontWeight: 600,
                    }}
                  >
                    @{acc.username}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text2)" }}>
                    {acc.totalContributions.toLocaleString()} contributions
                    {acc.privateCount > 0 && (
                      <span
                        style={{ marginLeft: "6px", color: "var(--text3)" }}
                      >
                        ·{" "}
                        <FiLock size={10} style={{ verticalAlign: "middle" }} />{" "}
                        {acc.privateCount} private
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Graph Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: isSmall ? "14px 12px" : isMobile ? "18px" : "24px",
            overflow: "hidden",
          }}
        >
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "120px",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: "2px solid var(--accent)",
                  borderTopColor: "transparent",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <span
                style={{
                  color: "var(--text2)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                }}
              >
                Loading contributions...
              </span>
            </div>
          )}

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--accent3)",
                padding: "16px 0",
              }}
            >
              <FiAlertCircle size={18} />
              <span
                style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
              >
                {error}
              </span>
            </div>
          )}

          {data && (
            <>
              {/* Total count */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    color: "var(--text2)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--green)",
                      fontWeight: 700,
                      fontSize: "15px",
                    }}
                  >
                    {data.calendar.totalContributions.toLocaleString()}
                  </span>{" "}
                  contributions in {calendarYearRange ?? "the last year"}
                </span>
                <div
                  style={{ display: "flex", gap: "4px", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--text3)",
                      marginRight: "4px",
                    }}
                  >
                    Less
                  </span>
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div
                      key={l}
                      style={{
                        width: "11px",
                        height: "11px",
                        borderRadius: "2px",
                        background:
                          l === 0
                            ? "var(--surface2)"
                            : `rgba(0, 255, 136, ${0.15 + l * 0.2})`,
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--text3)",
                      marginLeft: "4px",
                    }}
                  >
                    More
                  </span>
                </div>
              </div>

              {/* Month labels */}
              <div
                className="gh-scroll"
                style={{
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ minWidth: "fit-content" }}>
                  {/* Month row */}
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "28px",
                      marginBottom: "4px",
                      position: "relative",
                      height: "16px",
                    }}
                  >
                    {monthPositions.map(({ wi, label }) => (
                      <div
                        key={wi + label}
                        style={{
                          position: "absolute",
                          left: `${wi * 14}px`,
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--text3)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Grid */}
                  <div
                    style={{
                      display: "flex",
                      gap: "2px",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Day labels */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        marginRight: "4px",
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                        <div
                          key={d}
                          style={{
                            height: "11px",
                            width: "22px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            color:
                              LABELED_DAYS.has(d) && daysWithActivity.has(d)
                                ? "var(--text3)"
                                : "transparent",
                            lineHeight: "11px",
                          }}
                        >
                          {DAY_LABELS[d]}
                        </div>
                      ))}
                    </div>

                    {/* Weeks */}
                    {data.calendar.weeks.map((week, wi) => (
                      <div
                        key={wi}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        {week.contributionDays.map((day, di) => {
                          const level = getLevel(
                            day.contributionCount,
                            maxCount,
                          );
                          return (
                            <div
                              key={di}
                              onMouseEnter={(e) => {
                                const rect = e.target.getBoundingClientRect();
                                setTooltip({ day, x: rect.left, y: rect.top });
                              }}
                              onMouseLeave={() => setTooltip(null)}
                              style={{
                                width: "11px",
                                height: "11px",
                                borderRadius: "2px",
                                cursor: "default",
                                background:
                                  level === 0
                                    ? "var(--surface2)"
                                    : `rgba(0, 255, 136, ${0.15 + level * 0.2})`,
                                transition: "transform 0.1s ease",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.4)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {[
                  {
                    icon: <FiGitCommit size={14} />,
                    label: "Commits",
                    value: totalCommits,
                    color: "var(--accent)",
                  },
                  {
                    icon: <FiGitPullRequest size={14} />,
                    label: "Pull Requests",
                    value: totalPRs,
                    color: "var(--accent2)",
                  },
                  {
                    icon: <FiAlertCircle size={14} />,
                    label: "Issues",
                    value: totalIssues,
                    color: "var(--accent3)",
                  },
                  {
                    icon: <FiLock size={14} />,
                    label: "Private Contributions",
                    value: totalPrivate,
                    color: "var(--text2)",
                  },
                ].map(({ icon, label, value, color }) => (
                  <div
                    key={label}
                    style={{
                      flex: "1 1 120px",
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color,
                        marginBottom: "6px",
                      }}
                    >
                      {icon}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "var(--text)",
                      }}
                    >
                      {value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 44,
            left: tooltip.x - 30,
            background: "var(--surface2)",
            border: "1px solid var(--border-bright)",
            borderRadius: "6px",
            padding: "6px 10px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text)",
            pointerEvents: "none",
            zIndex: 9999,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          <span
            style={{
              color:
                tooltip.day.contributionCount > 0
                  ? "var(--green)"
                  : "var(--text3)",
            }}
          >
            {tooltip.day.contributionCount} contribution
            {tooltip.day.contributionCount !== 1 ? "s" : ""}
          </span>
          {" · "}
          <span style={{ color: "var(--text2)" }}>{tooltip.day.date}</span>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .gh-scroll::-webkit-scrollbar { display: none; }
        .gh-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
