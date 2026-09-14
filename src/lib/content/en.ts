/**
 * English translation. Same shape as ./es.ts (the source of truth) —
 * keep both in sync when copy changes. Product names ("The Bold Way",
 * "Grow Your Way") stay in English across all three locales by design.
 * Prices stay in colones (₡) regardless of language — see §8/§4 of the brief.
 */

export const nav = {
  logoWord: "BOLD",
  logoSub: "AGENCY",
  links: [
    { href: "/", label: "Home" },
    { href: "/#enfoque", label: "Focus" },
    { href: "/#sistema", label: "Services" },
    { href: "/#como-trabajamos", label: "How we work" },
    { href: "/#planes", label: "Plans" },
    { href: "/portafolio", label: "Portfolio" },
    { href: "/calculadora", label: "Calculator" },
  ],
  cta: { href: "/cotizacion", label: "360 Diagnostic" },
};

export const hero = {
  eyebrow: "360 marketing, branding & signage",
  headline: ["THE BOLD WAY", "TO GROW"],
  tagline: "One single strategy.",
  subhead:
    "Not as separate pieces. One team thinks through your brand, your digital presence and your physical presence — based in Costa Rica, with reach across Brazil, the United States and Spain.",
  ctaPrimary: { href: "/cotizacion", label: "Book a 360 Diagnostic" },
  ctaSecondary: { href: "#sistema", label: "How we work" },
  proofPoints: [
    "Costa Rica · Brazil · United States · Spain",
    "9+ years of digital and strategic marketing experience",
    "16+ successful campaigns for brands like Toyota, Avon and Swarovski",
  ],
};

export const problem = {
  eyebrow: "The real problem",
  headline: "Hiring in pieces doesn't fix a whole business.",
  intro:
    "You have a good business. You've been operating for years, your product works, and your customers recommend you. But you're also juggling five different WhatsApp threads with five different vendors, and none of them sees the full picture.",
  points: [
    {
      title: "The designer doesn't sell",
      body: "Delivers pretty pieces that aren't connected to any commercial strategy.",
    },
    {
      title: "The community manager doesn't lead",
      body: "Publishes content constantly, but no one decides where the brand should actually go.",
    },
    {
      title: "The ad agency doesn't know your brand",
      body: "Optimizes clicks and reach without understanding what makes your business different.",
    },
    {
      title: "You end up coordinating everything",
      body: "The owner becomes the only point connecting pieces that should have been connected from the start.",
    },
  ],
  resolution:
    "The result isn't a lack of effort — it's a lack of direction. BOLD exists to be that direction.",
};

export const system = {
  eyebrow: "Our services",
  headline: "Everything a brand needs, under one team.",
  intro: "Six fronts, one team behind all of them.",
  pillars: [
    {
      index: "01",
      title: "Digital advertising",
      body: "Google · Meta · TikTok. Performance-focused paid media.",
    },
    {
      index: "02",
      title: "Brand strategy",
      body: "Positioning, advisory and brand architecture.",
    },
    {
      index: "03",
      title: "Signage & large format",
      body: "Point of sale, activations and physical presence.",
    },
    {
      index: "04",
      title: "Audiovisual & design",
      body: "Content production, photography and graphic design.",
    },
    {
      index: "05",
      title: "360 Consulting",
      body: "Full diagnostic and end-to-end strategy.",
    },
    {
      index: "06",
      title: "360 Experiences",
      body: "In-store and virtual, connecting physical with digital.",
    },
    {
      index: "07",
      title: "Web & app development",
      body: "Custom sites, e-commerce and applications — like this very site.",
      wide: true,
    },
  ],
};

export const midBanner = {
  caption: "We don't work like an outside agency. We become an implant of your team.",
};

export const teamBanner = {
  caption: "A team that sits down to review results with you, not one that disappears after handing over a plan.",
};

export const skylineBanner = {
  caption: "We run real businesses, not campaigns isolated in a vacuum.",
};

export const differentiators = {
  eyebrow: "Why BOLD",
  headline: "Four reasons businesses like yours choose to be led by us.",
  items: [
    {
      icon: "expertise",
      title: "Expertise & specialization",
      body: "9+ years of experience in digital and strategic marketing, operating across Costa Rica, Brazil, the United States and Spain.",
    },
    {
      icon: "perspective",
      title: "Fresh perspective",
      body: "We see your business from the outside, without the blind spots that build up after years operating inside it.",
    },
    {
      icon: "flexibility",
      title: "Flexibility & scalability",
      body: "We start where you are today and adjust scope as the business grows, without rigid structures.",
    },
    {
      icon: "resources",
      title: "Resource optimization",
      body: "You get a full, already-trained team instead of hiring and training an in-house structure from scratch.",
    },
  ],
};

