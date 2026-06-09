export interface Subwebsite {
  label: string;
  url: string;
}

export interface SubwebsiteCategory {
  category: string;
  items: Subwebsite[];
}

export interface SocialLink {
  icon: string;
  url: string;
}

export interface MetricItem {
  title: string;
  description: string;
  icon: "shield" | "target" | "award" | "star" | "users" | "zap";
}

export interface MetricsConfig {
  show: boolean;
  title: string;
  stabilityLabel: string;
  stabilityStatus: string;
  items: MetricItem[];
  titleColor?: string;
  stabilityLabelColor?: string;
  itemTitleColor?: string;
  itemDescriptionColor?: string;
}

export interface WebsiteConfig {
  logoText: string;
  logoUrl: string;
  phone: string;
  email: string;
  accentColor: string; // Dynamic hex color, default #FAC000
  fontScale: number; // multiplier for typography
  globalBackground: string;
  globalBackgroundImage?: string;
  buttonsHtml: string;
  globalChatbotHtml?: string;
  hideChatbot?: boolean;
  chatbotGeminiKey?: string;
  chatbotSlackWebhook?: string;
  metrics?: MetricsConfig;
  faqTitleColor?: string;
  faqSubtitleColor?: string;
  homepageLayout?: {
    sections: {
      id: string;
      label: string;
      enabled: boolean;
    }[];
    customHtmlBlocks: Record<string, string>;
  };
  subpageHtmlOverrides?: Record<string, {
    title?: string;
    description?: string;
    css?: string;
    html?: string;
  }>;
  socialLinks: SocialLink[];
  carriersBanner: {
    title: string;
    subtitle: string;
    speed?: number;
    personalLogos: string[];
    commercialLogos: string[];
    lifeLogos: string[];
    titleColor?: string;
    subtitleColor?: string;
  };
  subwebsiteBanners: Record<string, {
    topBannerUrl: string;
    bottomBannerUrl: string;
    topHeight?: string;
    topFit?: "cover" | "contain" | "fill" | "tile" | "center" | "wide";
    topOpacity?: number;
    topPosition?: "center" | "top" | "bottom";
    bottomHeight?: string;
    bottomFit?: "cover" | "contain" | "fill" | "tile";
    bottomPosition?: "center" | "top" | "bottom";
    titleText?: string;
    subtitleText?: string;
    align?: "left" | "center" | "right";
    titleColor?: string;
    titleSize?: number;
    subtitleColor?: string;
    subtitleSize?: number;
    subtitleAlign?: "left" | "center" | "right";
    buttonsHtml?: string;
    showBottomBanner?: boolean;
    bottomUseSameAsTop?: boolean;
    bottomTitleText?: string;
    bottomSubtitleText?: string;
    bottomAlign?: "left" | "center" | "right";
    bottomSubtitleAlign?: "left" | "center" | "right";
    bottomTitleColor?: string;
    bottomTitleSize?: number;
    bottomSubtitleColor?: string;
    bottomSubtitleSize?: number;
    bottomUseSameImageAsTop?: boolean;
    bottomOpacity?: number;
  }>;
  fontFamilyPage?: Record<string, string>;
  fontFamilyCategory?: Record<string, string>;
  bannerTitleColor?: string;
  bannerTitleSize?: number;
  bannerTitleFont?: string;

  
  hero: {
    titleWhite: string;
    titleYellow: string;
    subtitle: string;
    keywords: string;
    supportingText: string;
    btnReviewText: string;
    btnReviewUrl: string;
    btnGrowText: string;
    btnGrowUrl: string;
    bgUrl: string;
    titleSize?: number;
    subtitleSize?: number;
    align?: "left" | "center" | "right";
    layout?: "full" | "split";
    splitImageSide?: "left" | "right";
    showMetrics?: boolean;
    titleWhiteColor?: string;
    titleYellowColor?: string;
    subtitleColor?: string;
  };
  
  pillars: {
    coverage: {
      title: string;
      description: string;
      items: string[];
      btnText: string;
      btnUrl: string;
      titleColor?: string;
      descriptionColor?: string;
    };
    agents: {
      title: string;
      description: string;
      btnText: string;
      btnUrl: string;
      titleColor?: string;
      descriptionColor?: string;
    };
    partners: {
      title: string;
      description: string;
      btnText: string;
      btnUrl: string;
      titleColor?: string;
      descriptionColor?: string;
    };
  };

  valueProps: {
    tagline: string;
    title: string;
    items: string[];
    taglineColor?: string;
    titleColor?: string;
  };

  policyReview: {
    title: string;
    body: string;
    btnText: string;
    bgUrl: string;
    externalUrl: string;
    titleColor?: string;
    bodyColor?: string;
  };

  biggerAgency: {
    label: string;
    title: string;
    items: string[];
    btnText: string;
    btnUrl: string;
    bgUrl: string;
    labelColor?: string;
    titleColor?: string;
  };

  innerCircle: {
    label: string;
    title: string;
    body: string;
    items: string[];
    btnText: string;
    btnUrl: string;
    bgUrl: string;
    labelColor?: string;
    titleColor?: string;
    bodyColor?: string;
  };

  aboutBoss: {
    label: string;
    title: string;
    body: string;
    btnText: string;
    btnUrl: string;
    bgUrl: string;
    labelColor?: string;
    titleColor?: string;
    bodyColor?: string;
  };

  subwebsites: SubwebsiteCategory[];
  insuranceBanners: InsuranceBanner[];
  faqs: FaqItem[];
  testimonials?: TestimonialsConfig;
}

export interface InsuranceBanner {
  id: string;
  title: string;
  subtitle: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  btnUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  location: string;
  quote: string;
  category?: string;
  rating: number;
}

export interface TestimonialsConfig {
  show: boolean;
  title: string;
  subtitle: string;
  agentReviews: TestimonialItem[];
  clientReviews: TestimonialItem[];
  titleColor?: string;
  subtitleColor?: string;
  quoteColor?: string;
  authorColor?: string;
}

