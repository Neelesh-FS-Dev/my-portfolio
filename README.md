# 🚀 Neelesh Yadav - Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and experience as a React Native & React Developer.

**Live Demo:** [neeleshyadav.vercel.app](https://neeleshyadav.vercel.app)

## 👨‍💻 About Me

Passionate React Native Developer with **3+ years** of experience building cross-platform mobile and web applications. Specialized in creating high-performance applications using TypeScript, Redux, Firebase, and REST APIs.

- **Location:** Pune, Maharashtra, India
- **Email:** neeleshy263@gmail.com
- **GitHub:** [Neelesh-FS-Dev](https://github.com/Neelesh-FS-Dev)
- **LinkedIn:** [Neelesh Yadav](https://www.linkedin.com/in/neeleshyadav/)

## ✨ Features

- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Built with Framer Motion for smooth animations
- 📊 **GitHub Contributions** - Real-time GitHub activity visualization
- 📝 **Blog Section** - Technical articles and insights
- 💼 **Projects Showcase** - Portfolio of completed projects with live demos
- 🧵 **Experience Timeline** - Career journey and work experience
- 🎓 **Education** - Academic background and certifications
- 📞 **Contact Form** - Get in touch with integrated email API

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, React Router
- **Styling:** Plain CSS with custom properties (no CSS framework)
- **Animations:** Framer Motion
- **3D:** Three.js (lazy-loaded phone mockup on the hero)
- **SEO:** react-helmet-async, prerender script, JSON-LD schema
- **Icons:** Lucide React, React Icons
- **Deployment:** Vercel
- **Backend API:** Vercel Functions (contact form, GitHub contributions, OG image)

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- Yarn (this project uses yarn — `package-lock.json` is intentionally absent)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Neelesh-FS-Dev/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

   The site will be available at `http://localhost:3000`

4. **Build for production**

   ```bash
   yarn build
   ```

   Runs sitemap generation → Vite build → SEO prerender.

5. **Preview production build**

   ```bash
   yarn preview
   ```

6. **Other useful scripts**

   ```bash
   yarn typecheck     # tsc across app, node, and api projects
   yarn lint          # ESLint
   yarn analyze       # Build with rollup-plugin-visualizer for bundle stats
   yarn sitemap       # Regenerate sitemap.xml only
   yarn validate:seo  # SEO validation
   ```

## 📁 Project Structure

The codebase follows a **feature-based architecture** — each route/domain owns its components, data, types, and helpers. Cross-cutting building blocks live under `shared/`.

```text
src/
├── app/                          # App shell
│   ├── App.tsx                   # Router & layout
│   ├── main.tsx                  # Vite entry
│   ├── index.css                 # Global styles & CSS variables
│   └── vite-env.d.ts
│
├── features/                     # One folder per domain
│   ├── home/
│   │   ├── Home.tsx              # Page component
│   │   ├── components/           # Hero, About, Skills, FeaturedProjects, GetInTouch
│   │   ├── data/                 # skills.ts
│   │   ├── utils/                # skillIcons.tsx
│   │   └── types.ts
│   │
│   ├── projects/
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── components/           # ProjectCard, ProjectsGrid, ProjectsHero, ProjectsFilterBar
│   │   ├── detail/               # ProjectHero, ScreenshotsSection, FeaturesSection, ...
│   │   ├── data/                 # projects.ts, projectCategories.ts
│   │   ├── utils/                # featureIcons.tsx
│   │   └── types.ts
│   │
│   ├── experience/               # Experience page + JobCard, EducationSection, ...
│   ├── blogs/                    # Blogs + BlogDetail + detail/ subcomponents
│   └── contact/                  # Contact form, hero, info
│
├── shared/                       # Cross-cutting building blocks
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── effects/              # Cursor, Phone3D, PhoneMockup, ParticleNetwork
│   │   └── ui/                   # SEO, LazyImage, RouteSkeletons, GitHubGraph
│   ├── hooks/                    # useMediaQuery, useReveal, useMagnetic
│   ├── data/                     # personal, navLinks, particles, phoneScreens
│   ├── utils/                    # getExperience, vitals
│   └── types.ts                  # Cross-cutting types (Personal, NavLink, GitHub, ...)
│
└── pages/
    └── NotFound.tsx              # Shell-level fallback (not feature-bound)

api/                              # Vercel Functions
├── contact.ts                    # Contact form handler
├── github-contributions.ts       # GitHub GraphQL aggregator
└── og.ts                         # Open Graph image generator

scripts/                          # Build-time helpers
├── generate-sitemap.mjs
├── prerender-seo.mjs
├── validate-seo.mjs
└── seo-routes.mjs                # Shared route table consumed by the above

public/                           # Static assets (images, docs, videos, robots.txt, sitemap.xml)
```

### Architectural conventions

- **No barrel files** — each consumer imports directly from the source (`features/projects/data/projects` rather than a `data/index.ts` re-export). Stops re-export drift cold.
- **Types live with their feature** — `Project` is in `features/projects/types.ts`, `Blog` in `features/blogs/types.ts`. Only truly cross-cutting types live in `shared/types.ts`.
- **Cross-feature imports are allowed but explicit** — e.g. `home/FeaturedProjects` imports `ProjectCard` from `features/projects/components/`, signalling that ProjectCard is a project domain object rather than a generic UI primitive.
- **Pages live inside their feature** — `app/App.tsx` lazy-imports them.

## 🎯 Key Sections

| Section        | Description                                  |
| -------------- | -------------------------------------------- |
| **Home**       | Hero section with introduction and CTA       |
| **Projects**   | Portfolio of completed projects with details |
| **Experience** | Career timeline and work experience          |
| **Blogs**      | Technical articles and insights              |
| **Contact**    | Contact form for inquiries                   |

## 🚀 Deployment

This portfolio is deployed on **Vercel** for optimal performance and continuous integration.

- **Main branch** automatically deploys to production
- **Pull requests** create preview deployments

Deploy your own fork:

1. Push to your GitHub repository
2. Connect to Vercel: [vercel.com/new](https://vercel.com/new)
3. Select your repository and deploy

## 📝 Customization

All content is in TypeScript data modules, co-located with the feature that owns it:

| What                       | File                                              |
| -------------------------- | ------------------------------------------------- |
| Profile / contact / social | `src/shared/data/personal.ts`                     |
| Nav links                  | `src/shared/data/navLinks.ts`                     |
| Projects                   | `src/features/projects/data/projects.ts`          |
| Project filters            | `src/features/projects/data/projectCategories.ts` |
| Work experience            | `src/features/experience/data/experience.ts`      |
| Education / certifications | `src/features/experience/data/education.ts`       |
| Skills                     | `src/features/home/data/skills.ts`                |
| Blog posts                 | `src/features/blogs/data/blogs.ts`                |

Types are defined alongside each data file (e.g. `features/projects/types.ts`).

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

**Built with ❤️ by Neelesh Yadav**
