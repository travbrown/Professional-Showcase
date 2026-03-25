import matter from "gray-matter";
import { marked } from "marked";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  order: number;
  repoUrl: string;
  liveUrl?: string;
  image?: string;
  body: string;
  slug: string;
  visibility?: "public" | "private" | "nda";
  company?: string;
}

/** Convert a title to a URL-safe slug. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const GITHUB_USER = "travbrown";
const API = "https://api.github.com";

/** Projects from private repos or external sources that can't be fetched via the GitHub API. */
const STATIC_PROJECTS: Project[] = [
  {
    title: "Rebuild JA",
    slug: "rebuild-ja",
    description:
      "Jamaica's first proactive disaster coordination platform — geo-tagging 2,500+ communities to ensure equitable aid distribution after Hurricane Melissa.",
    tags: ["React", "TypeScript", "Supabase", "Leaflet", "i18n", "Tailwind CSS"],
    featured: true,
    order: 1,
    repoUrl: "",
    liveUrl: "https://rebuild-ja.com",
    visibility: "private",
    body: `
<p>In the wake of Hurricane Melissa, I led a volunteer team of 12 to build a national disaster coordination platform from scratch &mdash; geo-tagging 2,500+ communities and going from idea to live platform in under two weeks.</p>

<h2>The Problem No One Was Solving</h2>

<p>Late October 2025. Hurricane Melissa &mdash; one of the strongest hurricanes ever recorded globally &mdash; had just devastated Jamaica. The damage was catastrophic: $8.9 billion in losses, according to Prime Minister Andrew Holness. Fifty percent of the country was impacted. Nearly half of Jamaica&rsquo;s GDP was destroyed.</p>

<p>In the days that followed, social media became the de facto coordination tool. People flooded feeds with real-time updates, pleas for help, and videos of destruction.</p>

<p>But social media has a fatal flaw: it optimizes for visibility, not equity.</p>

<p>Communities on main roads &mdash; the ones that were easy to reach and already had social media presence &mdash; got flooded with aid. People would drive in, see someone in need, and give away everything they had on the spot. Meanwhile, rural communities &mdash; the ones up in the hills, off the beaten path &mdash; received nothing.</p>

<p>Two weeks after the hurricane, I watched videos of people visiting remote areas where residents said: &ldquo;This is the first time we&rsquo;ve seen anyone.&rdquo;</p>

<p>The problem wasn&rsquo;t that Jamaicans didn&rsquo;t care. The problem was coordination. Aid workers and volunteers didn&rsquo;t know what communities existed, where they were, or what their status was. They were flying blind, and the people who needed help most were invisible.</p>

<p>That&rsquo;s when I realized: we needed a way to see every community at a glance &mdash; not just the ones that went viral.</p>

<h2>From Idea to Proof of Concept in 48 Hours</h2>

<p>I started pulling data from everywhere I could &mdash; government records, parish maps, community listings, anywhere that had a name and a rough location. Within two days, I had a working proof of concept: a map of Jamaica with 2,500+ communities pinned on it, each one tagged with its parish, coordinates, and (where available) status.</p>

<p>The early version was rough. But it already did something no existing tool could: it made invisible communities visible. You could zoom into a parish and see every community &mdash; not just the ones on the news.</p>

<h2>Assembling the Team</h2>

<p>I put out a call on social media and within days had 12 volunteers &mdash; designers, developers, data folks, people who just wanted to help. We set up a Discord, divided into squads, and started building for real.</p>

<p>The stack was React + TypeScript on the frontend, Supabase on the backend, and Leaflet for the mapping layer. We added i18n early because Jamaica has a strong Patois-speaking population and we didn&rsquo;t want language to be a barrier. Tailwind CSS kept us moving fast on the UI.</p>

<h2>The Hard Parts</h2>

<p>Geo-tagging 2,500+ communities sounds straightforward until you realize that many of these places don&rsquo;t have standardized coordinates. Some communities share names across parishes. Some don&rsquo;t appear on Google Maps at all. We ended up building a data pipeline that cross-referenced multiple sources, flagged conflicts, and let human reviewers make final calls.</p>

<p>The other hard part was keeping the team aligned while moving at emergency speed. We were all volunteers. Nobody was getting paid. People had day jobs. But the urgency was real &mdash; every day without a coordination tool meant more communities getting overlooked. We shipped updates daily, sometimes multiple times a day.</p>

<h2>What We Built</h2>

<p>The final platform lets anyone &mdash; aid workers, government officials, everyday Jamaicans &mdash; see every community on the island, filter by parish, view status updates, and report conditions on the ground. It&rsquo;s a living map: as reports come in, the picture gets clearer.</p>

<p>Key features:</p>
<ul>
  <li><strong>Interactive map</strong> with 2,500+ geo-tagged communities across all 14 parishes</li>
  <li><strong>Status tracking</strong> &mdash; communities can be marked as unaffected, affected, critical, or receiving aid</li>
  <li><strong>Bilingual support</strong> &mdash; English and Jamaican Patois</li>
  <li><strong>Mobile-first design</strong> &mdash; because most Jamaicans access the internet on their phones</li>
  <li><strong>Open reporting</strong> &mdash; anyone can submit a status update for their community</li>
</ul>

<h2>Impact</h2>

<p>Rebuild JA went live less than two weeks after Hurricane Melissa. It was shared across Jamaican social media, picked up by local organizations, and used by aid coordinators to identify underserved areas. The platform demonstrated that with the right data and the right tools, you can close the gap between visibility and equity in disaster response.</p>

<p>More than anything, it proved that a small, motivated team can build something meaningful &mdash; fast &mdash; when the stakes are real and the mission is clear.</p>
`,
  },
  {
    title: "AI Search Page",
    slug: "ai-search-page",
    description:
      "Led cross-team delivery of an AI-powered search experience, saving $4M/year by replacing a third-party vendor with Salesforce-native technology.",
    tags: ["AI/ML", "Data Cloud", "Cross-team Leadership", "Search"],
    featured: false,
    order: 10,
    repoUrl: "",
    visibility: "nda" as const,
    company: "Salesforce",
    body: `
<p>Why pay someone else a million dollars a year for keyword search when you <em>are</em> a tech company?</p>

<p>That was the question that kicked off this project. Salesforce was shelling out roughly $1M/yr to Coveo for basic keyword search across internal knowledge articles &mdash; the kind used by employees, partners, and support agents across multiple departments. Coveo did the job: you typed something, it returned results, you could filter. Functional. But it was expensive, it wasn&rsquo;t AI-powered, and it was a third-party dependency sitting in the middle of Salesforce&rsquo;s own ecosystem.</p>

<h2>The Pitch</h2>

<p>The idea was simple on paper: replace Coveo entirely using Salesforce&rsquo;s own stack. Data Cloud for search indexing, AI-powered relevance ranking instead of keyword matching, cross-environment display, and filtering by multiple metrics. Build it in-house, own it forever, stop writing checks to someone else.</p>

<p>The reality was considerably less simple.</p>

<h2>The Real Challenge: People, Not Code</h2>

<p>The hardest part of this project wasn&rsquo;t the technology. It was aligning two separate teams around a unified scope.</p>

<p>We had one team that owned the search infrastructure and another that owned the user-facing experience. Different managers, different priorities, different timelines. Left alone, this is the kind of setup that produces six months of meetings and a project that never ships.</p>

<p>My role was to make sure that didn&rsquo;t happen. I ran regular check-ins with both teams, put together demos and docs that kept everyone looking at the same picture, and &mdash; critically &mdash; drew clear product decision boundaries. When a question came up about scope, there was a defined owner. When a disagreement emerged about priority, we had a process to resolve it. No ambiguity, no delay loops.</p>

<p>It sounds boring. It&rsquo;s the thing that makes projects actually ship.</p>

<h2>What We Built</h2>

<p>The new search page is AI-powered from the ground up. Instead of matching keywords, it understands intent. You can type a natural-language question and get back relevant knowledge articles ranked by actual relevance, not just keyword frequency. The system indexes across multiple environments and lets users filter by department, content type, publish date, and more.</p>

<p>It runs entirely on Salesforce&rsquo;s own infrastructure &mdash; Data Cloud handles the indexing, and the AI layer handles relevance. No external dependencies. No annual vendor contracts. No &ldquo;let me check with Coveo&rdquo; when something breaks.</p>

<h2>Impact</h2>

<p>The numbers tell the story: <strong>$4M/year saved</strong> in third-party contracts. That&rsquo;s not a projection &mdash; that&rsquo;s real money that was being spent and is now not being spent. The search experience is better (AI-powered beats keyword matching every time), it&rsquo;s faster to iterate on (because we own the stack), and it&rsquo;s one less vendor dependency in the ecosystem.</p>

<p>Sometimes the best engineering decision is realizing you already have everything you need.</p>
`,
  },
  {
    title: "Agentforce Observability Platform",
    slug: "agentforce-observability",
    description:
      "Built the first proactive monitoring and testing system for Salesforce's #1 AI Help Agent — an elite team effort that cut incident detection from 8 hours to minutes.",
    tags: ["Grafana", "Splunk", "PagerDuty", "Jenkins", "Heroku", "AI Testing"],
    featured: false,
    order: 11,
    repoUrl: "",
    visibility: "nda" as const,
    company: "Salesforce",
    body: `
<p>How do you test something that never gives the same answer twice?</p>

<p>That&rsquo;s the question our team had to answer when we were brought in to build observability for Salesforce&rsquo;s flagship AI Help Agent &mdash; the one that powers customer interactions across a $3B renewal engine and a $7B sales engine. When it breaks, real money is on the line. And before we showed up, the detection story looked like this: something breaks in production, and roughly eight hours later, someone notices.</p>

<p>Eight hours. For a system serving millions of customers.</p>

<h2>The Team</h2>

<p>We were an elite squad &mdash; lent from our department to the customer support org. First-of-its-kind arrangement at Salesforce. The mission: build a monitoring and testing system that catches problems before customers do.</p>

<h2>The Three-Tier Testing Approach</h2>

<p>The core innovation was a three-tier testing strategy, each layer catching a different class of failure:</p>

<p><strong>Tier 1: Connectivity.</strong> The simplest question &mdash; is the agent even reachable? Can we establish a connection? This catches infrastructure outages, deployment failures, and network issues. Basic, but you&rsquo;d be surprised how often &ldquo;is it on?&rdquo; is the diagnostic that matters.</p>

<p><strong>Tier 2: Single Conversation.</strong> Send a known question &mdash; &ldquo;how do I reset my password?&rdquo; &mdash; and evaluate whether the response makes sense. This catches model degradation, knowledge base issues, and prompt configuration problems. If the agent can&rsquo;t answer a softball, something is wrong.</p>

<p><strong>Tier 3: Dynamic Multi-Turn.</strong> This was the breakthrough. You can&rsquo;t script a realistic conversation with an AI agent because the agent responds differently each time. So we built an AI agent that <em>pretends to be a human</em> &mdash; logging in as a real user, navigating realistic multi-step scenarios, and evaluating whether the Help Agent behaves correctly across an entire conversation.</p>

<p>Tier 3 was the hardest to build and the most valuable. It catches the subtle failures &mdash; the ones where the agent technically responds but gives increasingly unhelpful answers, or gets stuck in a loop, or misunderstands context mid-conversation. These are the failures that frustrate real users and are invisible to simple health checks.</p>

<h2>The Dashboard</h2>

<p>We built the dashboard with two audiences in mind: VPs who want a green/red status at a glance, and engineers who need to drill down into specific failure modes. Grafana on top of Splunk gave us the flexibility to do both &mdash; high-level health indicators up top, detailed logs and traces one click away.</p>

<h2>The Playbook</h2>

<p>A dashboard that shows &ldquo;something is broken&rdquo; is only half the solution. The other half is telling engineers exactly what to do about it. We built a runbook for every failure mode we identified &mdash; each one with clear diagnostic steps, likely root causes, and resolution procedures. When PagerDuty fires an alert at 2 AM, the on-call engineer doesn&rsquo;t have to guess.</p>

<h2>Alerting That Doesn&rsquo;t Cry Wolf</h2>

<p>Alert fatigue kills monitoring systems. If everything pages, nothing pages. We configured thresholds carefully &mdash; alerts only fire if failures persist long enough to indicate a real problem, not a transient blip. Jenkins pipelines and Heroku Schedulers run health checks every five minutes, but the alerting layer smooths out noise before it reaches a human.</p>

<h2>Impact</h2>

<p>Detection and resolution time went from approximately <strong>eight hours to minutes</strong>. That&rsquo;s not incremental improvement &mdash; that&rsquo;s a different category of operational maturity. The Help Agent now has the kind of observability that a system serving millions of customers should have had from day one.</p>

<p>The testing framework &mdash; especially the multi-turn AI-vs-AI approach &mdash; has become a reference architecture for how Salesforce thinks about testing AI agents more broadly. Turns out, the best way to test something unpredictable is with something equally unpredictable.</p>
`,
  },
  {
    title: "Google Engineering Programs",
    slug: "google-engineering-programs",
    description:
      "Engineering Practicum Intern, Tech Exchange Scholar, and Software Product Sprint — three programs that shaped my engineering foundation.",
    tags: ["Angular/Dart", "Java", "Python", "GCP", "UX Research"],
    featured: false,
    order: 12,
    repoUrl: "",
    visibility: "nda" as const,
    company: "Google",
    body: `
<p>Three programs at Google, each one a different angle on what it means to build software at scale.</p>

<h3>Engineering Practicum Intern</h3>
<p><em>May &ndash; August 2019 &middot; Venice, CA</em></p>

<p>Built internal web tools to improve the workflow of the Quality Ads Team using Angular/Dart, Java, and Python. The tools increased average client turnover rate by 500%. Designed the web layout based on UX research, making agents 300% faster at their core tasks. Developed a template search feature that reduced search time from minutes to seconds.</p>

<h3>Tech Exchange Scholar</h3>
<p><em>January &ndash; May 2020 &middot; Sunnyvale, CA</em></p>

<p>One of 40 scholars chosen to live in Silicon Valley and learn at Google HQ. Coursework taught by Google engineers: Applied Data Structures &amp; Algorithms, Software Development Studio, Human-Computer Interaction, Database Systems, and Product Management.</p>

<h3>Software Product Sprint Participant</h3>
<p><em>June &ndash; August 2020 &middot; Remote</em></p>

<p>Collaborated with a team to design and implement a web application using Java, JavaScript, and HTML/CSS, leveraging GCP APIs including App Engine and Datastore. Practiced industry best practices: open source contributions, code reviews, and distributed development.</p>
`,
  },
  {
    title: "XPRSV",
    slug: "creative-portfolio",
    description: "Creative portfolio — photography and short films.",
    tags: ["React", "Cloudinary", "Photography", "Film"],
    featured: true,
    order: 0,
    repoUrl: "https://github.com/travbrown/creative-portfolio",
    liveUrl: "https://xprsv.vercel.app",
    visibility: "public",
    body: `<p>A space dedicated to the art of seeing. Photography served through Cloudinary with a randomized masonry gallery that reshuffles on every visit. Films presented in a custom lightbox with YouTube embeds. Cinematic full-screen video background on the landing page. Skeleton loading for smooth perceived performance. Dark/light theme support throughout.</p>`,
  },
  {
    title: "LinkMi",
    slug: "linkmi",
    description: "Everything Linktree charges for. Free. Open source.",
    tags: ["Vanilla JS", "Vite", "Open Source", "CSS Animations"],
    featured: true,
    order: 2,
    repoUrl: "https://github.com/travbrown/linkmi",
    liveUrl: "https://linkmi-blush.vercel.app",
    visibility: "public",
    body: `<p>LinkMi is a free, open-source link-in-bio alternative that gives away every feature Linktree locks behind a paywall. Custom themes, click analytics, link scheduling, social icons, SEO metadata, and more &mdash; all driven by a single config file with zero framework overhead.</p>

<h3>Why It Exists</h3>
<p>Linktree charges $5-24/month for features that are trivially simple. A link page is just a single HTML page with links. LinkMi&rsquo;s philosophy: the tools around it should be just as simple.</p>

<h3>Key Features</h3>
<ul>
  <li><strong>Config-Driven</strong> &mdash; One JavaScript file controls all links, themes, and metadata. No database, no admin panel</li>
  <li><strong>Animated Visual Effects</strong> &mdash; Aurora backgrounds, particle constellation effects, 3D card interactions, and shimmer text</li>
  <li><strong>Privacy-First Analytics</strong> &mdash; Click tracking, referrer data, and device breakdown with no cookies and no consent banners</li>
  <li><strong>Mobile-First</strong> &mdash; Designed for the screen it&rsquo;s actually viewed on (90%+ traffic comes from in-app browsers)</li>
  <li><strong>Self-Hosted</strong> &mdash; Own your data. Deploy to Vercel, Netlify, or Cloudflare Pages in minutes</li>
  <li><strong>Zero Framework</strong> &mdash; Pure vanilla JavaScript. Sub-second load times, no bloat</li>
</ul>

<h3>Technical Highlights</h3>
<p>Static site built with Vite. No framework dependencies &mdash; just clean vanilla JS with CSS animations. Config file is version-controlled and portable. Fork it, edit the config, deploy. MIT licensed.</p>`,
  },
  {
    title: "Native Nomads",
    slug: "native-nomads",
    description: "Marketing site for a global creative agency connecting artists, culture keepers, and storytellers across borders.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    featured: true,
    order: 3,
    repoUrl: "https://github.com/travbrown/native-nomads",
    liveUrl: "https://native-nomads.vercel.app",
    visibility: "public",
    body: `<p>Native Nomads is the marketing website for a global creative agency and digital connector platform. It serves artists, culture keepers, practitioners, and storytellers who want to explore the world while building sustainable income through collaborations, experiences, and storytelling.</p>

<h3>Key Features</h3>
<ul>
  <li><strong>Immersive Hero Section</strong> &mdash; Full-viewport hero with parallax imagery, custom typography, and the tagline &ldquo;Live globally. Connect deeply. Move with meaning.&rdquo;</li>
  <li><strong>Visual Storytelling Layout</strong> &mdash; Multi-column asymmetric grid with overlapping image compositions and grain texture overlays</li>
  <li><strong>YouTube Integration</strong> &mdash; Dedicated section promoting the Native Nomads channel</li>
  <li><strong>Community Signup</strong> &mdash; Email list signup via Google Forms for funding opportunities, residency calls, collab projects, and exclusive content drops</li>
  <li><strong>Custom Typography System</strong> &mdash; Four font families create a distinct editorial feel</li>
  <li><strong>Performance Optimized</strong> &mdash; Next.js Image component with responsive sizing and Vercel Analytics</li>
</ul>

<h3>Technical Highlights</h3>
<p>Built with Next.js 16, React 19, and TypeScript on Tailwind CSS 4. Uses the App Router with custom font optimization via next/font. Deployed on Vercel with built-in analytics. Fully responsive with mobile-first breakpoints.</p>`,
  },
];

