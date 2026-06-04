import { WebsiteConfig } from "./types";

export const DEFAULT_CONFIG: WebsiteConfig = {
  logoText: "THE INSURANCE BOSS",
  logoUrl: "https://lh3.googleusercontent.com/d/1Lr3oT5chJbkjpbHTHW8f-A32Achcby6v", // User specified logo path
  phone: "732-COVERED (268-3733)",
  email: "info@theinsuranceboss.com",
  accentColor: "#FAC000",
  fontScale: 1.0,

  hero: {
    titleWhite: "PROTECT WHAT YOU BUILD.",
    titleYellow: "GROW WHAT YOU OWN.",
    subtitle: "Whether you're looking for insurance coverage, agency growth, or referral opportunities, The Insurance Boss connects protection with opportunity.",
    keywords: "INSURANCE SOLUTIONS • AGENCY GROWTH • REFERRAL PARTNERSHIPS",
    supportingText: "Serving families, business owners, insurance professionals, and strategic partners nationwide.",
    btnReviewText: "REVIEW MY POLICY",
    btnReviewUrl: "https://theinsuranceboss.com/policy-review/",
    btnGrowText: "GROW MY AGENCY",
    btnGrowUrl: "#for-agents",
    bgUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1920",
  },

  pillars: {
    coverage: {
      title: "COVERAGE SOLUTIONS",
      description: "Personal and commercial insurance designed to protect what matters most.",
      items: ["Auto", "Home", "Life", "Business", "Specialty"],
      btnText: "GET COVERED",
      btnUrl: "#coverage-solutions",
    },
    agents: {
      title: "INSURANCE AGENTS",
      description: "Lead generation, automation, dashboards, recruiting systems, and agency growth solutions.",
      btnText: "GROW MY AGENCY",
      btnUrl: "#for-agents",
    },
    partners: {
      title: "REFERRAL PARTNERS",
      description: "Mortgage brokers, real estate agents, financial advisors, dealers, and business professionals.",
      btnText: "JOIN INNER CIRCLE",
      btnUrl: "#inner-circle",
    },
  },

  valueProps: {
    tagline: "WHY THE INSURANCE BOSS?",
    title: "ONE BRAND. THREE WAYS TO WIN.",
    items: [
      "MULTIPLE STATES SERVED",
      "PERSONAL & COMMERCIAL COVERAGE",
      "AGENCY GROWTH SOLUTIONS",
      "STRATEGIC REFERRAL NETWORK",
      "POLICY REVIEW TECHNOLOGY",
      "AI-POWERED RESOURCES"
    ],
  },

  policyReview: {
    title: "ARE YOU COVERED?",
    body: "Upload your declarations pages and receive a personalized coverage review.",
    btnText: "UPLOAD POLICY",
    bgUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
    externalUrl: "https://theinsuranceboss.com/policy-review/",
  },

  biggerAgency: {
    label: "FOR INSURANCE AGENTS",
    title: "BUILD A BIGGER AGENCY WITHOUT GUESSWORK",
    items: [
      "Agency Dashboard",
      "Lead Generation",
      "Social Media Management",
      "Automation Systems",
      "Consulting",
      "Recruiting"
    ],
    btnText: "SEE AGENT SERVICES",
    btnUrl: "#for-agents",
    bgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },

  innerCircle: {
    label: "INNER CIRCLE",
    title: "TURN RELATIONSHIPS INTO REVENUE",
    body: "Our referral network helps professionals create additional income opportunities while delivering value to their clients.",
    items: [
      "MORTGAGE PROFESSIONALS",
      "REAL ESTATE AGENTS",
      "AUTO DEALERS",
      "FINANCIAL ADVISORS",
      "BUSINESS BROKERS",
      "CPAS"
    ],
    btnText: "BECOME A PARTNER",
    btnUrl: "#inner-circle",
    bgUrl: "https://images.unsplash.com/photo-1521791136364-728647415313?auto=format&fit=crop&q=80&w=800",
  },

  aboutBoss: {
    label: "ABOUT THE INSURANCE BOSS",
    title: "BUILT BY INSURANCE PROFESSIONALS. DESIGNED FOR GROWTH.",
    body: "Insurance agency owner. Independent brokerage experience. Multi-business entrepreneur. We believe in protecting what matters, creating opportunities, and helping others win.",
    btnText: "JOIN THE INNER CIRCLE",
    btnUrl: "#inner-circle",
    bgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },

  subwebsites: [
    {
      category: "Commercial Insurance",
      items: [
        { label: "Commercial Insurance Main", url: "https://theinsuranceboss.com/commercial-insurance/" },
        { label: "BOP (Business Owner's Policy)", url: "https://theinsuranceboss.com/bop/" },
        { label: "Commercial Auto", url: "https://theinsuranceboss.com/commercial-auto/" },
        { label: "Cyber Liability", url: "https://theinsuranceboss.com/cyber-liability/" },
        { label: "General Liability", url: "https://theinsuranceboss.com/general-liability/" },
        { label: "Workers' Comp", url: "https://theinsuranceboss.com/workers-comp/" },
        { label: "Employee Benefits", url: "https://theinsuranceboss.com/employee-benefits/" }
      ]
    },
    {
      category: "Life Insurance",
      items: [
        { label: "Life Insurance Main", url: "https://theinsuranceboss.com/life-insurance/" },
        { label: "Whole Life", url: "https://theinsuranceboss.com/whole-life/" },
        { label: "Universal Life", url: "https://theinsuranceboss.com/universal-life/" },
        { label: "Term Life", url: "https://theinsuranceboss.com/term-life/" },
        { label: "Mortgage Protection", url: "https://theinsuranceboss.com/mortgage-protection/" },
        { label: "Disability", url: "https://theinsuranceboss.com/disability/" }
      ]
    },
    {
      category: "Retirement & Investment",
      items: [
        { label: "Retirement & Investment Main", url: "https://theinsuranceboss.com/retirement-investment/" },
        { label: "IRAs", url: "https://theinsuranceboss.com/iras/" },
        { label: "College Savings", url: "https://theinsuranceboss.com/college-savings/" },
        { label: "Annuities", url: "https://theinsuranceboss.com/annuities/" },
        { label: "401k Rollovers", url: "https://theinsuranceboss.com/401k-rollovers/" }
      ]
    },
    {
      category: "Personal Lines",
      items: [
        { label: "Personal Lines Main", url: "https://theinsuranceboss.com/personal-lines/" },
        { label: "Auto Insurance", url: "https://theinsuranceboss.com/auto-insurance/" },
        { label: "Homeowners Insurance", url: "https://theinsuranceboss.com/homeownersinsurance/" },
        { label: "Umbrella Insurance", url: "https://theinsuranceboss.com/umbrellainsurance/" },
        { label: "Landlord Dwelling", url: "https://theinsuranceboss.com/landlord-dwelling/" },
        { label: "Flood", url: "https://theinsuranceboss.com/flood/" },
        { label: "Specialty Vehicles", url: "https://theinsuranceboss.com/specialty-vehicles/" }
      ]
    }
  ]
};
