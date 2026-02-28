// ============================================================
// Site Configuration
// ============================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Simon Ting | Senior Product Manager Portfolio",
  description: "Senior Product Manager with 10+ years experience building B2B logistics SaaS platforms, AI automation, and digital transformation solutions.",
  language: "en",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  links: NavLink[];
  searchPlaceholder: string;
  searchHint: string;
  searchAriaLabel: string;
  closeSearchAriaLabel: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Simon Ting",
  links: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "My Day", href: "#day-in-life" },
    { label: "Side Projects", href: "#side-project" },
    { label: "Contact", href: "#contact" },
  ],
  searchPlaceholder: "Search projects, skills...",
  searchHint: "Press Enter to search or ESC to close",
  searchAriaLabel: "Search",
  closeSearchAriaLabel: "Close search",
};

// ============================================================
// Hero Section
// ============================================================

export interface HeroConfig {
  date: string;
  titleLine1: string;
  titleLine2: string;
  readTime: string;
  description: string;
  ctaText: string;
  image: string;
  imageAlt: string;
}

export const heroConfig: HeroConfig = {
  date: "Product Manager & AI Innovator",
  titleLine1: "Building the Future of",
  titleLine2: "Logistics & Automation",
  readTime: "10+ Years Experience",
  description: "Results-driven Senior Product Manager specializing in B2B logistics SaaS platforms, AI-powered automation, and digital transformation. Proven track record driving 40% client adoption increases, 30% delivery error reductions, and 50% MRR growth through data-driven product strategies.",
  ctaText: "View My Work",
  image: "/hero-ai-tech.jpg",
  imageAlt: "AI Technology - Future of Logistics",
};

// ============================================================
// Featured Projects (Horizontal Scroll)
// ============================================================

export interface ArticleItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface LatestArticlesConfig {
  sectionTitle: string;
  articles: ArticleItem[];
}

export const latestArticlesConfig: LatestArticlesConfig = {
  sectionTitle: "Featured Projects",
  articles: [
    {
      id: 1,
      title: "Clockwork Delivery Platform",
      subtitle: "A comprehensive shipment management and driver dispatching platform featuring intelligent load builder and scheduler. The system optimizes delivery assignments, manages driver workflows, and provides real-time visibility into delivery status, ensuring efficient last-mile operations and enhanced customer satisfaction. Worked closely with stakeholders on the design process, prioritizing and adding features based on usability testing and market research to continuously improve the platform.",
      image: "/clockwork-home.jpg",
      category: "SaaS Platform",
    },
    {
      id: 2,
      title: "TMS Integration Hub",
      subtitle: "An enterprise integration solution that connects customer ERP systems with transportation management platforms. Supports multiple integration protocols including EDI, APIs, File transfer / flat files (CSV, XML, etc.), Email parsing with AI automation tools, enabling seamless data exchange for order processing, shipment status synchronization, and real-time tracking updates across the supply chain. Worked directly with customer integration teams to help with data mapping and ensure smooth connectivity between systems.",
      image: "/project-logistics-platform.jpg",
      category: "Integration",
    },
    {
      id: 3,
      title: "Driver Mobile App",
      subtitle: "A multi-role mobile application that empowers drivers to manage deliveries, capture electronic proof of delivery (ePOD), and confirm shipments in real-time. Also supports warehouse staff and receivers in performing goods confirmation, staging, and delivery verification tasks through intuitive role-based interfaces. Constantly enhanced based on direct feedback from drivers and customers, ensuring the app evolves to meet real-world operational needs and user expectations.",
      image: "/project-mobile-app.jpg",
      category: "Mobile Product",
    },
    {
      id: 4,
      title: "Project Logistics Ledger",
      subtitle: "An end-to-end materials tracking system built for a customer managing logistics for a renewable energy company. The platform helps them manage complex moves across construction sites, warehouses, ports, and manufacturing facilities. Features an AI-enhanced shipment builder that recommends optimal shipping configurations based on what is available at each location, streamlining the entire logistics planning process.",
      image: "/project-wms.jpg",
      category: "Supply Chain",
    },
  ],
};

// ============================================================
// About / Skills Section
// ============================================================

export interface EventItem {
  date: string;
  title: string;
  location: string;
}

