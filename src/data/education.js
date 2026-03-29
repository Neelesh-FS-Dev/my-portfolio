import { FiBook } from "react-icons/fi";

// ═══════════════════════════════════════════════════════════════
//  education.js  ← EDIT THIS FILE to update education & certs
// ═══════════════════════════════════════════════════════════════

export const degrees = [
  {
    degree: "Bachelor of Technology — Computer Science Engineering",
    shortDegree: "B.Tech, Computer Science",
    institution: "Institute of Technology, Nirma University",
    location: "Ahmedabad, Gujarat",
    period: "Jul 2019 – June 2023",
    duration: "4 Years",
    icon: FiBook,
    institutionBadges: [
      "NAAC A+ Accredited",
      "NBA Accredited — CSE",
      "NIRF Top 150 Engineering",
      "Top 10 Private Universities in India",
      "#1 Engineering College in Gujarat",
    ],
    institutionAbout:
      "Institute of Technology, Nirma University is one of India's top-ranked private engineering institutions, consistently placed among the top 150 engineering colleges nationally by NIRF and ranked #1 in Gujarat. The university holds NAAC A+ accreditation (2022) and the CSE programme is NBA accredited under Tier-I. Recruiters include Google, Amazon, Deloitte, Wipro, and Cognizant.",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Object-Oriented Programming",
      "Web Technologies",
      "Software Engineering",
      "Mobile Application Development",
    ],
    activities: [
      "President — ISTE Students' Chapter (2021–22)",
      "Executive Member — ISTE Students' Chapter (2019–21)",
      "Organised 10+ hackathons, workshops & industry speaker sessions for 500+ students",
      "Managed 50+ member volunteer team with end-to-end event ownership",
    ],
  },
];

export const certifications = [
  {
    name: "Algorithmic Toolbox",
    issuer: "Coursera / UC San Diego",
    year: "Nov 2021",
    credentialId: "XTNMD5CG83VY",
    icon: "algo",
    color: "var(--accent)",
  },
  {
    name: "Programming for Everybody (Python)",
    issuer: "Coursera / University of Michigan",
    year: "Oct 2020",
    credentialId: "FMYUVTTL22PK",
    icon: "python",
    color: "var(--accent2)",
  },
  {
    name: "React Native — Professional",
    issuer: "Self / Professional",
    year: "2023",
    credentialId: "",
    icon: "reactnative",
    color: "var(--accent)",
  },
  {
    name: "JavaScript ES6+ Advanced",
    issuer: "Self / Professional",
    year: "2022",
    credentialId: "",
    icon: "javascript",
    color: "var(--accent2)",
  },
];

export const achievements = [
  "Deployed 10+ applications to App Store & Google Play serving 20,000+ active users",
  "Built 5 production React Native apps at EC Info Solutions — each with 4.5+ star ratings",
  "Led end-to-end delivery of Soul33 (15K users), Yoke Yoga (10K users) & Barva Skin Therapie",
  "Reduced app re-renders by 40% through memoisation & architecture optimisation across projects",
  "Migrated Android Java → Kotlin & iOS Obj-C → Swift on CultureMax production app",
  "Trained 50+ developers at The Special Character & 5+ juniors at EC Info Solutions",
  "Consistently delivered 5+ additional features per sprint across all active projects",
  "Elected President of ISTE Students' Chapter — led 500+ member technical community",
];