export const founder = {
  eyebrow: "Our founder",
  headline: "Who's behind this.",
  name: "Esteban Muñoz Malavé",
  role: "Marketing Strategist & Growth Leader · Trilingual",
  bio: "Social Communicator with a specialization in Marketing and Advertising, with over 9 years leading B2B and B2C growth for brands across Venezuela, Costa Rica, Panama, Mexico, Argentina and Brazil. Expert in strategic planning, paid media, branding and multidisciplinary team leadership, with measurable results across automotive, beauty, retail, furniture/design, technology and events/tourism.",
  experience: [
    {
      role: "Founder & Brand Strategist",
      company: "BOLD Agency",
      period: "2026 – Present",
    },
    {
      role: "Senior Marketing Specialist",
      company: "Shift Latam Porter Novelli — Embedded at CCCR",
      period: "2026",
    },
    {
      role: "Marketing Manager",
      company: "Euromobilia & Nouvell (Ara Group)",
      period: "2024 – 2026",
    },
    {
      role: "Digital Marketing Manager",
      company: "Avon Costa Rica",
      period: "2022 – 2023",
    },
  ],
  cards: [
    {
      tag: "Education",
      value: "Social Communicator",
      sub: "Marketing & Advertising",
    },
    {
      tag: "Certification",
      value: "Executive Certificate, Digital Marketing",
      sub: "The George Washington University · 2023",
    },
    {
      tag: "Today",
      value: "Growing your company",
      sub: "BOLD Agency",
    },
    {
      tag: "Languages",
      value: "Español C2 · Português C1 · English B2",
      sub: "Native · Advanced · Intermediate",
    },
  ],
  linkedIn: "https://linkedin.com/in/estebanjm",
  experienceLabel: "Recent experience",
  certificationLabel: "Certification",
  certificate: {
    institution: "The George Washington University",
    school: "School of Business",
    program: "Specialization in Digital Marketing",
    honoree: "Esteban Jose Muñoz Malave",
    date: "November 2023",
  },
};

// Draft copy for the /portafolio hero (§5.4a), translated from the
// user's Spanish draft — pending their review before publishing.
export const portfolioHero = {
  eyebrow: "MARKETING STRATEGY & GROWTH",
  headlinePre: "Strategist building brands with",
  headlineItalic: "direction",
  headlinePost: "and real results.",
  subhead:
    "I help ambitious businesses grow with clear strategy and real execution. Based in Costa Rica, reaching LATAM, the USA and Europe.",
  cta: { label: "See the portfolio →", targetId: "grid" },
  photo: "/images/founder-about-me.jpg",
};

export const portfolioPage = {
  metaTitle: "Portfolio",
  metaDescription: "Portfolio and career of Esteban Muñoz Malavé — BOLD Agency.",
  aboutEyebrow: "About me",
  gridEyebrow: "Portfolio",
  gridHeadline: "Brands I've built up close.",
  gridIntro: "Filter by brand or by type of work. Each case shows my actual role in the project.",
  filterAllLabel: "All",
  filterBrandLabel: "Brand",
  filterTypeLabel: "Type of work",
  emptyLabel: "No cases with that filter yet.",
  inProgressLabel: "Updating soon",
  roleLabel: "My role",
  backLabel: "← Back to portfolio",
  clientsEyebrow: "Clients & partners",
  clientsHeadline: "Brands that chose to be bold.",
  detailCtaLabel: "Book a 360 Diagnostic",
};

export const process = {
  eyebrow: "How we work",
  headline: "A process, not a list of deliverables.",
  subhead: "Each stage builds on the one before it. We don't jump to execution without a diagnostic, and we don't measure without having executed with intent.",
  steps: [
    {
      index: "01",
      title: "360 Diagnostic",
      body: "We review your whole business — brand, digital presence, sales process and competition — to understand what's holding growth back.",
    },
    {
      index: "02",
      title: "Priorities",
      body: "We define together what to move first. Not everything gets solved at once, and saying so clearly is part of the work.",
    },
    {
      index: "03",
      title: "Execution",
      body: "The BOLD team implements the plan directly, with operations involved — not just recommendations in a document.",
    },
    {
      index: "04",
      title: "Measurement",
      body: "We track what's working with real business data, not vanity reports.",
    },
    {
      index: "05",
      title: "Learning",
      body: "We adjust direction based on what we learn. Real growth is a cycle, not a project with a closing date.",
    },
  ],
};

