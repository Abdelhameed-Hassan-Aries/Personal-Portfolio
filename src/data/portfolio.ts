// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — Abdelhameed Hassan
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Abdelhameed Hassan",
  initials: "AH",
  title: "Senior Frontend Engineer",
  email: "abdelhameed.hs0@gmail.com",
  github: "https://github.com/Abdelhameed-Hassan-Aries",
  linkedin: "https://www.linkedin.com/in/abdelhameed-hassan/?locale=en_US",
  twitter: "",
  location: "Cairo, Egypt · Open to Remote",
  available: true,
};

export const heroData = {
  greeting: "Hello, I'm",
  name: "Abdelhameed Hassan",
  roles: [
    "Senior Frontend Engineer",
    "Shopify Expert",
    "React Ecosystem Specialist",
    "E-Commerce Architect",
    "UI/UX Craftsman",
  ],
  tagline:
    "I turn complex business requirements into high-performance, pixel-perfect web experiences — with a deep mastery of Shopify, React, and modern frontend engineering.",
  cta: {
    primary: "My Journey",
    secondary: "Get In Touch",
  },
};

export const aboutData = {
  bio: [
    "I'm a Senior Frontend Engineer with 5+ years of experience building scalable, high-performance web applications. I bridge the gap between complex business requirements and intuitive, responsive interfaces — with a special focus on Shopify storefronts, the React ecosystem, and accessible UI engineering.",
    "My background in Mechatronics Engineering gives me a unique systems-thinking edge: I design solutions end-to-end, from embedded hardware to cloud infrastructure to polished UIs. Currently leading Shopify development for international brands at Tante-e, remotely from Cairo.",
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 5, suffix: "", label: "Companies" },
    { value: 20, suffix: "+", label: "Technologies" },
    { value: 100, suffix: "%", label: "Pixel Perfect" },
  ],
  highlights: [
    "Shopify Liquid, Metafields & checkout customisation",
    "React, Next.js, Angular & React Native",
    "GraphQL architecture & AI feature integration",
    "AWS, Docker, Terraform & CI/CD pipelines",
    "Chrome Extension development with SlateJS",
    "Accessibility (WCAG) & Core Web Vitals optimisation",
  ],
};

export const skillsData = {
  categories: [
    {
      name: "Frontend",
      icon: "Monitor",
      color: "#6366f1",
      gradient: "from-indigo-500 to-violet-500",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Angular",
        "HTML5 / CSS3",
        "SCSS",
        "React Native",
        "Ionic",
      ],
    },
    {
      name: "Shopify & E-commerce",
      icon: "ShoppingBag",
      color: "#06b6d4",
      gradient: "from-cyan-500 to-blue-500",
      skills: [
        "Shopify Liquid",
        "Metafields",
        "Theme Dev",
        "Checkout Customisation",
        "GTM",
        "Klaviyo",
        "UserWay",
        "SlateJS",
      ],
    },
    {
      name: "Cloud & DevOps",
      icon: "Cloud",
      color: "#a78bfa",
      gradient: "from-violet-500 to-purple-600",
      skills: [
        "AWS (EC2, S3, Lambda)",
        "Docker",
        "Terraform",
        "CI/CD",
        "Bitrise",
        "GitHub Actions",
        "BitBucket",
        "Node.js",
      ],
    },
    {
      name: "Craft & Tools",
      icon: "Wrench",
      color: "#f59e0b",
      gradient: "from-amber-500 to-orange-500",
      skills: [
        "GraphQL",
        "Embedded C",
        "Figma",
        "JIRA",
        "Chrome Extensions",
        "PlatformIO",
        "Accessibility",
        "System Design",
      ],
    },
  ],
};