export interface GridArticle {
  id: number;
  title: string;
  category: string;
  readTime: string;
}

export interface ArtCategoryConfig {
  sectionTitle: string;
  categoriesLabel: string;
  eventsLabel: string;
  categories: string[];
  events: EventItem[];
  featuredImage: string;
  featuredImageAlt: string;
  featuredLabel: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredCtaText: string;
  gridArticles: GridArticle[];
  readSuffix: string;
}

export const artCategoryConfig: ArtCategoryConfig = {
  sectionTitle: "About Me",
  categoriesLabel: "Domain Expertise",
  eventsLabel: "Certifications",
  categories: [
    "AI/ML Automation",
    "Data Analytics",
    "Process Optimization",
    "Digital Transformation",
    "Supply Chain Management",
    "Integration Architecture"
  ],
  events: [
    { date: "2022", title: "Certified ScrumMaster (CSM)", location: "Scrum Alliance" },
  ],
  featuredImage: "/about-tech-new.jpg",
  featuredImageAlt: "Product Strategy and Vision",
  featuredLabel: "Professional Summary",
  featuredTitle: "Driving Digital Transformation in Logistics",
  featuredDescription: "I specialize in translating complex technical requirements into user-centric solutions that deliver measurable business outcomes. With deep expertise in TMS/WMS platforms, AI-powered automation, and process optimization, I've helped enterprise 3PLs, shippers, and freight forwarders achieve significant operational improvements. My approach combines data-driven decision making with strong cross-functional leadership to build products that scale. I have extensive experience with on-site training and go-live support, handling hypercare periods to ensure smooth customer transitions. I have worked with customers across Australia, Southeast Asia, Europe, and the US, adapting solutions to meet diverse regional needs and regulatory requirements.",
  featuredCtaText: "",
  gridArticles: [
    { id: 1, title: "Product Strategy & Roadmap", category: "Core Skill", readTime: "5 years" },
    { id: 2, title: "TMS/WMS Platforms", category: "Domain Expertise", readTime: "10 years" },
    { id: 3, title: "Agile/Scrum Leadership", category: "Certified", readTime: "5 years" },
    { id: 4, title: "Project Logistics", category: "Specialization", readTime: "5 years" },
  ],
  readSuffix: " experience",
};

// ============================================================
// Core Competencies (Lifestyle repurposed)
// ============================================================

export interface LifestyleArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  rotation: number;
  position: { x: number; y: number };
  baseZIndex?: number;
}

export interface LifestyleConfig {
  sectionTitle: string;
  viewMoreText: string;
  articles: LifestyleArticle[];
}

export const lifestyleConfig: LifestyleConfig = {
  sectionTitle: "Core Competencies",
  viewMoreText: "",
  articles: [
    {
      id: 1,
      title: "Cross-Functional Leadership",
      excerpt: "Leading diverse teams across engineering, design, and business to deliver cohesive product solutions",
      image: "/skill-strategy.jpg",
      rotation: -3,
      position: { x: 0, y: 0 },
      baseZIndex: 5,
    },
    {
      id: 2,
      title: "Stakeholder Management",
      excerpt: "Executive communication, client relations, and building strategic partnerships",
      image: "/hero-portrait.jpg",
      rotation: 4,
      position: { x: 180, y: -20 },
      baseZIndex: 4,
    },
    {
      id: 3,
      title: "Go-to-Market Strategy",
      excerpt: "Product launches, market positioning, and driving user adoption",
      image: "/skill-agile.jpg",
      rotation: -5,
      position: { x: 60, y: 30 },
      baseZIndex: 3,
    },
    {
      id: 4,
      title: "User Research",
      excerpt: "Customer interviews, usability testing, and translating insights into product features",
      image: "/skill-data.jpg",
      rotation: 2,
      position: { x: 220, y: 40 },
      baseZIndex: 2,
    },
    {
      id: 5,
      title: "Product Documentation",
      excerpt: "User guides, feature specifications, release notes, and onboarding materials",
      image: "/skill-ai.jpg",
      rotation: -2,
      position: { x: 120, y: -10 },
      baseZIndex: 1,
    },
  ],
};

// ============================================================
// Professional Experience (Design repurposed)
// ============================================================

export interface DesignItem {
  id: number;
  title: string;
  quote: string;
  image: string;
  size: string;
  gridColumn?: number;
}