export const plans = {
  eyebrow: "How to work with BOLD",
  headline: "Two paths. One same commitment.",
  intro:
    "Standard quote with clear deliverables, or embedded mode if you want us as part of your team. The 360 Diagnostic helps you decide which one fits.",
  modalities: [
    {
      name: "Grow Your Way",
      description: "Standard quote or monthly fee. Packaged services with clear deliverables.",
      includes: [
        { label: "Digital packages", detail: "social · ads · content" },
        { label: "Branding & advisory", detail: "identity + strategy" },
        { label: "Signage", detail: "standalone or as reinforcement" },
        { label: "Design & audiovisual", detail: "per project or retainer" },
      ],
      price: "From $200 usd/month + adjustable % fee",
    },
    {
      name: "The Bold Way",
      badge: "★ Top Tier",
      featured: true,
      description:
        "We don't work as an outside agency: we become an implant of your team. We live your brand, analyze it from within, and grow alongside you.",
      includes: [
        { label: "Full involvement", detail: "we think as part of the team" },
        { label: "Weekly presence", detail: "meetings, strategy, execution" },
        { label: "End-to-end analysis", detail: "from brief to results" },
        { label: "Dedicated 360 strategy", detail: "branding + digital + physical" },
      ],
      price: "Base fee + performance share · quote on request",
    },
  ],
  disclaimer: "Reference prices in USD, subject to scope and volume. The 360 Diagnostic is free — the final quote comes out of it. All plans include electronic invoicing.",
  ctaLabel: "Define my plan",
  calculatorCtaLabel: "See pricing calculator",
};

export const launchPricing = {
  eyebrow: "Launch pricing · The Bold Way",
  headline: "This is how The Bold Way starts.",
  intro:
    "Three packages, one same commitment: the level of involvement is equal across all three — what changes is how much content you get and its static–video balance.",
  tiers: [
    {
      name: "Bronze Package",
      price: "From ₡75,000",
      unit: "/month",
      priceNote: "launch price",
      features: [
        { label: "12 pieces a month", detail: "10 static + 2 video" },
        { label: "100% involvement", detail: "during the trial month" },
      ],
    },
    {
      name: "Silver Package",
      badge: "Most chosen",
      price: "From ₡150,000",
      unit: "/month",
      priceNote: "launch price",
      features: [
        { label: "18 pieces a month", detail: "12 static + 6 video" },
        { label: "100% involvement", detail: "during the trial month" },
      ],
    },
    {
      name: "B-Gold Package",
      badge: "★ Top Tier",
      featured: true,
      price: "From ₡220,000",
      unit: "/month",
      priceNote: "launch price",
      features: [
        { label: "24 pieces a month", detail: "100% your choice" },
        { label: "Flexible format", detail: "all reels · all static · or a mix" },
        { label: "100% involvement", detail: "during the trial month" },
      ],
    },
  ],
  promo:
    "★ Launch pricing — Custom quote for special needs · Social · Paid · Design · Strategy",
};

export const results = {
  eyebrow: "Results",
  headline: "The numbers speak.",
  intro: "Real campaign results, not promises.",
  stats: [
    { num: "+85%", label: "Quality leads generated", src: "CCCR" },
    { num: "$300K", label: "Monthly sales", src: "CCCR" },
    { num: "+8K", label: "App users", src: "Grupo Purdy" },
    { num: "+900K", label: "USD in ROI", src: "Euromobilia" },
    { num: "+70%", label: "Productivity", src: "Avon" },
    { num: "+16", label: "Successful campaigns", src: "9+ years of track record" },
  ],
  ctaLabel: "See the full portfolio",
};

