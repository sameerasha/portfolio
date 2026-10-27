# Cinematic 3D Full-Stack Developer Portfolio

A production-quality, art-directed developer portfolio built for an **Experienced Full Stack Developer** targeting senior engineering positions. Features dual dark/light cinematic visual themes, inertia-damped smooth scrolling, real-time 3D system architecture topology, strict data decoupling, and deep architectural case studies.

---

## 1. Quick Start

### Prerequisites
- Node.js `20.x` or higher (tested on Node `v24.5.0`)
- npm `10.x` or higher

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# The website will be available at http://localhost:5173/
```

### Production Build & Preview
```bash
# Type-check and compile optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 2. Dual Themes (Dark & Light)

The site features tailored art direction for both lighting environments:

- **Dark Theme (Default)**: Deep obsidian & charcoal (`#07090e`), electric-cyan (`#38bdf8`) key light, indigo-violet (`#818cf8`) rim lighting, dark volumetric fog, and satin obsidian metallic shaders.
- **Light Theme**: Pure alabaster & slate-50 (`#f8fafc`), high-contrast slate-900 typography, royal electric-blue accents, soft diffused studio lighting, liquid titanium metallic shaders, and bright fog (`#f1f5f9`).
- **Theme Switcher**: One-click Sun/Moon toggle in the navigation bar with persistent `localStorage` memory and OS system-preference detection (`prefers-color-scheme`).

---

## 3. Cinematic Smooth Scrolling & Animation

- **Lenis Inertia Scrolling**: Implements inertia-damped smooth scrolling (`duration: 1.15s`, exponential easing) synchronized directly with the GSAP ticker.
- **GSAP ScrollTrigger Reveal Animations**: Page sections, focus cards, and project case studies trigger subtle upward reveals (`opacity: 0, y: 32` -> `opacity: 1, y: 0`) as they enter the viewport.
- **Top Scroll Progress Indicator**: Real-time gradient progress bar at the top of the viewport.
- **Floating Back to Top Button**: Automatically appears after scrolling 400px with a smooth scroll-to-top transition.
- **Accessibility**: Automatically disables inertia and transitions if the user has `prefers-reduced-motion: reduce` configured in their OS.

---

## 4. Central Data Architecture (`src/data/profile.ts`)

All content, biography, skills, project specs, career timelines, and social links are centralized in a single configuration file:
👉 **[`src/data/profile.ts`](./src/data/profile.ts)**

**You never need to edit JSX or presentation components.** Simply edit `profile.ts` to customize:

| Field | Description | Current State |
| :--- | :--- | :--- |
| `name` | Your full legal or professional name | Neutral fallback: `"Full Stack Developer"` |
| `targetRole` | Target position | `"Full Stack Developer"` |
| `email` | Primary contact channel | `rabinarayanasha@gmail.com` |
| `socialLinks.github` | GitHub profile URL | `null` (Sign-up helper active) |
| `socialLinks.linkedin` | LinkedIn profile URL | `null` (Sign-up helper active) |
| `resume.available` | Toggle for resume download | `false` (Drop PDF in `/public` to enable) |
| `experience` | Verified employment history | Clearly labeled editable placeholders |
| `education` | University degrees & credentials | Editable data records |
| `skills` | Skills taxonomy | 9 confirmed core skills + complementary skills |

---

## 5. Featured Architectural Case Studies

The portfolio features 3 detailed demonstration systems designed to demonstrate full-stack engineering depth:

1. **Enterprise Inventory & Order Management Platform**: Spring Boot 3, React 19 TypeScript, PostgreSQL ACID transactions, OpenAPI 3.0, and Docker Compose.
2. **Cloud-Native Order Processing Microservices**: Autonomous service boundaries, circuit breaking, `/actuator/health` probes, and AWS ECS Fargate blueprints.
3. **Automated CI/CD & Cloud Deployment Workflow**: Maven build matrix, container security, least-privilege AWS IAM OIDC, and automated rollback hooks.

Click **"Inspect Architecture & Specs"** on any project in the UI to view the component breakdown, REST endpoints, and `docker-compose.yml`.

---

## 6. Pre-Launch Configuration Checklist

Before sharing this portfolio with recruiters or deploying to production, complete this checklist in `src/data/profile.ts`:

- [ ] **Name**: Replace `""` with your actual full name.
- [ ] **GitHub**: If you don't have an account, create one at [github.com/signup](https://github.com/signup). Then set `socialLinks.github = "https://github.com/your-username"`.
- [ ] **LinkedIn**: If you don't have an account, create one at [linkedin.com/signup](https://www.linkedin.com/signup). Then set `socialLinks.linkedin = "https://linkedin.com/in/your-handle"`.
- [ ] **Resume**: Place your PDF file in the `public/` directory (e.g. `public/resume.pdf`), then set `resume.available = true` and `resume.url = "/resume.pdf"`.
- [ ] **Experience**: Replace placeholder employer names, roles, and dates in `profileData.experience` with your verified career history.
- [ ] **Education & Certifications**: Add your university, degree, graduation year, and any cloud certifications (AWS, Java, etc.).