export interface DesignConfig {
  sectionTitle: string;
  viewMoreText: string;
  items: DesignItem[];
}

export const designConfig: DesignConfig = {
  sectionTitle: "Professional Experience",
  viewMoreText: "",
  items: [
    {
      id: 1,
      title: "Senior Product Manager | Clockwork Logistics",
      quote: "Owned product roadmap for multi-tenant logistics SaaS. Led AI automation initiatives and increased enterprise client adoption.",
      image: "/clockwork-logo-new.png",
      size: "wide",
    },
    {
      id: 2,
      title: "TMS Product Expert | NuVizz Inc",
      quote: "Primary customer liaison for TMS platform. Guided enterprise clients through route optimization and automated dispatch adoption.",
      image: "/nuvizz-logo.png",
      size: "normal",
    },
    {
      id: 3,
      title: "Product Manager | Clockwork Logistics",
      quote: "Drove MRR growth through advanced inventory modules. Launched mobile delivery app and achieved significant user growth.",
      image: "/clockwork-logo-new.png",
      size: "normal",
    },
    {
      id: 4,
      title: "Customer Success Director | Clockwork Logistics",
      quote: "Expanded 3PL portfolio with revenue uplift. Improved NPS scores and reduced driver churn through strategic initiatives.",
      image: "/clockwork-logo-new.png",
      size: "tall",
    },
    {
      id: 5,
      title: "Global Customer Success Manager | OpenPort",
      quote: "Accelerated client deployment and increased driver retention through data-driven engagement strategies.",
      image: "/openport-logo.png",
      size: "normal",
    },
  ],
};

// ============================================================
// Tariff Calculator Project Showcase (Green Tribe repurposed)
// ============================================================

export interface TribeMember {
  id: number;
  name: string;
  role: string;
  title: string;
  excerpt: string;
  avatar: string;
}

export interface GreenTribeConfig {
  sectionTitle: string;
  sectionDescription: string;
  readMoreText: string;
  joinTitle: string;
  joinDescription: string;
  emailPlaceholder: string;
  subscribeText: string;
  memberCountText: string;
  videoSrc: string;
  videoPoster: string;
  members: TribeMember[];
}

export const greenTribeConfig: GreenTribeConfig = {
  sectionTitle: "Side Projects",
  sectionDescription: "Personal projects and experiments I work on outside of my professional role. These initiatives help me learn about different AI models and build technical skills – because let's face it, being a 'legacy PM' who just writes specs isn't enough anymore. In today's age of AI, you need to understand the tech, experiment with the tools, and actually build things yourself. I'm constantly working on different side projects to build up my skills in AI automation, data analytics, and full-stack development.",
  readMoreText: "",
  joinTitle: "",
  joinDescription: "",
  emailPlaceholder: "",
  subscribeText: "",
  memberCountText: "",
  videoSrc: "",
  videoPoster: "/tariff-hero.jpg",
  members: [
    {
      id: 1,
      name: "AI Agent Architecture",
      role: "Core Technology",
      title: "Intelligent Search Automation",
      excerpt: "The system employs specialized AI agents that autonomously search multiple official sources including government trade databases, customs authorities, and international trade organizations. These agents use natural language processing to understand tariff classifications and extract relevant duty rates, taxes, and trade agreement benefits.",
      avatar: "/tariff-ai-agent.jpg",
    },
    {
      id: 2,
      name: "Real-Time Data Pipeline",
      role: "Infrastructure",
      title: "Daily Update Mechanism",
      excerpt: "A robust ETL pipeline orchestrates daily data collection at scheduled intervals. The system compares new data against existing records, identifies changes in tariff rates or regulations, and maintains a complete audit trail. Updates are automatically propagated to the calculation engine within minutes of detection.",
      avatar: "/tariff-search.jpg",
    },
    {
      id: 3,
      name: "Calculation Engine",
      role: "Product Feature",
      title: "Multi-Factor Tariff Computation",
      excerpt: "The calculator processes HS codes, country of origin, destination markets, product categories, and applicable trade agreements to compute total landed costs. It accounts for ad valorem duties, specific duties, compound duties, and preferential rates under FTAs to provide accurate cost projections.",
      avatar: "/project-tariff-calculator.jpg",
    },
  ],
};