export const faq = {
  eyebrow: "Frequently asked questions",
  headline: "Before you ask.",
  items: [
    {
      question: "I already have a designer or community manager — does this replace them?",
      answer:
        "Not necessarily. We often bring the people who already work for you into a clearer direction. What we add is the strategic judgment that connects their work to the rest of the business.",
    },
    {
      question: "How much does it cost to work with BOLD?",
      answer:
        "It depends on the mode: packages starting at $200 usd/month under Grow Your Way, or a base fee + performance share if we work as an implant of your team (The Bold Way). The 360 Diagnostic — the first step — is free.",
    },
    {
      question: "Do you work outside Costa Rica?",
      answer:
        "Yes. We're based in Costa Rica with operations in Brazil (Curitiba, São Paulo), the United States (Orlando, Philadelphia, Chicago) and Spain (Barcelona, Valencia, Madrid).",
    },
    {
      question: "My business is small — does it still apply?",
      answer:
        "We work with businesses that already have a validated product and between 3 and 25 employees. If you sell mostly over WhatsApp and feel your presence doesn't reflect what your business is really worth, you qualify.",
    },
    {
      question: "What's the process once I book the diagnostic?",
      answer:
        "You fill out the 360 Diagnostic form, we reach out to schedule a conversation, we review your business together, and we present concrete priorities — with or without a commitment to continue.",
    },
    {
      question: "What if I don't see results right away?",
      answer:
        "Anyone who promises guaranteed results in weeks isn't being honest with you. What you can expect is clear direction from month one, and constant measurement of what's working and what isn't.",
    },
    {
      question: "I already had a bad experience with another agency — what's different here?",
      answer:
        "One same team sees the whole business, not one isolated channel. That means less jargon, fewer reports nobody reads, and more direct conversation with whoever actually does the work.",
    },
  ],
};

export const finalCta = {
  eyebrow: "The next step",
  headline: "Your business doesn't need more noise. It needs direction.",
  body:
    "The 360 Diagnostic isn't a sales call. It's an honest review of your business, free and with no commitment, so you can decide with real information what to move first.",
  cta: { href: "#diagnostico", label: "Book my 360 Diagnostic" },
};

