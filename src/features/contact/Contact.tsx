import { useIsMobile, useIsSmall } from "../../shared/hooks/useMediaQuery";
import SEO from "../../shared/components/ui/SEO";
import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";

export default function Contact() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <div>
      <SEO
        title="Contact — Neelesh Yadav | Hire a React Native Developer"
        description="Get in touch with Neelesh Yadav for freelance projects, full-time roles, or collaboration. React Native & React Developer based in Pune, India."
        path="/contact"
      />

      <ContactHero isMobile={isMobile} isSmall={isSmall} />

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
          <ContactInfo isSmall={isSmall} />
          <ContactForm isMobile={isMobile} isSmall={isSmall} />
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
          background: rgba(59,130,246,0.14) !important;
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