// ============================================================
// Testimonials / Endorsements (Authors repurposed)
// ============================================================

export interface Author {
  id: number;
  name: string;
  role: string;
  avatar: string;
  articles: number;
  social: { instagram: string; twitter: string };
}

export interface AuthorsConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  articlesSuffix: string;
  authors: Author[];
}

export const authorsConfig: AuthorsConfig = {
  sectionTitle: "Professional Network",
  sectionSubtitle: "Collaborations and endorsements from industry leaders",
  articlesSuffix: "projects",
  authors: [
    {
      id: 1,
      name: "Enterprise Clients",
      role: "Fortune 500 Shippers & 3PLs",
      avatar: "/avatar-1.jpg",
      articles: 15,
      social: { instagram: "", twitter: "" },
    },
    {
      id: 2,
      name: "Cross-Functional Teams",
      role: "Engineering, UX, Data Science",
      avatar: "/avatar-2.jpg",
      articles: 42,
      social: { instagram: "", twitter: "" },
    },
    {
      id: 3,
      name: "Industry Partners",
      role: "Logistics & Supply Chain Leaders",
      avatar: "/avatar-3.jpg",
      articles: 8,
      social: { instagram: "", twitter: "" },
    },
  ],
};

// ============================================================
// Tech Stack / Tools (Instagram Gallery repurposed)
// ============================================================

export interface InstagramImage {
  id: number;
  image: string;
  likes: number;
}

export interface InstagramGalleryConfig {
  handle: string;
  handleUrl: string;
  description: string;
  followText: string;
  likesSuffix: string;
  images: InstagramImage[];
}

export const instagramGalleryConfig: InstagramGalleryConfig = {
  handle: "Tools & Technologies",
  handleUrl: "#contact",
  description: "The modern product stack I use to build and scale logistics SaaS platforms",
  followText: "View All Tools",
  likesSuffix: "projects",
  images: [
    { id: 1, image: "/skill-strategy.jpg", likes: 25 },
    { id: 2, image: "/skill-ai.jpg", likes: 18 },
    { id: 3, image: "/skill-agile.jpg", likes: 32 },
    { id: 4, image: "/skill-data.jpg", likes: 21 },
    { id: 5, image: "/project-tariff-calculator.jpg", likes: 15 },
    { id: 6, image: "/clockwork-home.jpg", likes: 28 },
    { id: 7, image: "/project-mobile-app.jpg", likes: 19 },
    { id: 8, image: "/project-ai-automation.jpg", likes: 24 },
    { id: 9, image: "/project-wms.jpg", likes: 17 },
    { id: 10, image: "/hero-portrait.jpg", likes: 30 },
  ],
};

// ============================================================
// Day in My Life Section
// ============================================================

export interface DayActivity {
  id: number;
  time: string;
  title: string;
  description: string;
  tasks: string[];
  image: string;
  icon: string;
}

export interface DayInLifeConfig {
  sectionTitle: string;
  sectionDescription: string;
  activities: DayActivity[];
  closingStatement: string;
}