export const footer = {
  description:
    "The bold way to grow. A creative and strategic agency based in Costa Rica, reaching Brazil, the United States and Spain.",
  contact: {
    email: "esteban.munoz@boldagencycr.com",
    whatsapp: "+506 7244 5642",
    address: "Costa Rica → LATAM · USA · Europe",
  },
  columns: [
    {
      title: "Site",
      links: [
        { href: "/#enfoque", label: "Focus" },
        { href: "/#sistema", label: "Services" },
        { href: "/#diferenciales", label: "Why BOLD" },
        { href: "/#como-trabajamos", label: "How we work" },
        { href: "/#planes", label: "Plans" },
        { href: "/calculadora", label: "Calculator" },
        { href: "/portafolio", label: "Portfolio" },
        { href: "/#preguntas", label: "FAQ" },
        { href: "/#diagnostico", label: "360 Diagnostic" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacidad", label: "Privacy policy" },
        { href: "/terminos", label: "Terms & conditions" },
      ],
    },
  ],
  social: [
    { href: "https://www.facebook.com/profile.php?id=61594134985999", label: "Facebook", icon: "facebook" },
    { href: "https://www.instagram.com/boldagency.cr/", label: "Instagram", icon: "instagram" },
    { href: "https://www.linkedin.com/company/em-agency-latam", label: "LinkedIn", icon: "linkedin" },
  ],
  whatsappLink: "https://wa.me/50672445642",
  whatsappAriaLabel: "Message us on WhatsApp",
  copyright: `© ${new Date().getFullYear()} BOLD Agency. All rights reserved.`,
};

export const diagnosticForm = {
  eyebrow: "360 Diagnostic",
  headline: "Tell us about your business.",
  body:
    "Takes less than two minutes. With this information we prepare a first read on your business before the conversation.",
  successTitle: "We received your request.",
  successBody:
    "Our team will review the information and reach out by WhatsApp or email within the next 24 business hours to schedule your 360 Diagnostic.",
  resendLabel: "Send another request",
  errorTitle: "We couldn't send your request.",
  errorBody:
    "Your information wasn't lost. Try again in a few seconds or write to us directly on WhatsApp.",
  nameLabel: "Full name",
  companyLabel: "Business name",
  contactLabel: "WhatsApp or email",
  contactHint: "Include country code if it's WhatsApp.",
  businessTypeLabel: "Type of business",
  businessTypePlaceholder: "Select an option",
  budgetLabel: "Approximate monthly budget",
  budgetPlaceholder: "Select a range",
  challengeLabel: "What's your main challenge today?",
  consentLabel: "I authorize BOLD Agency to contact me by WhatsApp or email to coordinate my 360 Diagnostic.",
  submitLabel: "Request 360 Diagnostic",
  submittingLabel: "Sending…",
  privacyNote: "We don't share your information. We only use it to prepare your diagnostic.",
};

export const businessTypes = [
  { value: "comercio", label: "Retail / commerce" },
  { value: "servicios", label: "Professional services" },
  { value: "salud", label: "Health & wellness" },
  { value: "alimentos", label: "Food & beverage" },
  { value: "construccion", label: "Construction & real estate" },
  { value: "manufactura", label: "Manufacturing / industry" },
  { value: "educacion", label: "Education & training" },
  { value: "tecnologia", label: "Technology / software" },
  { value: "otro", label: "Other" },
];

export const budgetRanges = [
  { value: "menos-1000", label: "Under USD 1,000/month" },
  { value: "1000-3000", label: "USD 1,000 – 3,000/month" },
  { value: "3000-6000", label: "USD 3,000 – 6,000/month" },
  { value: "6000-mas", label: "Over USD 6,000/month" },
  { value: "no-seguro", label: "Not sure yet" },
];

/**
 * Standalone /cotizacion page — a unique, shareable URL for campaigns,
 * social bios and WhatsApp, going straight to the form without depending
 * on an anchor inside the home page.
 */
export const cotizacionPage = {
  metaTitle: "Quote — 360 Diagnostic",
  metaDescription: "Request your 360 Diagnostic with BOLD Agency: tell us about your business and we'll reach out by WhatsApp or email with your quote, free and with no commitment.",
  eyebrow: "BOLD Agency Quote",
  headline: "Tell us about your business and let's start your quote.",
  intro:
    "Less than two minutes. With this information we prepare your 360 Diagnostic and reach out by WhatsApp or email with next steps — free and with no commitment.",
  trustPoints: [
    "Response within 24 business hours",
    "360 Diagnostic, free and with no commitment",
    "9+ years of digital and strategic marketing experience",
  ],
};

// REVIEW TRANSLATION: service and category names in the catalog
// (pricing-config.ts) stay in Spanish across all 3 locales for now —
// they come verbatim from the client's Excel and translating them with
// business accuracy is left for a separate review pass.
export const calculator = {
  eyebrow: "Calculate your service or project",
  headline: "How much does it cost to grow your way?",
  intro: "Real prices, in colones. Pick a monthly package, or build your own combination of point services.",
  exclusiveNote: "A package or point services — they don't combine in this calculator. Need a package plus extra services? That's a specialized quote.",
  specializedCtaLabel: "Request a specialized quote",
  packageTitle: "Monthly package",
  packageSubtitle: "Single selection — these don't combine with each other.",
  removePackageLabel: "Remove package",
  pointTitle: "Point services",
  pointSubtitle: "Add the ones you need. Items marked “quote” open a separate form.",
  quoteLabel: "Quote on request",
  fromLabel: "from",
  quoteButton: "Get a quote",
  quotedButton: "Requested ✓",
  growYourWayNote: "Grow Your Way includes an adjustable commission on ad spend, agreed per project — it's not included in this calculator's total.",
  summaryTitle: "Your estimate",
  emptyState: "Pick a package or a point service to see the total.",
  subtotalLabel: "Subtotal",
  discountLabel: "Combo discount",
  vatLabel: "VAT",
  totalLabel: "Estimated total",
  totalFromLabel: "Estimated total from",
  totalUnit: "/month, taxes included",
  quotedNote: "Includes services to be quoted separately — we'll contact you with the exact amount.",
  soloSurchargeNote: "This service is meant to be combined with others — chosen alone, the price includes an adjustment.",
  ctaLabel: "Book a 360 Diagnostic",
  decreaseAria: "Decrease",
  increaseAria: "Increase",
};

export const quoteModal = {
  eyebrow: "Quote",
  intro: "This service is quoted to fit your project. Leave us your details and a brief scope.",
  namePlaceholder: "Full name",
  companyPlaceholder: "Business name",
  contactPlaceholder: "WhatsApp or email",
  briefPlaceholder: "Briefly tell us the scope of the project",
  submitLabel: "Send request",
  submittingLabel: "Sending…",
  whatsappLabel: "or write to us directly on WhatsApp",
  closeLabel: "Close",
  successTitle: "Done!",
  successBody: (service: string) => `We received your quote request for ${service}. We'll be in touch soon.`,
  ariaLabel: (service: string) => `Quote ${service}`,
  genericError: "Please check the fields.",
  submitError: "We couldn't send your request.",
  unexpectedError: "Unexpected error.",
  whatsappMessage: (service: string) => `Hi BOLD, I'd like a quote for: ${service}.`,
  challengePrefix: "Service of interest",
  noDetailNote: "no additional detail",
};
