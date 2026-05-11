import { Fragment } from "react";
import personal from "../shared/data/personal";
import experience from "../features/experience/data/experience";
import { degrees, certifications } from "../features/experience/data/education";
import SEO from "../shared/components/ui/SEO";
import { getExperience } from "../shared/utils/getExperience";

/**
 * /resume — a print-styled single-page resume rendered from the same data
 * that powers the rest of the site. Use the browser's "Save as PDF" / print
 * dialog to export. Source of truth = personal.ts + experience.ts +
 * education.ts; no manual sync needed.
 */
const PRINT_STYLES = `
  /* On screen — center on the page, light dark theme */
  .resume-page {
    max-width: 820px;
    margin: 0 auto;
    padding: 56px 48px;
    background: var(--surface);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.55;
    border: 1px solid var(--border);
    border-radius: 14px;
  }
  .resume-wrap {
    padding: 36px 24px 80px;
    background: var(--bg2);
    min-height: calc(100vh - 64px);
  }
  .resume-h1 {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 4px;
    color: var(--text);
  }
  .resume-role { color: var(--text2); font-size: 15px; margin: 0 0 14px; }
  .resume-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: var(--text2);
    margin-bottom: 24px;
  }
  .resume-meta a { color: var(--accent); text-decoration: none; }
  .resume-section { margin-top: 28px; }
  .resume-section-title {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
    border-bottom: 1px solid var(--border);
    padding-bottom: 6px;
    margin-bottom: 14px;
  }
  .resume-job { margin-bottom: 18px; }
  .resume-job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }
  .resume-job-role {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 15px;
    color: var(--text);
  }
  .resume-job-period {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text3);
  }
  .resume-job-company {
    font-family: var(--font-body);
    font-size: 13.5px;
    color: var(--accent);
    margin-bottom: 8px;
  }
  .resume-bullets { padding-left: 18px; margin: 0; }
  .resume-bullets li {
    font-size: 13px;
    line-height: 1.55;
    color: var(--text2);
    margin-bottom: 4px;
  }
  .resume-tech {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text3);
    margin: 6px 0 4px;
  }
  .resume-actions {
    max-width: 820px;
    margin: 0 auto 16px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    font-family: var(--font-mono);
    font-size: 12px;
  }
  .resume-print-btn {
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: 8px;
    padding: 8px 14px;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 11.5px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .resume-print-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* Print rules — strip the UI chrome and force light theme on paper */
  @media print {
    @page { margin: 12mm; size: A4; }
    body { background: #fff !important; }
    nav, footer, .cursor, .cursor-follower, .noise-overlay,
    .scanline-overlay, .resume-actions, .skip-to-content { display: none !important; }
    main { padding: 0 !important; }
    .resume-wrap { padding: 0 !important; background: #fff !important; }
    .resume-page {
      border: none !important;
      max-width: none !important;
      padding: 0 !important;
      background: #fff !important;
      color: #111 !important;
      font-size: 11.5pt;
    }
    .resume-h1, .resume-job-role { color: #000 !important; }
    .resume-role, .resume-meta, .resume-meta a,
    .resume-bullets li, .resume-tech, .resume-job-period,
    .resume-job-company { color: #333 !important; }
    .resume-section-title { color: #1d4ed8 !important; border-bottom-color: #999 !important; }
    .resume-meta a { color: #1d4ed8 !important; }
  }
`;

function formatHandle(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

export default function Resume() {
  const totalExperience = getExperience("2023-01-01");
  const edu = degrees[0];

  return (
    <div className="resume-wrap">
      <SEO
        title={`Resume — ${personal.name}`}
        description={`Printable resume for ${personal.name} — ${personal.title}.`}
        path="/resume"
      />
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      <div className="resume-actions">
        <button
          type="button"
          className="resume-print-btn"
          onClick={() => window.print()}
        >
          Save as PDF / Print
        </button>
      </div>

      <article className="resume-page">
        <header>
          <h1 className="resume-h1">{personal.name}</h1>
          <p className="resume-role">
            {personal.title} · {totalExperience} of experience
          </p>
          <div className="resume-meta">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <span>·</span>
            <a href={`tel:${personal.phone}`}>{personal.phone}</a>
            <span>·</span>
            <span>{personal.location}</span>
            <span>·</span>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              {formatHandle(personal.linkedin)}
            </a>
            <span>·</span>
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              {formatHandle(personal.github)}
            </a>
          </div>
        </header>

        <section className="resume-section">
          <h2 className="resume-section-title">Summary</h2>
          <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>
            {personal.summary}
          </p>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Experience</h2>
          {experience.map((job, idx) => {
            const allTech = [...(job.mobileTech || []), ...(job.webTech || [])];
            return (
              <div key={idx} className="resume-job">
                <div className="resume-job-head">
                  <div className="resume-job-role">{job.role}</div>
                  <div className="resume-job-period">{job.period}</div>
                </div>
                <div className="resume-job-company">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </div>
                {allTech.length > 0 && (
                  <div className="resume-tech">{allTech.join(" · ")}</div>
                )}
                <ul className="resume-bullets">
                  {job.highlights.map((h, hi) => (
                    <li key={hi}>{h}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          <div className="resume-job">
            <div className="resume-job-head">
              <div className="resume-job-role">{edu.degree}</div>
              <div className="resume-job-period">{edu.period}</div>
            </div>
            <div className="resume-job-company">
              {edu.institution} · {edu.location}
            </div>
            {edu.coursework && edu.coursework.length > 0 && (
              <div className="resume-tech">
                Key coursework: {edu.coursework.join(" · ")}
              </div>
            )}
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Certifications</h2>
          <ul className="resume-bullets">
            {certifications.map((c) => (
              <Fragment key={c.name}>
                <li>
                  <strong>{c.name}</strong> — {c.issuer} · {c.year}
                  {c.credentialId ? ` · ID ${c.credentialId}` : ""}
                </li>
              </Fragment>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