export const dayInLifeConfig: DayInLifeConfig = {
  sectionTitle: "A Day in My Life",
  sectionDescription: "A glimpse into my daily routine as a Senior Product Manager in logistics SaaS, from morning standups to late-night testing sessions. (P.S. These photos are AI-generated because I'm too busy actually working to take pictures of myself working – but hey, they capture the vibe!)",
  activities: [
    {
      id: 1,
      time: "Early Morning",
      title: "Daily Calls & Team Sync",
      description: "I start my day with daily calls to align with the development team, review overnight communications, and check key metrics from the previous day.",
      tasks: [
        "Lead daily standups to track sprint progress",
        "Review JIRA board and discuss blockers",
        "Check daily metrics and KPIs from previous day",
        "Prioritize tasks based on incoming requests"
      ],
      image: "/day-male-emails.jpg",
      icon: "Sunrise"
    },
    {
      id: 2,
      time: "Morning or Afternoon",
      title: "Sprint Refinement & Planning",
      description: "Sprint refinement sessions happen throughout the day, either as part of daily calls or scheduled as separate meetings in the afternoon.",
      tasks: [
        "Conduct backlog refinement sessions",
        "Clarify requirements and answer technical questions",
        "Align on delivery timelines and dependencies",
        "Plan and prioritize upcoming sprints"
      ],
      image: "/day-male-standup.jpg",
      icon: "Users"
    },
    {
      id: 3,
      time: "Throughout the Day",
      title: "Client Consultation & Support",
      description: "Regular touchpoints with enterprise clients happen at various times, addressing questions, gathering feedback, and providing guidance on platform usage.",
      tasks: [
        "Handle customer inquiries and support requests",
        "Conduct product demos for prospects",
        "Gather feature requests and pain points",
        "Provide guidance on using the systems"
      ],
      image: "/day-male-customer.jpg",
      icon: "MessageSquare"
    },
    {
      id: 4,
      time: "Afternoon",
      title: "PRD Writing & Backlog Management",
      description: "Post-lunch hours are dedicated to deep work on product documentation, writing user stories, and managing the backlog for upcoming sprints.",
      tasks: [
        "Write and update product requirement documents",
        "Create user stories and acceptance criteria",
        "Align and prioritize JIRA tickets",
        "Plan and prepare for next sprints"
      ],
      image: "/day-male-prd.jpg",
      icon: "FileText"
    },
    {
      id: 5,
      time: "Late Afternoon",
      title: "Research, Analysis & Stakeholder Updates",
      description: "Later in the day I focus on industry research, competitive analysis, and fortnightly executive updates on roadmap progress.",
      tasks: [
        "Research industry trends and competitor moves",
        "Analyze product metrics and user behavior",
        "Prepare for fortnightly executive roadmap reviews",
        "Review customer feedback and NPS surveys"
      ],
      image: "/day-male-analytics.jpg",
      icon: "Search"
    },
    {
      id: 6,
      time: "Late Day to Evening",
      title: "Testing, UAT & Wrap Up",
      description: "Days often extend into the evening for usability testing, user acceptance testing, and ensuring releases are ready for deployment.",
      tasks: [
        "Conduct usability testing on new features",
        "Perform UAT before releases",
        "Support testing sessions that run late",
        "Document decisions and prepare for next day"
      ],
      image: "/day-male-testing.jpg",
      icon: "Moon"
    }
  ],
  closingStatement: "Typical day? 8 AM to 6 PM. Release week? More like 8 AM to 'why is it suddenly midnight and why is the staging environment on fire?' Post-deployment testing hits different when you're questioning every life choice that led you here. Wouldn't trade it though – the bugs are annoying, but the dopamine hit when everything actually works? Chef's kiss."
};

// ============================================================
// Footer / Contact
// ============================================================

export interface FooterConfig {
  brandWatermark: string;
  newsletterTitle: string;
  newsletterDescription: string;
  emailPlaceholder: string;
  subscribeText: string;
  subscribeSuccessMessage: string;
  categoriesLabel: string;
  categories: string[];
  pagesLabel: string;
  pages: string[];
  legalLabel: string;
  legalLinks: string[];
  socialLabel: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
  backToTopText: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  brandWatermark: "SIMON TING",
  newsletterTitle: "Let's Connect",
  newsletterDescription: "Interested in discussing logistics technology, AI automation, or product strategy? Reach out and let's build something great together.",
  emailPlaceholder: "Your email address",
  subscribeText: "Send Message",
  subscribeSuccessMessage: "Thanks for reaching out! I'll get back to you soon.",
  categoriesLabel: "Expertise",
  categories: ["Product Strategy", "AI/ML", "TMS/WMS", "Automation", "Data Analytics"],
  pagesLabel: "Quick Links",
  pages: ["About", "Projects", "Skills", "Experience", "Tariff Calculator"],
  legalLabel: "Contact",
  legalLinks: ["ssyting1@gmail.com", "+1 825-365-1277", "Calgary, Canada"],
  socialLabel: "Connect",
  socialLinks: {
    instagram: "https://www.linkedin.com/in/simon-ting-19262a64/",
    twitter: "https://www.linkedin.com/in/simon-ting-19262a64/",
    youtube: "https://www.linkedin.com/in/simon-ting-19262a64/",
  },
  backToTopText: "Back to Top",
  copyright: "© 2026 Simon Ting. All rights reserved.",
  credit: "Senior Product Manager | Logistics SaaS | AI & Automation",
};
