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
  {
    quote:
      "Reviewing Neelesh's PRs was the part of the week I actually looked forward to. The diffs were small, the commits told a story, and the tricky parts always had a comment explaining the why. Half the patterns I use in my own React Native code now came from picking those reviews apart.",
    author: "Bhargav Sorathiyaa",
    role: "React Native Developer",
    context: "Cross-team mobile reviews & shared component library",
  },
  {
    quote:
      "I joined as a junior front-end dev and Neelesh was the person I learned the most from in my first year. He never made me feel small for asking, but he also never just gave the answer — he'd walk through how he'd debug it, then let me try. By the end of two quarters I was shipping features on my own without needing the safety net.",
    author: "Shagun Garg",
    role: "Frontend Engineer",
    context: "Mentorship & onboarding through React.js feature work",
  },
  {
    quote:
      "We had a Reanimated v3 issue that nobody on the team could nail down — scroll jank on Android only, only on certain screens. Neelesh sat with it for half a day, found a stale shared value on a worklet, and wrote up a one-page note so the rest of us wouldn't hit it again. That note is still pinned in our Slack.",
    author: "Harsh Patel",
    role: "Mobile Engineer",
    context: "React Native performance debugging",
  },
  {
    quote:
      "Most engineers I hand designs to come back with 'good enough'. Neelesh would come back with the spec implemented, the edge cases I forgot about already handled, and a Loom walking through the trade-offs. The hand-off felt like collaboration, not a wall between Figma and the build.",
    author: "Mann Mehta",
    role: "Product Designer",
    context: "Design-to-code collaboration on consumer mobile",
  },
  {
    quote:
      "On the API side, Neelesh was the front-end engineer I trusted most to push back on bad contracts before they shipped. He'd read the schema, sketch the client cache, and surface the gotchas in the same review. Made my job a lot easier — and the apps were faster for it.",
    author: "Nirav Bhanderi",
    role: "Backend Engineer",
    context: "Cross-stack API & client integration",
  },
];

export default testimonials;