// ── Highlights section ──────────────────────────────────────
// Replaces the Projects section — honest, achievement-led cards
// drawn from real experience across all roles.
export const highlightsData = {
  headline: "Key Highlights",
  subtitle:
    "A career built inside product teams — here are the moments that mattered.",
  domains: [
    {
      id: "shopify",
      label: "Shopify & E-Commerce",
      color: "#06b6d4",
      gradient: "from-cyan-900/60 to-blue-900/40",
      borderColor: "rgba(6,182,212,0.25)",
      icon: "🛍️",
      company: "Tante-e · 2024–Present",
      achievements: [
        "Leading end-to-end Shopify storefront development for international brands",
        "Pixel-perfect Liquid + SCSS implementations of complex client designs",
        "Metafield-driven dynamic content enabling scalable store features",
        "Advanced product filtering, variant logic & bespoke checkout customisations",
        "Third-party integrations: GTM, Klaviyo, UserWay (accessibility)",
        "Performance optimisation & WCAG compliance across all storefronts",
      ],
    },
    {
      id: "ai",
      label: "AI Feature Engineering",
      color: "#a78bfa",
      gradient: "from-violet-900/60 to-purple-900/40",
      borderColor: "rgba(167,139,250,0.25)",
      icon: "🤖",
      company: "Adam.AI · 2022–2024",
      achievements: [
        "Implemented AI features directly inside the live meeting room experience",
        "Built full AI integration: meeting recordings auto-transcribed & summarised post-meeting",
        "Developed the universal search — find any item across the entire application",
        "Architected the company-wide GraphQL query & mutation paradigm",
        "Revamped the entire internal design system in collaboration with the design team",
        "Mentored junior devs, led PR reviews, drove feature planning sessions",
      ],
    },
    {
      id: "extension",
      label: "Chrome Extension & Editor",
      color: "#6366f1",
      gradient: "from-indigo-900/60 to-violet-900/40",
      borderColor: "rgba(99,102,241,0.25)",
      icon: "✏️",
      company: "NOMO · 2022–Sep 2022",
      achievements: [
        "Built a fully customisable rich-text editor with SlateJS from the ground up",
        "Shipped the extension on the Chrome Web Store, integrated directly into Gmail compose",
        "Developed custom editor plugins for special commands & power-user workflows",
        "Integrated Giphy & Unsplash APIs for instant in-editor image insertion",
        "Built the companion Next.js web app for reusable email template management",
        "Automated Chrome Store publishing — zero-touch releases via CI/CD pipelines",
      ],
    },
    {
      id: "mobile",
      label: "Mobile & Multi-Platform",
      color: "#f59e0b",
      gradient: "from-amber-900/60 to-orange-900/40",
      borderColor: "rgba(245,158,11,0.25)",
      icon: "📱",
      company: "WeXcute · 2021–2022",
      achievements: [
        "Translated UI/UX wireframes into pixel-perfect SPAs with React & Angular",
        "Implemented the full mobile UI for Lina App on iOS & Android with Ionic",
        "Built automated Bitrise pipelines — reduced app deployment time by over 90%",
        "Delivered SPAs, responsive UIs, and API integrations across multiple client projects",
        "Owned CI/CD configuration, JIRA planning & cross-team collaboration",
      ],
    },
    {
      id: "fullstack",
      label: "Full-Stack & Embedded",
      color: "#10b981",
      gradient: "from-emerald-900/60 to-teal-900/40",
      borderColor: "rgba(16,185,129,0.25)",
      icon: "⚙️",
      company: "BaddelOnline · 2020–2021",
      achievements: [
        "Worked across client, server, and embedded layers simultaneously",
        "Built a scalable Node.js app running on Raspberry Pi (edge compute)",
        "Provisioned AWS infrastructure (EC2, S3, ECR, Lambda, DynamoDB) via Terraform",
        "Dockerised the entire project and wrote docker-compose for service orchestration",
        "Implemented OTA CI/CD pipelines for zero-downtime deployments",
        "Wrote embedded C firmware on ATmega32 and designed the physical circuit board",
      ],
    },
  ],
};

export const experienceData = [
  {
    role: "Senior Frontend Engineer",
    company: "Tante-e",
    companyUrl: "https://tante-e.com",
    period: "Nov 2024 — Present",
    location: "Cologne, Germany · Remote",
    description:
      "Leading end-to-end Shopify development for international brands — from custom storefront builds to performance optimisation and accessibility. Implementing Metafield-driven dynamic content, advanced UI components, and third-party integrations (GTM, Klaviyo, UserWay).",
    tech: [
      "Shopify Liquid",
      "JavaScript",
      "SCSS",
      "GTM",
      "Klaviyo",
      "Metafields",
    ],
    highlight: "International brand storefronts",
  },
  {
    role: "Senior Frontend Engineer",
    company: "Adam.AI",
    companyUrl: "https://adam.ai",
    period: "Sep 2022 — Oct 2024",
    location: "San Francisco Bay Area, USA · Hybrid",
    description:
      "Drove the next-generation rebuild of the adam.ai platform. Architected the GraphQL query & mutation paradigm, led the full design system revamp in collaboration with the design team, and implemented cutting-edge AI features including real-time meeting transcription and summarisation.",
    tech: ["React", "TypeScript", "GraphQL", "Design System", "AI"],
    highlight: "Design system & AI features",
  },
  {
    role: "Frontend Engineer",
    company: "NOMO",
    companyUrl: "https://www.linkedin.com/company/nomo-app/",
    period: "Feb 2022 — Sep 2022",
    location: "Cairo, Egypt",
    description:
      "Built a fully customisable SlateJS-based editor integrated with Gmail compose as a Chrome Extension. Developed custom editor plugins, integrated Giphy & Unsplash APIs, built the companion Next.js web app for template management, and wrote automated Chrome Store publishing pipelines.",
    tech: ["Next.js", "SlateJS", "Chrome Extension", "TypeScript", "CI/CD"],
    highlight: "Chrome Store published",
  },
  {
    role: "Frontend Engineer",
    company: "WeXcute",
    companyUrl: "https://wexcute.com/en",
    period: "Jul 2021 — Feb 2022",
    location: "Cairo, Egypt",
    description:
      "Translated UI/UX wireframes into pixel-perfect, responsive SPAs using React and Angular. Implemented the mobile UI for Lina App (iOS & Android) with Angular/Ionic, and built automated Bitrise pipelines that reduced mobile deployment time by over 90%.",
    tech: ["React", "Angular", "Ionic", "Bitrise", "SCSS"],
    highlight: "90% deployment time reduction",
  },
  {
    role: "Software Engineer",
    company: "BaddelOnline",
    companyUrl: "https://www.baddelonline.com/",
    period: "Oct 2020 — Jul 2021",
    location: "Cairo, Egypt",
    description:
      "Full-stack engineer across client, server, and embedded layers. Built a scalable Node.js app on Raspberry Pi, provisioned AWS infrastructure (EC2, S3, ECR, Lambda, DynamoDB) via Terraform, dockerised the entire project, implemented OTA CI/CD pipelines, wrote embedded C on PlatformIO, and designed the hardware circuit board.",
    tech: [
      "Node.js",
      "Embedded C",
      "AWS",
      "Docker",
      "Terraform",
      "Raspberry Pi",
    ],
    highlight: "Client + Server + Embedded",
  },
];
