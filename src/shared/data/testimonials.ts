export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  context?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "In fifteen years of running EC Infosolutions I've worked with a lot of developers. Neelesh is one of the very few I'd hand a client-facing build to and not feel the need to check in for weeks. He's owned production apps across wellness, social, and e-commerce for us, and quietly raised the bar for the rest of the mobile team along the way.",
    author: "Sushant Bhalerao",
    role: "Founder, EC Infosolutions",
    context: "15+ years building tech for startups & enterprises",
  },
  {
    quote:
      "Working with Neelesh on the Soul33 upgrades was the easiest part of running those sprints. He'd come into planning with realistic estimates, surface dependencies before they became blockers, and consistently land what he committed to by the demo. The 0.71 to 0.82 jump could have eaten a quarter — it didn't, and that's mostly down to him.",
    author: "Asma Mulla",
    role: "Scrum Master, EC Infosolutions",
    context: "Soul33 — React Native upgrade & New Architecture rollout",
  },
  {
    quote:
      "We came to Neelesh with a pretty ambitious brief — a yoga social app with reels, live classes, and a community feed — and he figured most of it out without us having to micromanage. Updates were steady, the timeline didn't slip, and the app shipped close to what we'd pitched in our very first calls. That part honestly almost never happens.",
    author: "Piyush Vijayvargiyaa",
    role: "Client — Yoke Yoga",
    context: "Social wellness & live yoga platform",
  },
  {
    quote:
      "Neelesh was one of those rare hires who ships and teaches at the same time. He owned our digital business card platform end-to-end on Next.js, then ran React Native sessions for the rest of the team in parallel. If he said something would land Friday, it landed Friday — that part stuck with me long after he moved on.",
    author: "Yagnesh Modh",
    role: "Founder & CEO, The Special Character Pvt Ltd",
    context: "Next.js SaaS build + React Native training programme",
  },
];

export default testimonials;