async function fetchJSON(url: string) {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "xprsn-portfolio",
    };

    if (import.meta.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchShowcaseProjects(): Promise<Project[]> {
  const repos = await fetchJSON(
    `${API}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
  );

  if (!repos || !Array.isArray(repos)) return [...STATIC_PROJECTS];

  const projects: Project[] = [];

  const checks = repos
    .filter((r: any) => !r.fork)
    .map(async (repo: any) => {
      const file = await fetchJSON(
        `${API}/repos/${GITHUB_USER}/${repo.name}/contents/SHOWCASE.md`
      );

      if (!file || !file.content) return;

      const raw = atob(file.content.replace(/\n/g, ""));
      const { data, content } = matter(raw);

      projects.push({
        title: data.title || repo.name,
        description: data.description || repo.description || "",
        tags: data.tags || [],
        featured: data.featured ?? false,
        order: data.order ?? 99,
        repoUrl: repo.html_url,
        liveUrl: data.live_url || repo.homepage || undefined,
        image: data.image || undefined,
        body: await marked.parse(content),
        slug: repo.name,
        visibility: repo.private ? "private" : "public",
      });
    });

  await Promise.all(checks);

  const staticSlugs = new Set(STATIC_PROJECTS.map((p) => p.slug));
  const uniqueGithubProjects = projects.filter((p) => !staticSlugs.has(p.slug));

  return [...STATIC_PROJECTS, ...uniqueGithubProjects].sort((a, b) => a.order - b.order);
}
